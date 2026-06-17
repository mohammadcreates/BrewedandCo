import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const handleHighProteinMenuClick = () => {
    navigate('/menu?filter=Food');
    setTimeout(() => {
      const section = document.getElementById('guilt-free');
      const navbar = document.querySelector('nav');
      const filterBar = document.getElementById('filter-bar');
      if (section) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const filterBarHeight = filterBar ? filterBar.offsetHeight : 0;
        const offset = navbarHeight + filterBarHeight + 16; // 16px breathing room
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  };
  return (
    <main>

      {/* Hero Section */}
      <section className="bg-amber-950 min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_#7b4f2e44_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,_#c8a88222_0%,_transparent_45%)] pointer-events-none" />
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-amber-50 leading-tight mb-4 tracking-wide relative z-10">
          Breathe. Sip. Relax.
        </h1>
        <p className="text-amber-300 text-lg font-light max-w-md leading-relaxed mb-2 relative z-10">
          Coffee, tea, smoothies & more — crafted for every taste.
        </p>
        <p className="text-amber-600 text-sm font-light mb-8 relative z-10">
          Visit us and taste the difference.
        </p>
        <Link
          to="/menu"
          className="bg-amber-300 text-amber-950 font-medium px-8 py-3 rounded-full hover:bg-amber-200 transition-all duration-200 relative z-10"
        >
          Explore Our Menu
        </Link>
      </section>

      {/* CTA Banner */}
      <div className="bg-amber-900 border-t border-amber-900 px-6 py-4 flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="bg-amber-800 text-amber-50 text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-widest">
            New
          </span>
          <p className="text-amber-50 text-sm font-light">
            Check our new <span className="text-amber-300 font-medium">High Protein Menu</span> — reach your macros the delicious way
          </p>
        </div>
        <button
          onClick={handleHighProteinMenuClick}
          className="text-amber-50 text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap bg-amber-700/80 border border-transparent shadow-[0_0_14px_5px_rgba(180,83,9,0.5)] hover:shadow-[0_0_24px_10px_rgba(180,83,9,0.65)] hover:bg-amber-700 transition-all duration-300"
        >
          Discover Now →
        </button>
      </div>

      {/* Featured Section */}
      <section className="bg-amber-50 py-20 px-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 text-center mb-12">
          Our Favorites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Espresso', desc: 'Bold and rich, our signature single shot.', emoji: '☕' },
            { name: 'Herbal Tea', desc: 'Soothing blends to calm your mind and body.', emoji: '🍵' },
            { name: 'Fresh Smoothie', desc: 'Blended daily with real fruits, no shortcuts.', emoji: '🥤' },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-2xl p-8 text-center border border-amber-100 hover:shadow-md transition-all duration-200">
              <span className="text-5xl mb-4 block">{item.emoji}</span>
              <h3 className="font-serif text-xl font-semibold text-amber-950 mb-2">{item.name}</h3>
              <p className="text-amber-700 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Snippet */}
      <section className="bg-amber-300 py-16 px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 mb-4">
          Our Story
        </h2>
        <p className="text-amber-900 font-light max-w-xl mx-auto mb-6 leading-relaxed">
          Founded in 2015, Brewed & Co. started as a small corner café with a big passion for quality drinks. Today we serve hundreds of happy customers every day.
        </p>
        <Link
          to="/about"
          className="text-amber-900 font-medium underline hover:text-amber-950 transition-all duration-200"
        >
          Learn more about us →
        </Link>
      </section>

      {/* Locations Section */}
      <section id="locations" className="bg-amber-50 py-20 px-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 text-center mb-2">
          Find Us
        </h2>
        <p className="text-center text-amber-700 text-sm mb-12">
          Three locations, one commitment to quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { badge: 'Downtown', name: 'City Center', address: '12 Main Street, Downtown', phone: '+961 1 234 567', hours: 'Mon – Fri: 7am – 9pm | Sat – Sun: 8am – 10pm' },
            { badge: 'Seaside', name: 'Corniche Branch', address: '45 Corniche Avenue, Beirut', phone: '+961 1 345 678', hours: 'Mon – Fri: 7am – 10pm | Sat – Sun: 8am – 11pm' },
            { badge: 'Uptown', name: 'Achrafieh Lounge', address: '8 Sassine Square, Achrafieh', phone: '+961 1 456 789', hours: 'Mon – Fri: 8am – 9pm | Sat – Sun: 9am – 10pm' },
          ].map((loc) => (
            <div key={loc.name} className="bg-white rounded-2xl p-6 border border-amber-100">
              <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                {loc.badge}
              </span>
              <h3 className="font-serif text-xl font-semibold text-amber-950 mb-2">{loc.name}</h3>
              <p className="text-amber-700 text-sm mb-1">{loc.address}</p>
              <p className="text-amber-700 text-sm mb-4">{loc.phone}</p>
              <div className="border-t border-amber-100 pt-4 text-xs text-amber-500">
                {loc.hours}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default Home;