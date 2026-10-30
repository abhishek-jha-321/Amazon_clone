import React from 'react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';

export const ProductCardQuad = ({ category }) => {
  const { openQuickView, showToast } = useUI();
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-5 flex flex-col justify-between shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow">
      <div>
        <h2 className="text-xl font-bold text-[#0f1111] mb-3 leading-snug">
          {category.title}
        </h2>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {category.items.map((item) => (
            <div
              key={item.id}
              onClick={() => openQuickView(item)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden rounded-sm flex items-center justify-center border border-gray-100 group-hover:border-amazon-yellow transition-all">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <span className="text-[12px] text-gray-800 font-medium mt-1 line-clamp-1 group-hover:text-amazon-orange">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs font-semibold text-amazon-link hover:text-amazon-linkHover hover:underline"
        >
          {category.linkText}
        </button>
      </div>
    </div>
  );
};

