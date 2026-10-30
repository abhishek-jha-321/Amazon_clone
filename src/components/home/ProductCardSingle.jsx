import React from 'react';
import { useUI } from '../../context/UIContext';

export const ProductCardSingle = ({ card }) => {
  const { openQuickView } = useUI();

  const handleCardClick = () => {
    openQuickView({
      id: card.id,
      title: card.title,
      price: 199.99,
      originalPrice: 249.99,
      discount: "20% off",
      rating: 4.8,
      reviewsCount: 3820,
      image: card.image,
      description: card.subtitle,
      prime: true,
      inStock: true
    });
  };

  return (
    <div className="bg-white p-5 flex flex-col justify-between shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-xl font-bold text-[#0f1111] leading-snug">
            {card.title}
          </h2>
        </div>

        {card.badge && (
          <span className="inline-block bg-[#cc0c39] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm mb-2">
            {card.badge}
          </span>
        )}

        <div
          onClick={handleCardClick}
          className="aspect-square w-full bg-gray-50 overflow-hidden rounded-sm cursor-pointer group my-2 border border-gray-100"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>

        {card.subtitle && (
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">
            {card.subtitle}
          </p>
        )}
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={handleCardClick}
          className="text-xs font-semibold text-amazon-link hover:text-amazon-linkHover hover:underline text-left"
        >
          {card.linkText}
        </button>
      </div>
    </div>
  );
};

