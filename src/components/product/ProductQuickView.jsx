import React, { useState } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus } from 'lucide-react';
import { Rating } from '../common/Rating';
import { PrimeBadge } from '../common/PrimeBadge';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export const ProductQuickView = () => {
  const { selectedProduct, closeQuickView, showToast } = useUI();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, qty);
    showToast(`Added ${qty} × "${selectedProduct.title.slice(0, 24)}..." to cart`);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, qty);
    closeQuickView();
    alert(`Instant Checkout Simulation for ${qty} item(s): ${formatCurrency(selectedProduct.price * qty)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Image */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6 border border-gray-100">
            <div className="w-full max-w-[320px] aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Right: Product Details & Buying Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category / Brand */}
              {selectedProduct.category && (
                <span className="text-xs font-semibold text-amazon-link hover:underline uppercase tracking-wider block mb-1">
                  Visit the {selectedProduct.category} Store
                </span>
              )}

              {/* Title */}
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                {selectedProduct.title}
              </h1>

              {/* Rating */}
              <div className="mt-2 pb-3 border-b border-gray-200 flex items-center gap-3">
                <Rating
                  rating={selectedProduct.rating || 4.5}
                  reviewsCount={selectedProduct.reviewsCount || 1280}
                  size="md"
                />
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-amazon-link cursor-pointer hover:underline">
                  100+ answered questions
                </span>
              </div>

              {/* Price Block */}
              <div className="py-4 border-b border-gray-200">
                {selectedProduct.discount && (
                  <span className="inline-block bg-[#cc0c39] text-white text-xs font-bold px-2 py-0.5 rounded-sm mb-2">
                    {selectedProduct.discount} Deal
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-700">$</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {Math.floor(selectedProduct.price || 49)}
                  </span>
                  <span className="text-sm text-gray-700">
                    {((selectedProduct.price || 49) % 1).toFixed(2).substring(2)}
                  </span>

                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      List: {formatCurrency(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <PrimeBadge />
                  <span className="text-xs text-gray-600 font-medium">
                    FREE One-Day Delivery with Prime
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="py-3 text-xs text-gray-700 leading-relaxed space-y-2">
                <p>
                  {selectedProduct.description ||
                    'Premium quality product crafted with high-grade components for everyday reliability. Backed by Amazon customer satisfaction guarantee.'}
                </p>
                <div className="grid grid-cols-3 gap-2 py-2 text-center text-[11px] text-gray-600 bg-gray-50 rounded p-2">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-gray-700" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-gray-700" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-gray-700" />
                    <span>2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buying Box */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-700">In Stock</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Qty:</span>
                  <div className="flex items-center border border-gray-300 rounded bg-white">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-1 hover:bg-gray-100 text-gray-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 font-bold text-xs">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-1 hover:bg-gray-100 text-gray-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-gray-900 font-semibold py-2 px-4 rounded-full text-xs sm:text-sm shadow-sm border border-[#fcd200] transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e07b00] text-gray-900 font-semibold py-2 px-4 rounded-full text-xs sm:text-sm shadow-sm border border-[#ff8f00] transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

