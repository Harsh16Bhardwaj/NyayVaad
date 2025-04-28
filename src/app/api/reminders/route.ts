import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email template
const createReminderEmail = (todo: any, user: any) => ({
  from: `"NyaayVaad" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: `Reminder: ${todo.title} is due tomorrow`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2d3748; margin-bottom: 20px;">Upcoming Task Reminder</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #4a5568; margin-bottom: 10px;">${todo.title}</h3>
          <p style="color: #718096; margin-bottom: 15px;">${todo.description || 'No description provided'}</p>
          
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="color: #4a5568; font-weight: bold;">Due Date:</span>
            <span style="color: #718096; margin-left: 10px;">${new Date(todo.deadline).toLocaleDateString()}</span>
          </div>
          
          <div style="display: flex; align-items: center;">
            <span style="color: #4a5568; font-weight: bold;">Status:</span>
            <span style="color: #718096; margin-left: 10px; text-transform: capitalize;">${todo.status}</span>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/todos/${todo.id}" 
             style="background-color: #4f46e5; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            View Task
          </a>
        </div>
        
        <div style="margin-top: 30px; color: #718096; font-size: 12px; text-align: center;">
          <p>This is an automated reminder from NyaayVaad.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </div>
  `,
});

export async function GET() {
  try {
    // Get all todos with deadline tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const { data: todos, error: todosError } = await supabase
      .from('todos')
      .select('*')
      .eq('status', 'pending')
      .gte('deadline', tomorrow.toISOString())
      .lt('deadline', new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000).toISOString());

    if (todosError) throw todosError;

    // Send emails for each todo
    const emailPromises = todos.map(async (todo) => {
      // Get user details
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', todo.user_id)
        .single();

      if (userError) throw userError;

      // Send email
      const mailOptions = createReminderEmail(todo, user);
      await transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ 
      success: true, 
      message: 'Reminder emails sent successfully',
      count: todos.length 
    });
  } catch (error) {
    console.error('Error sending reminder emails:', error);
    return NextResponse.json(
      { error: 'Failed to send reminder emails' },
      { status: 500 }
    );
  }
} 