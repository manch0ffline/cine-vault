import Link from "next/link";
import Logo from "../Logo/logo";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar__container p-3">
        <Logo />
        <nav className="top-bar__nav d-flex gap-4" aria-label="Main navigation">
          <a href="#features" className="top-bar__nav__item">
            Features
          </a>
          <a href="#curated" className="top-bar__nav__item">
            Curated
          </a>
          <a href="#ready-to-start" className="top-bar__nav__item">
            Ready to Start
          </a>
        </nav>
        <div className="top-bar__buttons d-flex gap-2">
          <Link href="/login" className="btn p10-20">
            Sign In
          </Link>
          <Link href="/register" className="btn primary p10-20">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
