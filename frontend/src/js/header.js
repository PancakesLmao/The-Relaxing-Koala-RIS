// src/js/headerBehaviour.js
import { useEffect } from "react";
export default function HeaderBehaviour({
  headerRef,
  logoRef,
  setIsScrolled,
  linkLogo1,
  linkLogo2,
}) {
  //Scrol toggle header style and logo
  const handleScroll = () => {
    if (headerRef.current && logoRef.current) {
      setIsScrolled(window.scrollY > 5 && window.innerWidth > 992);
      const logoSrc =
        window.scrollY > 5 && window.innerWidth > 992 ? linkLogo2 : linkLogo1;
      logoRef.current.src = logoSrc;
    }
  };

  //Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [linkLogo1, linkLogo2]);
}
