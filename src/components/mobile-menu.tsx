"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 901px)");
    const dismissOnDesktop = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", dismissOnDesktop);
    return () => desktop.removeEventListener("change", dismissOnDesktop);
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
      >
        <span aria-hidden="true" className="hamburger-lines">
          <i />
          <i />
        </span>
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Navigation menu"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-content">
          <div className="mobile-menu-top">
            <a href="#main" onClick={close} aria-label="Haneen home">
              <img
                src="/assets/609d0.svg"
                width="100"
                height="60"
                alt="HM, with a black cat"
              />
            </a>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Close menu"
              autoFocus
              onClick={close}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="mobile-menu-links" aria-label="Mobile navigation">
            <a href="#main" onClick={close}>
              Home
            </a>
            <Link href="/work" onClick={close}>
              Work
            </Link>
            <a href="#about" onClick={close}>
              About
            </a>
            <a href="#projects" onClick={close}>
              Projects
            </a>
            <a href="#contact" onClick={close}>
              Contact
            </a>
          </nav>
          <div className="mobile-menu-bottom">
            <p>Have a project in mind?</p>
            <a
              className="mobile-menu-contact"
              href={site.email ? `mailto:${site.email}` : "#contact"}
              onClick={close}
            >
              Let’s talk <span aria-hidden="true">↗</span>
            </a>
            <div className="mobile-menu-socials">
              {site.socials.map((s) => (
                <a key={s.name} href={s.href} onClick={close}>
                  {s.name}
                </a>
              ))}
            </div>
            <p className="mobile-menu-signature">
              Haneen Al-Metwally <span>Product Designer</span>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
