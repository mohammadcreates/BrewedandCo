import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleLocationsClick = () => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('locations');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-amber-950 px-6 pt-16 pb-8">
      <div className="max-w-5xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2C6 2 7 4 6 6C5 8 6 9 6 9" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M10 2C10 2 11 4 10 6C9 8 10 9 10 9" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M14 2C14 2 15 4 14 6C13 8 14 9 14 9" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M4 11H16L14.5 20H5.5L4 11Z" stroke="#F5E6D3" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M16 13.5H18C19.1 13.5 20 14.4 20 15.5C20 16.6 19.1 17.5 18 17.5H15.5" stroke="#F5E6D3" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-serif text-lg font-semibold text-amber-50 tracking-wide">
                Brewed & Co.
              </span>
            </Link>
            <p className="text-sm font-light text-amber-600 leading-relaxed mb-6 max-w-[220px]">
              A cozy corner for everyone — coffee, tea, smoothies & more. Crafted with care since 2015.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">

              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full bg-amber-900 border border-amber-800/40 flex items-center justify-center text-amber-500 hover:text-amber-200 hover:border-amber-600 transition-all duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full bg-amber-900 border border-amber-800/40 flex items-center justify-center text-amber-500 hover:text-amber-200 hover:border-amber-600 transition-all duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a href="#" className="w-8 h-8 rounded-full bg-amber-900 border border-amber-800/40 flex items-center justify-center text-amber-500 hover:text-amber-200 hover:border-amber-600 transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 rounded-full bg-amber-900 border border-amber-800/40 flex items-center justify-center text-amber-500 hover:text-amber-200 hover:border-amber-600 transition-all duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-base font-semibold text-amber-200 mb-4">Explore</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Home', to: './' },
                { label: 'Menu', to: './menu' },
                { label: 'About us', to: './about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-light text-amber-600 hover:text-amber-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLocationsClick}
                  className="text-sm font-light text-amber-600 hover:text-amber-300 transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
                >
                  Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-serif text-base font-semibold text-amber-200 mb-4">Menu</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Coffee', filter: 'Coffee' },
                { label: 'Tea', filter: 'Tea' },
                { label: 'Smoothies', filter: 'Smoothies' },
                { label: 'Food', filter: 'Food' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={`/menu?filter=${item.filter}`}
                    className="text-sm font-light text-amber-600 hover:text-amber-300 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-amber-200 mb-4">Contact</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: '+961 1 234 567'},
                { label: 'info@brewedco.com', href: 'mailto:info@brewedco.com' },
                { label: 'Instagram', href: '#' },
                { label: 'Facebook', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-light text-amber-600 hover:text-amber-300 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-amber-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs font-light text-amber-700">
            © 2025 Brewed & Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-light text-amber-700 hover:text-amber-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;