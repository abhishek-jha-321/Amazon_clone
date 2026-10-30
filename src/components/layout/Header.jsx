import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, ChevronDown, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { SEARCH_CATEGORIES } from '../../data/mockProducts';

export const Header = () => {
  const { cartCount } = useCart();
  const {
    openSideDrawer,
    openCartDrawer,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useUI();

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('India');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchSection = document.getElementById('products-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#131921] text-white select-none">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-3 py-1.5 gap-2 lg:gap-4 h-[60px]">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={openSideDrawer}
              aria-label="Open navigation menu"
              className="md:hidden p-1.5 hover:border hover:border-white rounded text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a
              href="#"
              className="flex items-center p-1.5 border border-transparent hover:border-white rounded transition-all duration-150"
            >
              <img
                src="/amazon-logo.png"
                alt="Amazon"
                className="h-[28px] md:h-[32px] object-contain pt-1 brightness-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://pngimg.com/uploads/amazon/amazon_PNG25.png";
                }}
              />
              <span className="text-[11px] text-gray-300 font-medium -ml-1 mt-1 hidden sm:inline">.clone</span>
            </a>
          </div>

          {/* Deliver To (Desktop) */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="hidden md:flex items-center gap-1 p-1.5 border border-transparent hover:border-white rounded text-left transition-all duration-150 group"
          >
            <MapPin className="w-4 h-4 text-white group-hover:text-amazon-yellow mt-3" />
            <div className="flex flex-col leading-tight">
              <span className="text-[12px] text-gray-300">Deliver to</span>
              <span className="text-[14px] font-bold text-white flex items-center gap-0.5">
                {deliveryLocation}
              </span>
            </div>
          </button>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-3xl flex items-center h-[40px] rounded-md focus-within:ring-3 focus-within:ring-[#f90] transition-all bg-white"
          >
            <div className="relative hidden sm:block h-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2.5 rounded-l-md border-r border-gray-300 outline-none cursor-pointer pr-6 appearance-none font-medium"
              >
                {SEARCH_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon"
              className="flex-1 h-full px-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 rounded-l-md sm:rounded-l-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-700 px-1.5"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              aria-label="Search"
              className="h-full px-4 bg-[#febd69] hover:bg-[#f3a847] text-gray-900 rounded-r-md flex items-center justify-center transition-colors duration-150"
            >
              <Search className="w-5 h-5 text-gray-800 stroke-[2.5]" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Language Selector (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 p-1.5 border border-transparent hover:border-white rounded cursor-pointer text-xs font-bold leading-tight">
              <span className="text-base">🇺🇸</span>
              <span className="text-[13px] font-bold">EN</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            {/* Account & Lists */}
            <div
              className="relative"
              onMouseEnter={() => setIsAccountDropdownOpen(true)}
              onMouseLeave={() => setIsAccountDropdownOpen(false)}
            >
              <div
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex flex-col p-1.5 border border-transparent hover:border-white rounded cursor-pointer transition-all leading-tight"
              >
                <span className="text-[12px] text-gray-300">Hello, sign in</span>
                <span className="text-[14px] font-bold text-white flex items-center gap-0.5">
                  Account & Lists
                  <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:inline" />
                </span>
              </div>

              {/* Account Dropdown */}
              {isAccountDropdownOpen && (
                <div className="absolute right-0 top-full mt-0 w-72 bg-white text-gray-900 rounded-md shadow-2xl p-4 border border-gray-200 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-center pb-3 border-b border-gray-200">
                    <button className="w-full bg-[#f7ca00] hover:bg-[#f0b800] py-1.5 rounded-lg font-medium text-sm text-gray-900 shadow-sm border border-[#a88734]">
                      Sign in
                    </button>
                    <p className="mt-2 text-[11px] text-gray-600">
                      New customer?{' '}
                      <span className="text-amazon-link hover:text-amazon-linkHover hover:underline cursor-pointer">
                        Start here.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-2">Your Lists</h4>
                      <ul className="space-y-1.5 text-gray-600">
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Create a List</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Find a List or Registry</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">AmazonSmile Charity</li>
                      </ul>
                    </div>
                    <div className="border-l border-gray-200 pl-3">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">Your Account</h4>
                      <ul className="space-y-1.5 text-gray-600">
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Account</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Orders</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Recommendations</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Browsing History</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Watchlist</li>
                        <li className="hover:text-amazon-orange hover:underline cursor-pointer">Kindle Unlimited</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Returns & Orders */}
            <div className="hidden sm:flex flex-col p-1.5 border border-transparent hover:border-white rounded cursor-pointer leading-tight transition-all">
              <span className="text-[12px] text-gray-300">Returns</span>
              <span className="text-[14px] font-bold text-white">& Orders</span>
            </div>

            {/* Shopping Cart */}
            <button
              onClick={openCartDrawer}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="flex items-center gap-1 p-1.5 border border-transparent hover:border-white rounded cursor-pointer transition-all relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-8 h-8 text-white group-hover:scale-105 transition-transform" />
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#131921] text-amazon-yellow text-xs font-bold px-1 rounded-full">
                  {cartCount}
                </span>
              </div>
              <span className="text-[14px] font-bold text-white hidden md:inline mt-2">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Deliver-to banner */}
        <div className="md:hidden bg-[#232f3e] px-3 py-1 flex items-center gap-2 text-xs text-gray-200 border-t border-[#37475a]">
          <MapPin className="w-3.5 h-3.5 text-white" />
          <span>Deliver to {deliveryLocation} - Updated</span>
        </div>
      </header>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 text-gray-900 relative">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg mb-2">Choose your location</h3>
            <p className="text-xs text-gray-600 mb-4">
              Delivery options and speeds may vary for different locations.
            </p>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-700">Enter a country or region:</label>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#f90]"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="Australia">Australia</option>
              </select>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-full bg-[#f7ca00] hover:bg-[#f0b800] py-2 rounded-md font-semibold text-sm shadow-sm border border-[#a88734] mt-2"
              >
                Apply Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

