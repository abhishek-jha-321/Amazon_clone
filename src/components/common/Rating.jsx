import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ rating = 0, reviewsCount, showReviews = true, size = 'sm' }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const starSize = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1 text-xs">
      <div className="flex items-center text-[#de7921]">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= roundedRating;
          const half = star - 0.5 === roundedRating;
          return (
            <span key={star} className="relative inline-block">
              <Star
                className={`${starSize} ${
                  filled
                    ? 'fill-[#de7921] text-[#de7921]'
                    : half
                    ? 'fill-[#de7921]/50 text-[#de7921]'
                    : 'text-gray-300'
                }`}
              />
            </span>
          );
        })}
      </div>
      {showReviews && reviewsCount !== undefined && (
        <span className="text-amazon-link hover:text-amazon-linkHover cursor-pointer font-medium text-xs ml-0.5">
          {Number(reviewsCount).toLocaleString()}
        </span>
      )}
    </div>
  );
};

