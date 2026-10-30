import React from 'react';
import { Check } from 'lucide-react';

export const PrimeBadge = ({ size = 'sm' }) => {
  return (
    <span className="inline-flex items-center select-none font-bold italic tracking-tight text-[#00a8e1] text-xs">
      <Check className="w-3.5 h-3.5 text-[#ff9900] stroke-[3.5] -mr-0.5" />
      <span className="text-[#00a8e1] font-black">prime</span>
    </span>
  );
};

