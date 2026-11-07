"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-in">
        <a className="logo" href="/">
          <span className="logo-mark">S</span>
          SatuDapur
        </a>
        <div className="nav-links">
          <a href="#masalah">Masalah</a>
          <a href="#fitur">Fitur</a>
          <a href="#cara">Cara Kerja</a>
          <a href="#harga">Harga</a>
        </div>
        <a className="btn btn-primary" href="#waitlist">
          Waiting List
        </a>
      </div>
    </nav>
  );
}
