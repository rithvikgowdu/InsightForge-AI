type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Branding Panel */}
      <div className="hidden w-1/2 flex-col justify-between border-r border-slate-800 bg-slate-900 p-12 lg:flex">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              I
            </div>

            <span className="text-xl font-bold text-white">
              InsightForge AI
            </span>
          </div>

          <div className="mt-20 max-w-lg">
            <p className="text-sm font-medium text-blue-400">
              AI-Powered Product Intelligence
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
              Turn customer feedback into your next product opportunity.
            </h1>

            <p className="mt-6 text-base leading-7 text-slate-400">
              Discover recurring customer problems, emerging trends,
              feature requests, and high-potential product opportunities
              using AI.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 InsightForge AI
        </p>

      </div>


      {/* Form Panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              I
            </div>

            <span className="text-xl font-bold text-white">
              InsightForge AI
            </span>

          </div>


          {/* Heading */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {subtitle}
            </p>

          </div>


          {/* Content */}
          {children}

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;