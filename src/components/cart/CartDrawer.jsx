import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { formatCurrency } from '../../utils/formatters';

export const CartDrawer = () => {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    freeShippingNeeded,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const { isCartDrawerOpen, closeCartDrawer } = useUI();

  // Disable background scroll when open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const progressPercentage = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Dark backdrop */}
      <div
        onClick={closeCartDrawer}
        className="fixed inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-white h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 bg-[#f0f2f2] border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amazon" />
            <h2 className="font-bold text-lg text-gray-900">
              Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            aria-label="Close cart"
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1.5">
            {isFreeShipping ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your order qualifies for FREE Shipping!</span>
              </>
            ) : (
              <span>
                Add <span className="font-bold text-emerald-900">{formatCurrency(freeShippingNeeded)}</span> of eligible items to get <span className="font-bold">FREE Shipping</span>.
              </span>
            )}
          </div>
          <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Your Amazon Cart is empty</h3>
              <p className="text-xs text-gray-500 mb-6">
                Your shopping cart is waiting. Give it purpose — fill it with electronics, books, and deals.
              </p>
              <button
                onClick={closeCartDrawer}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-xs font-bold py-2.5 px-6 rounded-full shadow-sm border border-[#fcd200]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="py-4 flex gap-3">
                {/* Product thumbnail */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain p-1 rounded border border-gray-200 bg-gray-50 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm font-bold text-[#0f1111] mt-1">
                      {formatCurrency(item.price)}
                    </p>
                    <span className="text-[11px] text-emerald-700 font-medium">In Stock</span>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 rounded-l-md transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 rounded-r-md transition-colors"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal ({cartCount} items):</span>
              <span className="font-bold text-lg text-gray-900">
                {formatCurrency(cartSubtotal)}
              </span>
            </div>

            <button
              onClick={() => {
                alert(`Order Simulation: Checkout initiated for ${formatCurrency(cartSubtotal)}. Thank you for testing the Amazon Clone!`);
              }}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-gray-900 font-medium py-2.5 rounded-full text-sm shadow-sm border border-[#fcd200] transition-colors"
            >
              Proceed to checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-amazon-link hover:text-amazon-linkHover hover:underline"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

