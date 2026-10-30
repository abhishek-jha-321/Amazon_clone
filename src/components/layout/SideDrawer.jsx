import React, { useEffect } from 'react';
import { X, User, ChevronRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { SIDE_DRAWER_SECTIONS } from '../../data/navigationData';

export const SideDrawer = () => {
  const { isSideDrawerOpen, closeSideDrawer } = useUI();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isSideDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSideDrawerOpen]);

  if (!isSideDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
      {/* Dark backdrop */}
      <div
        onClick={closeSideDrawer}
        className="fixed inset-0 bg-black/75 transition-opacity backdrop-blur-[1px]"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-[365px] bg-white h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-800">
              <User className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Hello, sign in</span>
          </div>
        </div>

        {/* Scrollable sections */}
        <div className="flex-1 overflow-y-auto py-2 text-sm text-[#0f1111]">
          {SIDE_DRAWER_SECTIONS.map((section, idx) => (
            <div key={section.title} className="py-2 border-b border-gray-200 last:border-b-0">
              <h3 className="px-6 py-2 text-sm font-bold text-gray-900 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      closeSideDrawer();
                      const sectionEl = document.getElementById('products-section');
                      if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-between px-6 py-2.5 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors"
                  >
                    <span>{item}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Close button outside drawer */}
      <button
        onClick={closeSideDrawer}
        aria-label="Close menu"
        className="relative z-10 self-start m-3 p-2 text-white hover:text-amazon-yellow transition-colors"
      >
        <X className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
};

