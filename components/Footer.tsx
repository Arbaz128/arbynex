export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-12">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} ARBYNEX — AI Automation Agency. Built to
          make your business unstoppable.
        </p>
        <div className="flex gap-7">
          <a
            href="#services"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            Services
          </a>
          <a
            href="#process"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            Process
          </a>
          <a
            href="#contact"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
