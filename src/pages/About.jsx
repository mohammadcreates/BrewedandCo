import { Link, useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  const handleLocationsClick = () => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('locations');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main>

      {/* Hero */}
      <section className="bg-amber-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,_#7b4f2e55_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,_#c8a88218_0%,_transparent_45%)] pointer-events-none" />
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-amber-50 tracking-wide relative z-10 mb-4">
          Our Story
        </h1>
        <p className="font-serif text-xl italic text-amber-300 relative z-10 max-w-lg mx-auto leading-relaxed px-6">
          "A small corner, a big dream, and a whole lot of coffee."
        </p>
      </section>

      {/* Story */}
      <section className="bg-amber-50 py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-amber-400 mb-3">
              Est. 2015 · Beirut
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 leading-tight mb-6">
              From one cup to thousands of smiles
            </h2>
            <p className="text-amber-700 font-light leading-relaxed mb-4">
              It started in a tiny corner of Achrafieh with secondhand chairs, mismatched mugs, and one very passionate barista. We had no grand plan — just an obsession with crafting drinks that made people pause, breathe, and smile.
            </p>
            <p className="text-amber-700 font-light leading-relaxed mb-4">
              A decade later, Brewed & Co. has grown into three beloved locations across Beirut. But our heart hasn't changed — every drink is still made with the same care and intention as that very first cup.
            </p>
            <p className="text-amber-700 font-light leading-relaxed">
              We believe a great café is more than just good coffee. It's a place where you feel welcomed, unhurried, and genuinely taken care of — whatever you're drinking.
            </p>
          </div>

          <div className="bg-amber-950 rounded-2xl p-8 flex flex-col gap-6">
            {[
              { num: '10+', label: 'Years of crafting drinks with love' },
              { num: '3', label: 'Locations across Beirut' },
              { num: '500+', label: 'Happy customers served daily' },
              { num: '40+', label: 'Menu items for every taste' },
            ].map((stat, i) => (
              <div key={i} className={`${i < 3 ? 'border-b border-amber-800/40 pb-6' : ''}`}>
                <p className="font-serif text-5xl font-bold text-amber-300 leading-none mb-1">{stat.num}</p>
                <p className="text-sm font-light text-amber-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-amber-950 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50 mb-2">What we stand for</h2>
            <p className="text-amber-600 text-sm font-light">The principles that guide every cup we make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '☕', title: 'Quality first', desc: 'We source ethically, brew carefully, and never cut corners — because you deserve a drink that\'s made right.' },
              { emoji: '🤝', title: 'Everyone welcome', desc: 'Coffee lover or not, there\'s something here for you. Our menu is built for every mood and every person.' },
              { emoji: '🌿', title: 'Mindful choices', desc: 'From compostable cups to locally sourced ingredients, we care about the planet as much as the perfect pour.' },
            ].map((value) => (
              <div key={value.title} className="bg-amber-900/40 border border-amber-800/40 rounded-2xl p-6">
                <span className="text-3xl mb-4 block">{value.emoji}</span>
                <h3 className="font-serif text-xl font-semibold text-amber-300 mb-2">{value.title}</h3>
                <p className="text-amber-600 text-sm font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-amber-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 mb-2">The faces behind your cup</h2>
            <p className="text-amber-500 text-sm font-light">A small team with a big passion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: 'MM', name: 'Mohammad Al Masri', role: 'Founder & Head Barista', desc: 'Started Brewed & Co. from his kitchen table. Still makes the best flat white in the house.' },
              { initials: 'JN', name: 'Joe Nassar', role: 'Head of Food', desc: 'Former pastry chef turned café dreamer. Behind every treat and power bowl on our menu.' },
              { initials: 'MS', name: 'Maya Saleh', role: 'Community Manager', desc: 'She remembers your name, your order, and somehow always knows when you need an extra shot.' },
            ].map((member) => (
              <div key={member.name} className="bg-white border border-amber-100 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-300 flex items-center justify-center font-serif text-2xl font-bold text-amber-950 mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-serif text-lg font-semibold text-amber-950 mb-1">{member.name}</h3>
                <p className="text-xs font-medium tracking-widest uppercase text-amber-400 mb-3">{member.role}</p>
                <p className="text-amber-700 text-sm font-light leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-amber-300 py-16 px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 mb-4">
          Come as you are
        </h2>
        <p className="text-amber-900 font-light max-w-xl mx-auto mb-8 leading-relaxed">
          Whether you need a quiet corner to think, a warm drink on a cold morning, or just a friendly face — our doors are always open.
        </p>
        <button
          onClick={handleLocationsClick}
          className="bg-amber-950 text-amber-50 text-sm font-medium px-8 py-3 rounded-full hover:bg-amber-900 transition-all duration-200"
        >
          Find a location near you →
        </button>
      </section>

    </main>
  );
}

export default About;