import React from 'react';
import { Menu } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { SUBNAV_LINKS } from '../../data/navigationData';

export const SubHeader = () => {
  const { openSideDrawer } = useUI();

  return (
    <nav className="bg-[#232f3e] text-white text-[14px] flex items-center justify-between px-3 h-[39px] select-none border-b border-[#37475a] overflow-x-auto no-scrollbar">
      {/* Left Links */}
      <div className="flex items-center space-x-1 shrink-0">
        {/* All Hamburger Menu */}
        <button
          onClick={openSideDrawer}
          className="flex items-center gap-1.5 px-2 py-1 border border-transparent hover:border-white rounded font-bold cursor-pointer transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
          <span>All</span>
        </button>

        {/* Quick Links */}
        <div className="flex items-center space-x-1">
          {SUBNAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-2 py-1 text-xs md:text-sm text-gray-100 hover:text-white border border-transparent hover:border-white rounded transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right Electronics Promotion */}
      <div className="hidden xl:flex items-center">
        <a
          href="#deals"
          className="px-2 py-1 border border-transparent hover:border-white rounded text-xs lg:text-sm font-bold text-gray-200 hover:text-white transition-colors whitespace-nowrap"
        >
          Shop Deals on Electronics
        </a>
      </div>
    </nav>
  );
};

