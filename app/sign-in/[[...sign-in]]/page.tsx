import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            QVIL Studios
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Admin Access
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-red-900 hover:bg-red-800 text-sm normal-case",
              card: "bg-white dark:bg-gray-900 shadow-xl",
              headerTitle: "text-gray-900 dark:text-white",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              socialButtonsBlockButton:
                "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700",
              formFieldLabel: "text-gray-700 dark:text-gray-300",
              formFieldInput:
                "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
              footerActionLink: "text-red-900 hover:text-red-800",
            },
          }}
        />
      </div>
    </div>
  );
}
