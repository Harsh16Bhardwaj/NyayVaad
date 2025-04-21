import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthButtons() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-4">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-purple-600 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Sign Up
            </button>
          </SignUpButton>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-purple-600">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
} 