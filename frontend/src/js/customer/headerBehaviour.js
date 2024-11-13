// src/js/customer/headerBehaviour.js
import { useEffect, useRef, useState } from "react";

export default function HeaderBehaviour({
  headerRef,
  logoRef,
  setIsScrolled,
  linkLogo1,
  linkLogo2,
}) {
  // Scroll toggle header style and logo
  const handleScroll = () => {
    if (headerRef.current && logoRef.current) {
      setIsScrolled(window.scrollY > 5 && window.innerWidth > 992);
      const logoSrc =
        window.scrollY > 5 && window.innerWidth > 992 ? linkLogo2 : linkLogo1;
      logoRef.current.src = logoSrc;
    }
  };

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [linkLogo1, linkLogo2]);
}

export function useHeaderBehaviour(logo) {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const linkLogo1 = logo;
  const linkLogo2 = logo;

  HeaderBehaviour({ headerRef, logoRef, setIsScrolled, linkLogo1, linkLogo2 });

  return { headerRef, logoRef, isScrolled };
}
