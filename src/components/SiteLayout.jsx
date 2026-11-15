import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV = [
  { to: "/projects", label: "Projects" },
  { to: "/research", label: "Research" },
];

export const LINKS = [
  { href: "mailto:mprakash@ucsd.edu", label: "Email" },
  { href: "https://www.linkedin.com/in/mohakap/", label: "LinkedIn" },
  { href: "https://github.com/tc960", label: "GitHub" },
  { href: "https://devpost.com/mprakash", label: "Devpost" },
  { href: "/mohak_resume_uk.pdf", label: "Resume (UK)" },
];

const navLink = "text-[16px] text-site-soft hover:text-site-accent";

const SiteHeader = () => (
  <header className="page flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-8">
    <Link to="/" className="text-[19px] font-medium text-site-ink hover:text-site-accent">
      Mohak Prakash
    </Link>
    <nav className="flex items-baseline gap-5">
      {NAV.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "text-[16px] text-site-accent" : navLink)}
        >
          {label}
        </NavLink>
      ))}
      <a href="/#writing" className={navLink}>
        Writing
      </a>
      <a href="/mohak_resume.pdf" target="_blank" rel="noopener noreferrer" className={navLink}>
        Resume
      </a>
    </nav>
  </header>
);

const SiteFooter = () => (
  <footer className="page mt-24 pb-12">
    <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-site-rule pt-6 text-[16px]">
      {LINKS.map(({ href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="text-site-soft hover:text-site-accent"
        >
          {label}
        </a>
      ))}
    </div>
    <p className="mono mt-4">Mohak Akul Prakash, UC San Diego</p>
  </footer>
);

// Wraps every page: header, content column, footer. Also handles #hash
// scrolling, which react-router does not do on its own.
const SiteLayout = ({ children, backdrop = true }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="relative min-h-[100dvh] overflow-x-clip">
      {backdrop && <div className="grid-backdrop" aria-hidden="true" />}
      <div className="grain" aria-hidden="true" />
      <div className="relative z-10">
        <SiteHeader />
        <main className="page">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
};

export default SiteLayout;
