'use client';

export default function LoginPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex flex-col w-full h-full min-h-screen items-center justify-center p-6 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
              <path className="fill-primary" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" />
              <path d="M24 14L34 24L24 34L14 24L24 14Z" fill="white" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-[#0d121b] dark:text-white tracking-light text-[32px] font-bold leading-tight text-center pb-8">
            Welcome Back
          </h1>

          {/* Email TextField */}
          <div className="flex w-full flex-wrap items-end gap-4 pb-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Email
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
            </label>
          </div>

          {/* Password TextField */}
          <div className="flex w-full flex-wrap items-end gap-4">
            <label className="flex flex-col w-full flex-1">
              <p className="text-[#0d121b] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Password
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c669a] dark:placeholder-gray-500 p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                  placeholder="Enter your password"
                  type="password"
                />
                <div className="text-[#4c669a] dark:text-gray-400 flex border border-[#cfd7e7] dark:border-gray-700 bg-background-light dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
              </div>
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="w-full flex justify-end pt-3">
            <p className="text-primary text-sm font-medium leading-normal underline cursor-pointer">
              Forgot Password?
            </p>
          </div>

          {/* Login Button */}
          <button className="flex items-center justify-center text-center font-medium text-base h-14 mt-8 w-full rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center w-full my-8">
            <div className="flex-grow h-px bg-[#cfd7e7] dark:bg-gray-700"></div>
            <span className="px-4 text-sm text-[#4c669a] dark:text-gray-400">OR</span>
            <div className="flex-grow h-px bg-[#cfd7e7] dark:bg-gray-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="w-full space-y-4">
            <button className="flex items-center justify-center text-center font-medium text-base h-14 w-full rounded-lg border border-[#cfd7e7] dark:border-gray-700 text-[#0d121b] dark:text-white bg-background-light dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="flex items-center justify-center text-center font-medium text-base h-14 w-full rounded-lg border border-[#cfd7e7] dark:border-gray-700 text-[#0d121b] dark:text-white bg-background-light dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 mr-3 dark:invert" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal leading-normal mt-8">
            Don't have an account?{' '}
            <a className="text-primary font-medium underline" href="/signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
