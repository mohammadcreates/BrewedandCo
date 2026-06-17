import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleLocationsClick = () => {
    setMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('locations');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-amber-200 px-4 sm:px-10 h-16 flex items-center justify-between shadow-md sticky top-0 z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
        <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 2C6 2 7 4 6 6C5 8 6 9 6 9" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M10 2C10 2 11 4 10 6C9 8 10 9 10 9" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M14 2C14 2 15 4 14 6C13 8 14 9 14 9" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M4 11H16L14.5 20H5.5L4 11Z" stroke="#F5E6D3" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M16 13.5H18C19.1 13.5 20 14.4 20 15.5C20 16.6 19.1 17.5 18 17.5H15.5" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="font-serif text-lg sm:text-xl font-semibold text-amber-950 tracking-wide">
          Brewed & Co.
        </span>
      </Link>

      {/* Desktop Nav + Cart */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-amber-950 font-medium tracking-wide pb-1 border-b-2 transition-all duration-200 ${location.pathname === link.path ? 'border-amber-800 text-amber-800' : 'border-transparent hover:text-amber-800 hover:border-amber-800'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLocationsClick}
              className="text-amber-950 font-medium tracking-wide pb-1 border-b-2 border-transparent hover:text-amber-800 hover:border-amber-800 transition-all duration-200 bg-transparent cursor-pointer"
            >
              Locations
            </button>
          </li>
        </ul>

        <Link to="/checkout" className="relative flex items-center justify-center w-10 h-10 bg-amber-800 rounded-full hover:bg-amber-700 transition-all duration-200 flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6h18" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M16 10a4 4 0 01-8 0" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-amber-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile: Cart + Hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <Link to="/checkout" className="relative flex items-center justify-center w-9 h-9 bg-amber-800 rounded-full hover:bg-amber-700 transition-all duration-200 flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6h18" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M16 10a4 4 0 01-8 0" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-amber-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 flex items-center justify-center bg-amber-800/20 rounded-full hover:bg-amber-800/30 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5c3a1e" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-amber-200 border-t border-amber-300 shadow-lg md:hidden">
          <ul className="flex flex-col list-none">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-6 py-3 text-amber-950 font-medium tracking-wide border-b border-amber-300/50 transition-colors duration-200 ${location.pathname === link.path ? 'bg-amber-300/50 text-amber-800' : 'hover:bg-amber-300/30'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLocationsClick}
                className="w-full text-left px-6 py-3 text-amber-950 font-medium tracking-wide hover:bg-amber-300/30 transition-colors duration-200 bg-transparent cursor-pointer border-b border-amber-300/50"
              >
                Locations
              </button>
            </li>
          </ul>
        </div>
      )}

    </nav>
  );
}

export default Navbar;