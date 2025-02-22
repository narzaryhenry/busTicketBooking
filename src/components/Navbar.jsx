import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Tickets", link: "/tickets" },
    { label: "About", link: "/about" },
  ];

  /* Handle Click Open */
  const handleClickOpen = () => {
    setOpen(!open);
  };

  /* Handle Click Close */
  const handleClickClose = () => {
    setOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        handleClickClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Scroll behavior: Hide navbar when scrolling down, show when scrolling up.
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollPosition(currentScrollPos);
      if (prevScrollPos > currentScrollPos) {
        // Scrolling up
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-[8ch] fixed top-0 left-0 backdrop-blur-lg transition-transform duration-300 z-50 shadow-md border-b border-neutral-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between lg:px-24 md:px-16 sm:px-7 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl text-black font-bold tracking-wide hover:text-red-400 transition duration-200"
        >
          blackBus
        </Link>

        {/* Desktop Nav Links & Sign In  */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex items-center gap-8 text-lg text-black font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition duration-200 ${
                      isActive
                        ? "text-red-400"
                        : "hover:text-red-400 hover:bg-red-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="px-6 py-2 bg-red-400 hover:bg-transparent border border-red-400 rounded-full text-base font-semibold text-black hover:text-red-400 transition duration-300 shadow-sm cursor-pointer">
            Sign In
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center justify-end w-full">
          <div
            className="w-10 h-10 flex items-center justify-center cursor-pointer text-black hover:text-red-400 transition duration-200"
            onClick={handleClickOpen}
          >
            {open ? <FaX /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-[8ch] left-0 w-full bg-white shadow-md py-4 z-40 border-t border-neutral-200 transition-all duration-300 transform animate-slide-down"
        >
          {/* Mobile Nav Links */}
          <ul className="list-none flex flex-col items-center gap-5 text-lg text-neutral-700 font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  onClick={handleClickClose}
                  className={({ isActive }) =>
                    `w-full text-center px-4 py-2 rounded-md transition duration-200 ${
                      isActive
                        ? "text-red-400"
                        : "hover:text-red-400 hover:bg-red-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Sign In Button */}
          <div className="w-11/12 mt-4 mx-auto px-4 py-2 bg-red-400 hover:bg-transparent border border-red-400 rounded-full text-base font-semibold text-black hover:text-red-400 transition duration-300 shadow cursor-pointer text-center">
            Sign In
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
