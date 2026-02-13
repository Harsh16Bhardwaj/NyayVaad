import { AppDispatch, RootState } from '@/app/store';
import { 
  markSessionsSynced, 
  clearSyncedSessionsFromStorage, 
  setError as setSessionsError 
} from '@/app/store/slices/chatSessionsSlice';
import { 
  markSessionSynced, 
  clearSyncedFromStorage, 
  setError as setMessagesError 
} from '@/app/store/slices/chatMessagesSlice';

/**
 * Sync chat sessions with the database
 * Only syncs if there are unsynced changes
 */
export const syncChatSessions = async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const { sessions, hasUnsyncedChanges } = state.chatSessions;

  // Only sync if there are changes
  if (!hasUnsyncedChanges || !sessions || sessions.length === 0) {
    console.log('[Sync] No unsynced session changes to sync');
    return;
  }

  console.log(`[Sync] Syncing ${sessions.length} chat sessions with DB...`);

  try {
    // Call API to sync sessions
    const response = await fetch('/api/chat/sessions/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessions }),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync sessions: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Mark as synced and clear from localStorage
    dispatch(markSessionsSynced());
    dispatch(clearSyncedSessionsFromStorage());
    
    console.log(`[Sync] Successfully synced ${sessions.length} sessions. localStorage cleared.`);
    return result;
  } catch (error) {
    console.error('[Sync] Failed to sync sessions:', error);
    dispatch(setSessionsError(error instanceof Error ? error.message : 'Sync failed'));
  }
};

/**
 * Sync chat messages with the database
 * Only syncs sessions that have unsynced changes
 */
export const syncChatMessages = async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const { messagesBySession } = state.chatMessages;

  // Find sessions with unsynced changes
  const unsyncedSessions = Object.entries(messagesBySession).filter(
    ([_, data]) => data.hasUnsyncedChanges
  );

  if (unsyncedSessions.length === 0) {
    console.log('[Sync] No unsynced message changes to sync');
    return;
  }

  console.log(`[Sync] Syncing messages for ${unsyncedSessions.length} sessions with DB...`);

  try {
    // Sync each session's messages
    const syncPromises = unsyncedSessions.map(async ([sessionId, data]) => {
      const response = await fetch('/api/chat/messages/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          messages: data.messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to sync messages for session ${sessionId}`);
      }

      // Mark this session as synced
      dispatch(markSessionSynced(sessionId));
      
      return response.json();
    });

    await Promise.all(syncPromises);
    
    // Clear synced messages from localStorage
    dispatch(clearSyncedFromStorage());
    
    console.log(`[Sync] Successfully synced messages for ${unsyncedSessions.length} sessions. localStorage cleared.`);
  } catch (error) {
    console.error('[Sync] Failed to sync messages:', error);
    dispatch(setMessagesError(error instanceof Error ? error.message : 'Sync failed'));
  }
};

/**
 * Initialize sync intervals - runs on app load
 * Syncs every 30 seconds
 */
export const initializeSyncIntervals = (dispatch: AppDispatch, getState: () => RootState) => {
  console.log('[Sync] Initializing 30-second sync intervals...');

  // Sync sessions every 30 seconds
  const sessionsInterval = setInterval(() => {
    syncChatSessions(dispatch, getState);
  }, 30000); // 30 seconds = 30,000ms

  // Sync messages every 30 seconds (offset by 5 seconds to avoid simultaneous calls)
  const messagesInterval = setInterval(() => {
    syncChatMessages(dispatch, getState);
  }, 30000); // 30 seconds = 30,000ms

  // Initial sync after 5 seconds (only if there are unsynced changes)
  setTimeout(() => {
    const state = getState();
    if (state.chatSessions.hasUnsyncedChanges) {
      syncChatSessions(dispatch, getState);
    }
    // Check each session for unsynced message changes
    const hasUnsyncedMessages = Object.values(state.chatMessages.messagesBySession).some(
      data => data.hasUnsyncedChanges
    );
    if (hasUnsyncedMessages) {
      syncChatMessages(dispatch, getState);
    }
  }, 5000);

  // Return cleanup function
  return () => {
    clearInterval(sessionsInterval);
    clearInterval(messagesInterval);
    console.log('[Sync] Sync intervals cleared');
  };
};

/**
 * Manual sync trigger - can be called on demand
 */
export const triggerManualSync = async (dispatch: AppDispatch, getState: () => RootState) => {
  console.log('[Sync] Manual sync triggered');
  await Promise.all([
    syncChatSessions(dispatch, getState),
    syncChatMessages(dispatch, getState),
  ]);
};
