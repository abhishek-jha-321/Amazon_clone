import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Plus } from 'lucide-react';
import { Rating } from '../common/Rating';
import { PrimeBadge } from '../common/PrimeBadge';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export const ProductSlider = ({ title, products, linkText = "See all deals" }) => {
  const sliderRef = useRef(null);
  const { addToCart } = useCart();
  const { openQuickView, showToast } = useUI();

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -450 : 450;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added "${product.title.slice(0, 28)}..." to cart`);
  };

  return (
    <div className="bg-white p-5 shadow-sm border border-gray-200 rounded-sm relative my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-4">
          <h2 className="text-xl font-bold text-[#0f1111]">{title}</h2>
          {linkText && (
            <a
              href="#deals"
              className="text-xs font-semibold text-amazon-link hover:text-amazon-linkHover hover:underline hidden sm:inline"
            >
              {linkText}
            </a>
          )}
        </div>
      </div>

      {/* Slider buttons */}
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-24 bg-white/90 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-md focus:outline-none"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-24 bg-white/90 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-md focus:outline-none"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Scrollable products row */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => openQuickView(product)}
              className="flex-shrink-0 w-[220px] bg-white border border-transparent hover:border-gray-200 rounded p-3 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group/card"
            >
              <div>
                {/* Image & Quick View trigger */}
                <div className="relative aspect-square w-full bg-gray-50 rounded flex items-center justify-center overflow-hidden mb-2.5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain p-2 group-hover/card:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow border border-gray-200 opacity-0 group-hover/card:opacity-100 transition-opacity"
                    title="Quick view"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Deal Tag */}
                {product.discount && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.discount}
                    </span>
                    <span className="text-[#cc0c39] text-[11px] font-bold">
                      Deal
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-gray-700 align-super font-normal">$</span>
                  <span className="text-xl font-bold text-[#0f1111]">
                    {Math.floor(product.price)}
                  </span>
                  <span className="text-xs text-gray-700 align-super font-normal">
                    {(product.price % 1).toFixed(2).substring(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through ml-1">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="mt-1">
                  <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
                </div>

                {/* Prime Badge */}
                {product.prime && (
                  <div className="mt-1">
                    <PrimeBadge />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xs text-gray-800 line-clamp-2 mt-2 leading-relaxed group-hover/card:text-amazon-orange">
                  {product.title}
                </h3>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-3 w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] rounded-full py-1.5 px-3 text-xs font-medium text-gray-900 shadow-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

