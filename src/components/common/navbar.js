"use client";
import { useState, useEffect } from "react";
import { FiHome, FiList, FiInfo, FiUser } from "react-icons/fi";
import styles from "./navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Trigger after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <nav className={styles.navbar}>
          {/* Logo */}
          <div className={styles.logo}>
            <a href="/">
              <img
                src="/assets/images/logo/madinterio-footer.svg"
                alt="Connect with top interior designers for premium home decor."
                loading="lazy"
                // title="MADINTERIO - Top Interior Designers Network Logo"
              />
            </a>
          </div>

          {/* Links */}
          <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/designers">Designers</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact" className={styles.contactBtn}>
                Contact Us <span>→</span>
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <div
            className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>

      {/* Bottom Navigation for Mobile/Tablet */}
      <div className={styles.bottomNav}>
        <ul>
          <li>
            <a href="/">
              <FiHome size={24} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/designers">
              <FiList size={24} />
              <span>Designers</span>
            </a>
          </li>
          <li>
            <a href="/about">
              <FiInfo size={24} />
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="/contact">
              <FiUser size={24} />
              <span>Contact</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
