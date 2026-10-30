import React from 'react';
import { Globe } from 'lucide-react';
import { FOOTER_COLUMNS, FOOTER_SUBSIDIARIES } from '../../data/navigationData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#232f3e] text-white mt-12 select-none">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-3.5 text-center text-xs font-semibold tracking-wide transition-colors"
      >
        Back to top
      </button>

      {/* Main 4-column links */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm text-white mb-3">{col.title}</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:underline hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Brand and Settings Bar */}
      <div className="border-t border-[#3a4553] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
          <a href="#" className="flex items-center">
            <img
              src="/amazon-logo.png"
              alt="Amazon"
              className="h-6 brightness-125 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://pngimg.com/uploads/amazon/amazon_PNG25.png";
              }}
            />
          </a>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500 hover:border-gray-300 rounded text-xs text-gray-200">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-500 hover:border-gray-300 rounded text-xs text-gray-200">
              <span>$ USD - U.S. Dollar</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500 hover:border-gray-300 rounded text-xs text-gray-200">
              <span>🇺🇸 United States</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Subsidiary Grid */}
      <div className="bg-[#131a22] py-8 px-6 text-[11px] text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6 mb-8">
          {FOOTER_SUBSIDIARIES.map((sub) => (
            <a
              key={sub.name}
              href="#"
              className="group block hover:underline"
            >
              <span className="font-bold text-gray-300 group-hover:underline block">
                {sub.name}
              </span>
              <span className="text-gray-500 text-[10px] block leading-tight">
                {sub.desc}
              </span>
            </a>
          ))}
        </div>

        {/* Copyright and Policies */}
        <div className="text-center space-y-2 border-t border-gray-800 pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-gray-300">
            <a href="#" className="hover:underline">Conditions of Use</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Consumer Health Data Privacy Disclosure</a>
            <a href="#" className="hover:underline">Your Ads Privacy Choices</a>
          </div>
          <p className="text-[11px] text-gray-400">
            © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates. (Enhanced Clone Demo Built with React & Tailwind CSS)
          </p>
        </div>
      </div>
    </footer>
  );
};

