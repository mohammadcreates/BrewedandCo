import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const menuData = {
  coffee: [
    { name: 'Espresso', desc: 'Bold single shot, pure and intense', price: '$2.50', badges: ['Hot'] },
    { name: 'Caramel Latte', desc: 'Espresso, steamed milk & caramel drizzle', price: '$4.50', badges: ['Hot', 'Iced'] },
    { name: 'Flat White', desc: 'Double ristretto with velvety microfoam', price: '$3.80', badges: ['Hot'] },
    { name: 'Cold Brew', desc: 'Steeped 12 hours, smooth & never bitter', price: '$4.00', badges: ['Cold', 'New'] },
    { name: 'Cappuccino', desc: 'Equal parts espresso, milk & foam', price: '$3.50', badges: ['Hot'] },
    { name: 'Vanilla Macchiato', desc: 'Layered espresso with vanilla & milk', price: '$4.80', badges: ['Hot', 'Iced'] },
  ],
  tea: [
    { name: 'Chamomile Dream', desc: 'Calming floral blend with honey', price: '$3.00', badges: ['Hot', 'Vegan'] },
    { name: 'Matcha Latte', desc: 'Ceremonial grade matcha, oat milk', price: '$4.50', badges: ['Hot', 'Iced', 'Vegan'] },
    { name: 'Herbal Tea', desc: 'Classic caffeine-free herbal infusion', price: '$2.80', badges: ['Hot'] },
    { name: 'Mint Refresh', desc: 'Fresh peppermint, served hot or iced', price: '$3.00', badges: ['Hot', 'Iced', 'Vegan'] },
  ],
  smoothies: [
    { name: 'Tropical Sunrise', desc: 'Mango, pineapple, passion fruit', price: '$5.50', badges: ['Cold', 'Vegan'] },
    { name: 'Berry Boost', desc: 'Strawberry, blueberry & banana blend', price: '$5.50', badges: ['Cold', 'Vegan', 'New'] },
    { name: 'Green Glow', desc: 'Spinach, apple, ginger & cucumber', price: '$5.80', badges: ['Cold', 'Vegan'] },
    { name: 'Peanut Power', desc: 'Banana, peanut butter & oat milk', price: '$6.00', badges: ['Cold'] },
  ],
};

const foodSections = [
  {
    label: 'Treats',
    items: [
      { name: 'Chocolate Chip Cookie', desc: 'Warm, gooey center with melted chocolate chips', price: '$2.50', badges: ['New'] },
      { name: 'Velvet Red Cake', desc: 'Classic red velvet layered with cream cheese frosting', price: '$5.50', badges: [] },
      { name: 'Hazelnut Praline Cake', desc: 'Layered sponge with hazelnut cream & praline crunch', price: '$5.80', badges: [] },
      { name: 'Cheese Croissant', desc: 'Flaky pastry filled with melted aged cheddar', price: '$4.00', badges: ['Hot'] },
      { name: 'Chocolate Croissant', desc: 'Buttery pastry with dark chocolate filling', price: '$4.20', badges: ['Hot'] },
      { name: 'coming-soon', desc: '', price: '', badges: [] },
    ],
  },
  {
    label: 'Light Love',
    items: [
      { name: 'Avocado Toast', desc: 'Sourdough, smashed avo, chili flakes', price: '$7.50', badges: ['Vegan'] },
      { name: 'Granola Bowl', desc: 'Yogurt, honey, seasonal fruits', price: '$6.00', badges: ['Vegan'] },
      { name: 'Cheese Panini', desc: 'Mozzarella, tomato & pesto pressed', price: '$6.50', badges: [] },
      { name: 'Egg & Feta Wrap', desc: 'Scrambled eggs, feta, spinach in a soft wrap', price: '$7.00', badges: [] },
    ],
  },
  {
    label: 'Guilt Free',
    items: [
      { name: 'Almond Flour Brownie', desc: 'Fudgy, gluten-free, low sugar cocoa brownie', price: '$3.80', badges: ['Low Cal', 'Vegan'] },
      { name: 'Banana Oat Muffin', desc: 'Naturally sweetened, no refined sugar', price: '$3.20', badges: ['Low Cal'] },
      { name: 'Protein Pancake Stack', desc: 'Fluffy oat & whey pancakes, no refined sugar', price: '$6.50', badges: ['Low Cal', 'High Protein'] },
      { name: 'Greek Yogurt Parfait', desc: 'High protein yogurt, berries & granola, no added sugar', price: '$5.50', badges: ['Low Cal', 'High Protein'] },
    ],
  },
  {
    label: 'Power Bowls',
    items: [
      { name: 'Mediterranean Bowl', desc: 'Quinoa, hummus, cucumber, olives, cherry tomato', price: '$9.50', badges: ['Vegan'] },
      { name: 'Grilled Chicken Bowl', desc: 'Chicken breast, greens, avocado, tahini dressing', price: '$11.00', badges: ['High Protein'] },
      { name: 'Roasted Veggie Bowl', desc: 'Sweet potato, kale, chickpeas, lemon tahini', price: '$9.00', badges: ['Vegan'] },
      { name: 'Tuna & Egg Bowl', desc: 'Seared tuna, boiled egg, mixed greens, sesame', price: '$12.00', badges: ['High Protein'] },
    ],
  },
];

const badgeStyles = {
  Hot: 'bg-orange-100 text-orange-800',
  Iced: 'bg-blue-100 text-blue-800',
  Cold: 'bg-blue-100 text-blue-800',
  Vegan: 'bg-green-100 text-green-800',
  New: 'bg-amber-100 text-amber-800',
  'Low Cal': 'bg-emerald-100 text-emerald-800',
  'High Protein': 'bg-pink-100 text-pink-800',
};

function Badge({ label }) {
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${badgeStyles[label] || 'bg-gray-100 text-gray-700'}`}>
      {label}
    </span>
  );
}

function MenuItem({ name, desc, price, badges }) {
  const { addItem } = useCart();

  if (name === 'coming-soon') {
    return (
      <div className="bg-amber-50 p-5 flex items-center gap-3">
        <span className="text-amber-800 font-serif text-lg font-semibold">Crafting new special</span>
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path d="M14 2 C14 2 15.2 9.5 18 12 C20.8 14.5 26 14 26 14 C26 14 20.8 13.5 18 16 C15.2 18.5 14 26 14 26 C14 26 12.8 18.5 10 16 C7.2 13.5 2 14 2 14 C2 14 7.2 14.5 10 12 C12.8 9.5 14 2 14 2Z" fill="#c8a882" stroke="#7b4f2e" strokeWidth="0.5" />
          <path d="M23 4 C23 4 23.6 7.2 25 8.5 C26.4 9.8 28 9.5 28 9.5 C28 9.5 26.4 9.2 25 10.5 C23.6 11.8 23 15 23 15 C23 15 22.4 11.8 21 10.5 C19.6 9.2 18 9.5 18 9.5 C18 9.5 19.6 9.8 21 8.5 C22.4 7.2 23 4 23 4Z" fill="#e8c97a" stroke="#c8a882" strokeWidth="0.3" />
          <path d="M6 2 C6 2 6.5 4.5 7.5 5.5 C8.5 6.5 10 6.2 10 6.2 C10 6.2 8.5 6 7.5 7 C6.5 8 6 10.5 6 10.5 C6 10.5 5.5 8 4.5 7 C3.5 6 2 6.2 2 6.2 C2 6.2 3.5 6.5 4.5 5.5 C5.5 4.5 6 2 6 2Z" fill="#e8c97a" stroke="#c8a882" strokeWidth="0.3" />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 flex justify-between items-start gap-4 hover:bg-amber-50 transition-colors duration-150">
      <div className="flex-1">
        <p className="font-serif text-lg font-semibold text-amber-950 mb-0.5">{name}</p>
        <p className="text-xs text-amber-700 font-light leading-relaxed">{desc}</p>
        {badges.length > 0 && (
          <div className="flex gap-1 flex-wrap mt-1.5">
            {badges.map((b) => <Badge key={b} label={b} />)}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-serif text-lg font-semibold text-amber-800 whitespace-nowrap">{price}</p>
        <button
          onClick={() => addItem({ name, desc, price, badges })}
          className="bg-amber-800 text-amber-50 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-amber-700 transition-all duration-200 whitespace-nowrap"
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}

function MenuGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-amber-100 border border-amber-100 rounded-2xl overflow-hidden mb-10">
      {items.map((item) => (
        <MenuItem key={item.name} {...item} />
      ))}
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2 className="font-serif text-3xl font-bold text-amber-950 whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-px bg-amber-100" />
    </div>
  );
}

function SubsectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mt-8 mb-4">
      <h3 className="font-serif text-xl font-semibold text-amber-800 whitespace-nowrap">{title}</h3>
      <div className="flex-1 h-px bg-amber-100" />
    </div>
  );
}

const filters = ['All', 'Coffee', 'Tea', 'Smoothies', 'Food'];

function Menu() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'All';
  const [active, setActive] = useState(initialFilter);
  

  useEffect(() => {
    const filter = searchParams.get('filter') || 'All';
    setActive(filter);
    window.scrollTo(0, 0);
  }, [searchParams]);

  return (
    <main>

      {/* Hero */}
      <section className="bg-amber-950 py-16 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50 tracking-wide mb-2">Our Menu</h1>
        <p className="text-amber-300 font-light text-base">Something for every mood, every moment.</p>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-10 bg-amber-50 border-b border-amber-100 flex justify-center gap-3 py-4 px-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-sm font-medium px-5 py-1.5 rounded-full border-[1.5px] transition-all duration-200
              ${active === f
                ? 'bg-amber-800 text-amber-50 border-amber-800'
                : 'bg-transparent text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Coffee */}
        {(active === 'All' || active === 'Coffee') && (
          <div>
            <SectionHeader title="Coffee" />
            <MenuGrid items={menuData.coffee} />
          </div>
        )}

        {/* Tea */}
        {(active === 'All' || active === 'Tea') && (
          <div>
            <SectionHeader title="Tea" />
            <MenuGrid items={menuData.tea} />
          </div>
        )}

        {/* Smoothies */}
        {(active === 'All' || active === 'Smoothies') && (
          <div>
            <SectionHeader title="Smoothies" />
            <MenuGrid items={menuData.smoothies} />
          </div>
        )}

        {/* Food */}
        {(active === 'All' || active === 'Food') && (
          <div id="food">
            <SectionHeader title="Food" />
            {foodSections.map((section) => (
              <div key={section.label} id={section.label === 'Guilt Free' ? 'guilt-free' : undefined}>
                <SubsectionHeader title={section.label} />
                <MenuGrid items={section.items} />
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default Menu;