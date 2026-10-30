import React, { useMemo } from 'react';
import { Header } from './components/layout/Header';
import { SubHeader } from './components/layout/SubHeader';
import { HeroBanner } from './components/home/HeroBanner';
import { ProductCardQuad } from './components/home/ProductCardQuad';
import { ProductCardSingle } from './components/home/ProductCardSingle';
import { ProductSlider } from './components/home/ProductSlider';
import { SideDrawer } from './components/layout/SideDrawer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickView } from './components/product/ProductQuickView';
import { Footer } from './components/layout/Footer';
import { QUAD_CATEGORIES, SINGLE_CARDS, SLIDER_PRODUCTS } from './data/mockProducts';
import { useUI } from './context/UIContext';
import { CheckCircle2, Search } from 'lucide-react';

export const App = () => {
  const { searchQuery, toastMessage, openQuickView } = useUI();

  // Search filtering logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return SLIDER_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const bestSellers = useMemo(() => {
    return [...SLIDER_PRODUCTS].reverse();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] text-[#0f1111]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131921] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-gray-700 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Layout */}
      <Header />
      <SubHeader />

      {/* Side and Slide-Over Drawers */}
      <SideDrawer />
      <CartDrawer />
      <ProductQuickView />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If user searched something, show search results section */}
        {searchResults ? (
          <div className="max-w-[1500px] mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Search className="w-4 h-4 text-gray-500" />
                <span>
                  Showing results for <span className="font-bold text-[#c45500]">"{searchQuery}"</span>
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'} matching your query.
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white p-12 text-center rounded shadow-sm border border-gray-200">
                <p className="text-base font-bold text-gray-800 mb-2">No matching items found</p>
                <p className="text-xs text-gray-500">Try checking your spelling or use more general keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => openQuickView(product)}
                    className="bg-white p-4 rounded border border-gray-200 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square bg-gray-50 rounded flex items-center justify-center p-2 mb-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mt-1">
                        {product.title}
                      </h3>
                      <div className="mt-2 text-lg font-bold text-[#0f1111]">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="mt-4 w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-xs font-semibold py-2 rounded-full border border-[#fcd200]"
                    >
                      View Options
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Hero Carousel */}
            <HeroBanner />

            {/* Product Cards Grid - Layered directly on top of Hero Gradient */}
            <div
              id="products-section"
              className="max-w-[1500px] mx-auto px-4 relative z-30 -mt-16 sm:-mt-28 md:-mt-48 lg:-mt-64 space-y-6"
            >
              {/* Row 1: 4 Cards (Mix of Quad & Single Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <ProductCardQuad category={QUAD_CATEGORIES[0]} />
                <ProductCardQuad category={QUAD_CATEGORIES[1]} />
                <ProductCardSingle card={SINGLE_CARDS[0]} />
                <ProductCardQuad category={QUAD_CATEGORIES[2]} />
              </div>

              {/* Horizontal Slider: Today's Deals */}
              <div id="deals">
                <ProductSlider
                  title="Today's Deals"
                  products={SLIDER_PRODUCTS}
                  linkText="See all deals"
                />
              </div>

              {/* Row 2: 4 More Distinct Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <ProductCardSingle card={SINGLE_CARDS[1]} />
                <ProductCardQuad category={QUAD_CATEGORIES[3]} />
                <ProductCardSingle card={SINGLE_CARDS[2]} />
                <ProductCardSingle card={SINGLE_CARDS[3]} />
              </div>

              {/* Horizontal Slider: Best Sellers in Tech & Audio */}
              <div>
                <ProductSlider
                  title="Best Sellers in Tech & Audio"
                  products={bestSellers}
                  linkText="Explore the best seller list"
                />
              </div>

              {/* Sign in prompt banner for guests */}
              <div className="bg-white border border-gray-200 rounded p-8 text-center my-8 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  See personalized recommendations
                </h3>
                <button
                  onClick={() => alert('Authentication Demo: Sign-in dialog simulated.')}
                  className="bg-[#f7ca00] hover:bg-[#f0b800] border border-[#a88734] px-24 py-1.5 rounded-md text-xs font-bold text-gray-900 my-2 shadow-sm"
                >
                  Sign in
                </button>
                <p className="text-xs text-gray-600">
                  New customer?{' '}
                  <span className="text-amazon-link hover:text-amazon-linkHover hover:underline cursor-pointer">
                    Start here.
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Full Amazon Footer */}
      <Footer />
    </div>
  );
};

