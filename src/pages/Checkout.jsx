import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { tokens } from '../styles/tokens';
import whishlogo from '../assets/images/whish-logo.webp';


const PROMO_CODES = {
  'BREWED10': 0.10,
  'WELCOME15': 0.15,
  'PROTEIN20': 0.20,
};

function Checkout() {
  const { cart, increment, decrement, removeItem, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [validationPopup, setValidationPopup] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', district: 'Beirut', notes: '',
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');
  const [charity, setCharity] = useState(2);
  const [customCharity, setCustomCharity] = useState('2');

  const delivery = 2.00;
  const tax = parseFloat((totalPrice * 0.11).toFixed(2));
  const discount = parseFloat((totalPrice * promoDiscount).toFixed(2));
  const total = parseFloat((totalPrice + delivery + tax - discount + charity).toFixed(2));

  const validate = () => {
    const newErrors = {};
    let popupMessage = '';

    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.lastName.trim()) newErrors.lastName = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = true;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'invalid';
      popupMessage = 'Please enter a valid email address (e.g. name@email.com)';
    }

    // Phone validation
    const phoneRegex = /^(03|71|76|78|81|70|79)\d{6}$/;
    const cleanPhone = form.phone.replace(/[\s\-\+]/g, '');
    if (!form.phone.trim()) {
      newErrors.phone = true;
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'invalid';
      popupMessage = 'Please enter a valid Lebanese number starting with 03, 70, 71, 76, 78, 81 or 79 followed by 6 digits (e.g. 71123456)';
    }

    if (!form.address.trim()) newErrors.address = true;
    if (!form.city.trim()) newErrors.city = true;
    if (!paymentMethod) newErrors.paymentMethod = true;

    return { newErrors, popupMessage };
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handlePromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoDiscount(PROMO_CODES[code]);
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoDiscount(0);
      setPromoApplied('');
      setPromoError('Invalid promo code. Try BREWED10, WELCOME15 or PROTEIN20.');
    }
  };

  const handleCharity = (amount) => {
    setCharity(amount);
    setCustomCharity(String(amount));
  };

  const handleCustomCharity = (e) => {
    const val = e.target.value;
    setCustomCharity(val);
    setCharity(parseFloat(val) || 0);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="bg-amber-50 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className={`${tokens.sectionTitle} text-3xl mb-2`}>Your cart is empty</h2>
        <p className={`${tokens.muted} mb-8`}>Looks like you haven't added anything yet.</p>
        <Link to="/menu" className="bg-amber-800 text-amber-50 font-medium px-8 py-3 rounded-full hover:bg-amber-700 transition-all duration-200">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-amber-50 min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className={`${tokens.pageTitle} mb-1`}>Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10 text-sm">
          <span className="text-amber-950 font-medium">Cart</span>
          <span className="text-amber-200">›</span>
          <span className="text-amber-300 font-light">Shipping</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* Left */}
          <div>

            {/* Contact */}
            <div className={`${tokens.card} mb-5`}>
              <h2 className={`${tokens.sectionTitle} mb-5`}>Contact information</h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* First name */}
                <div className="flex flex-col gap-1">
                  <label className={`${tokens.label} ${errors.firstName ? 'text-red-400' : ''}`}>
                    First name {errors.firstName && <span className="text-red-400 normal-case tracking-normal">— required</span>}
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Walid"
                    className={errors.firstName ? tokens.inputError : tokens.input}
                  />
                </div>

                {/* Last name */}
                <div className="flex flex-col gap-1">
                  <label className={`${tokens.label} ${errors.lastName ? 'text-red-400' : ''}`}>
                    Last name {errors.lastName && <span className="text-red-400 normal-case tracking-normal">— required</span>}
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Smith"
                    className={errors.lastName ? tokens.inputError : tokens.input}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 mb-3">
                  <label className={`${tokens.label} ${errors.email ? 'text-red-400' : ''}`}>
                    Email {errors.email && <span className="text-red-400 normal-case tracking-normal">— required</span>}
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    type="email"
                    placeholder="walid@email.com"
                    className={errors.email ? tokens.inputError : tokens.input}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className={`${tokens.label} ${errors.phone ? 'text-red-400' : ''}`}>
                    Phone {errors.phone && <span className="text-red-400 normal-case tracking-normal">— required</span>}
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    type="tel"
                    placeholder="+961 xx xxx xxx"
                    className={errors.phone ? tokens.inputError : tokens.input}
                  />
                </div>

                {/* Street address */}
                <div className="flex flex-col gap-1 mb-3">
                  <label className={`${tokens.label} ${errors.address ? 'text-red-400' : ''}`}>
                    Street address {errors.address && <span className="text-red-400 normal-case tracking-normal">— required</span>}
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="123 Hamra Street"
                    className={errors.address ? tokens.inputError : tokens.input}
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1">
                  <label className={`${tokens.label} ${errors.city ? 'text-red-400' : ''}`}>
                    City {errors.city && <span className="text-red-400 normal-case tracking-normal">— required</span>}
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Beirut"
                    className={errors.city ? tokens.inputError : tokens.input}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={tokens.label}>District</label>
                  <select name="district" value={form.district} onChange={handleFormChange} className={tokens.select}>
                    <option>Beirut</option>
                    <option>Mount Lebanon</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className={tokens.label}>Delivery notes (optional)</label>
                <input name="notes" value={form.notes} onChange={handleFormChange} type="text" placeholder="Floor, building color, landmark..." className={tokens.input} />
              </div>
            </div>

            {/* Payment */}
            <div className={`${tokens.card} mb-5`}>
              <h2 className={`${tokens.sectionTitle} mb-1`}>Payment method</h2>
              {errors.paymentMethod && (
                <p className="text-[11px] text-red-400 mb-3">— Please select a payment method</p>
              )}
              <div className="flex flex-col gap-3 mt-4">

                {/* Whish Money */}
                <div
                  onClick={() => {
                    setPaymentMethod('whish');
                    setErrors({ ...errors, paymentMethod: false });
                  }}
                  className={`flex items-center gap-4 border-[1.5px] rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${paymentMethod === 'whish' ? 'border-amber-800 bg-amber-50' : errors.paymentMethod ? 'border-red-200 bg-red-50' : 'border-amber-100 hover:border-amber-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 ${paymentMethod === 'whish' ? 'border-amber-800' : 'border-amber-300'}`}>
                    {paymentMethod === 'whish' && <div className="w-2 h-2 rounded-full bg-amber-800" />}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-red-100">
                      <img src={whishlogo} alt="Whish Money" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <div>
                      <p className={`${tokens.muted} font-medium`}>Whish Money</p>
                      <p className={`${tokens.hint}`}>Pay instantly via Whish app</p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => {
                    setPaymentMethod('cod');
                    setErrors({ ...errors, paymentMethod: false });
                  }}
                  className={`flex items-center gap-4 border-[1.5px] rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50' : errors.paymentMethod ? 'border-red-200 bg-red-50' : 'border-amber-100 hover:border-amber-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cod' ? 'border-amber-800' : 'border-amber-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-amber-800" />}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-lg">💵</div>
                    <div>
                      <p className={`${tokens.muted} font-medium`}>Cash on Delivery</p>
                      <p className={`${tokens.hint}`}>Pay in cash when your order arrives</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Whish instructions */}
              {paymentMethod === 'whish' && (
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <p className={`${tokens.hint} text-amber-600`}>
                    📱 After placing your order, you'll receive a Whish payment request on your registered number. Please complete the payment within 5 minutes.
                  </p>
                </div>
              )}

              {/* COD note */}
              {paymentMethod === 'cod' && (
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <p className={`${tokens.hint} text-amber-600`}>
                    🚗 Please have the exact amount ready. Our delivery person does not always carry change.
                  </p>
                </div>
              )}
            </div>

            {/* Charity */}
            <div className={tokens.card}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-lg">🤍</div>
                <h2 className={tokens.sectionTitle}>Give a little, change a lot</h2>
              </div>
              <p className={`${tokens.muted} text-xs font-light leading-relaxed mb-4`}>
                Add a small donation to your order. 100% goes to feeding families in need across Beirut — no fees, no overhead.
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                {[1, 2, 5, 10].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleCharity(amt)}
                    className={`text-xs font-medium px-4 py-1.5 rounded-full border-[1.5px] transition-all duration-200 ${charity === amt ? 'bg-amber-800 text-amber-50 border-amber-800' : 'bg-transparent text-amber-800 border-amber-200 hover:border-amber-400'}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-800 font-medium text-sm">$</span>
                <input
                  type="number"
                  value={customCharity}
                  onChange={handleCustomCharity}
                  min="0"
                  placeholder="0.00"
                  className={`w-28 ${tokens.input}`}
                />
              </div>
              <p className={`${tokens.hint} mt-2`}>You can also enter a custom amount above.</p>
            </div>

          </div>

          {/* Right — Order Summary */}
          <div className={`${tokens.card} lg:sticky lg:top-20`}>
            <h2 className={`${tokens.sectionTitle} mb-5`}>Order summary</h2>

            {/* Items */}
            <div className="mb-5">
              {cart.map((item) => (
                <div key={item.name} className="flex justify-between items-center py-2 border-b border-amber-50 last:border-none">
                  <div>
                    <p className={tokens.muted}>{item.name}</p>
                    <p className={tokens.hint}>× {item.quantity}</p>
                  </div>
                  <p className={tokens.price}>
                    ${(item.quantity * parseFloat(item.price.replace('$', ''))).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="flex gap-2 mb-1">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className={`flex-1 ${tokens.input} rounded-full text-xs`}
              />
              <button onClick={handlePromo} className={tokens.btnSecondary}>
                Apply
              </button>
            </div>
            {promoError && <p className="text-[11px] text-red-400 mb-3">{promoError}</p>}
            {promoApplied && <p className="text-[11px] text-green-600 mb-3">✓ {promoApplied} applied — {promoDiscount * 100}% off!</p>}

            {/* Totals */}
            <div className={`space-y-2 ${tokens.muted} mt-4`}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({promoDiscount * 100}%)</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (11%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {charity > 0 && (
                <div className="flex justify-between text-amber-800">
                  <span>🤍 Charity</span>
                  <span>${charity.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-amber-100 pt-3 mt-2">
                <span className="text-base font-medium text-amber-950">Total</span>
                <span className={tokens.totalPrice}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button id="place-order-btn"
              onClick={() => {
                const { newErrors, popupMessage } = validate();
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  if (popupMessage) setValidationPopup(popupMessage);
                  return;
                }
                setOrderPlaced(true);
                clearCart();
              }}
              className={`${tokens.btnPrimary} mt-6`}
            >
              Place order →
            </button>

            <Link
              to="/menu"
              className={`block text-center ${tokens.hint} hover:text-amber-600 underline mt-4 transition-all duration-200`}
            >
              ← Back to cart
            </Link>
          </div>

        </div>

      </div>
      {/* Validation Error Popup */}
      {validationPopup && (
        <div className="fixed inset-0 bg-amber-950/60 flex items-center justify-center z-50 px-6">
          <div className={`${tokens.card} max-w-sm w-full text-center`}>
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className={`${tokens.sectionTitle} mb-2 text-red-600`}>Invalid Information</h2>
            <p className={`${tokens.muted} font-light mb-6`}>
              {validationPopup}
            </p>
            <button
              onClick={() => setValidationPopup('')}
              className="w-full bg-red-500 text-white font-medium py-3 rounded-full hover:bg-red-600 transition-all duration-200 text-sm"
            >
              Fix it →
            </button>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="fixed inset-0 bg-amber-950/60 flex items-center justify-center z-50 px-6">
          <div className={`${tokens.card} max-w-sm w-full text-center`}>
            <div className="text-5xl mb-4">☕</div>
            <h2 className={`${tokens.sectionTitle} mb-2`}>Order placed!</h2>
            <p className={`${tokens.muted} font-light mb-4`}>
              Thank you for your order. We're preparing your items and will deliver them shortly!
            </p>

            {/* Whish specific message */}
            {paymentMethod === 'whish' && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <img src={whishlogo} alt="Whish" className="w-5 h-5 object-contain" />
                  <p className="text-sm font-medium text-red-600">Whish Payment</p>
                </div>
                <p className="text-xs text-red-500 font-light leading-relaxed">
                  You will receive a Whish payment request on your number. Please complete it within 5 minutes to confirm your order.
                </p>
              </div>
            )}

            <Link
              to="/"
              onClick={() => setOrderPlaced(false)}
              className={tokens.btnPrimary}
              style={{ display: 'block' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}


    </main>
  );
}

export default Checkout;