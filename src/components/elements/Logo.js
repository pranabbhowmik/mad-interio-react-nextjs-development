import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="footer-details">
      <Link href="/">
        <img
          src="/assets/images/logo/logo-md.svg"
          alt="Connect with top interior designers for premium home decor."
          className="img-fluid"
          loading="lazy"
          id="footer-logo"
        />
      </Link>
    </div>
  );
};

export { Logo };
