'use client';

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="flex w-full max-w-md flex-col items-center p-4 pt-12">
        {/* Logo */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <span className="material-symbols-outlined text-5xl text-primary">shopping_bag</span>
        </div>

        {/* Headline */}
        <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-8">
          Create Account
        </h1>

        {/* Form Fields */}
        <div className="w-full space-y-4">
          {/* Full Name */}
          <div className="flex w-full flex-wrap items-end gap-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Full Name
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-0 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your full name"
              />
            </label>
          </div>

          {/* Email */}
          <div className="flex w-full flex-wrap items-end gap-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Email
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-0 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your email address"
                type="email"
              />
            </label>
          </div>

          {/* Phone Number */}
          <div className="flex w-full flex-wrap items-end gap-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Phone Number
              </p>
              <div className="relative flex w-full items-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-[#0d121b] dark:text-gray-400 text-base font-normal">+20</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-0 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder:text-gray-500 pl-12 pr-4 py-[15px] text-base font-normal leading-normal"
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
            </label>
          </div>

          {/* Password */}
          <div className="flex w-full flex-wrap items-end gap-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Password
              </p>
              <div className="relative flex w-full items-center">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-0 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder:text-gray-500 p-[15px] pr-12 text-base font-normal leading-normal"
                  placeholder="Enter your password"
                  type="password"
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#4c669a] dark:text-gray-500">
                  <span className="material-symbols-outlined">visibility_off</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Must be 8+ characters and contain at least 1 number.
              </p>
            </label>
          </div>

          {/* Confirm Password */}
          <div className="flex w-full flex-wrap items-end gap-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Confirm Password
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-0 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                placeholder="Confirm your password"
                type="password"
              />
            </label>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:bg-gray-700 dark:checked:bg-primary"
              id="terms"
              type="checkbox"
            />
            <label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="terms">
              I agree to the{' '}
              <a className="font-medium text-primary hover:underline" href="#">
                Terms & Privacy
              </a>
              .
            </label>
          </div>
        </div>

        {/* Sign Up Button */}
        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-primary/90 mt-8">
          Sign Up
        </button>

        {/* Divider */}
        <div className="relative flex w-full items-center justify-center py-8">
          <div className="absolute h-px w-full bg-gray-200 dark:bg-gray-700"></div>
          <span className="relative bg-background-light dark:bg-background-dark px-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            OR
          </span>
        </div>

        {/* Social Sign Up Buttons */}
        <div className="flex w-full flex-col gap-4">
          <button className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-base font-medium text-[#0d121b] dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign up with Google</span>
          </button>
          <button className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-black px-4 py-2.5 text-base font-medium text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <svg className="h-6 w-6 dark:invert" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span>Sign up with Apple</span>
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-8 text-center text-base text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a className="font-semibold text-primary hover:underline" href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
