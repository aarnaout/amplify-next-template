"use client";

import { useState } from "react";

export default function Header() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="SYNC home">
          SYNC
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#syria">Syria Conference</a>
          <a className="nav-link" href="#sv">Silicon Valley Conference</a>
          <a className="nav-link" href="#donate">Donate</a>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setIsRegisterOpen(true)}
            onMouseLeave={() => setIsRegisterOpen(false)}
          >
            <button className="register-btn" aria-haspopup="menu" aria-expanded={isRegisterOpen}>
              Register Now
            </button>
            {isRegisterOpen && (
              <div role="menu" className="dropdown-menu">
                <a role="menuitem" className="dropdown-item" href="#register-syria">Syria Event</a>
                <a role="menuitem" className="dropdown-item" href="#register-sv">Silicon Valley Event</a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}


