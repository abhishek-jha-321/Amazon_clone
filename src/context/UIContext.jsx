import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Departments');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openSideDrawer = () => setIsSideDrawerOpen(true);
  const closeSideDrawer = () => setIsSideDrawerOpen(false);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const openQuickView = (product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);

  return (
    <UIContext.Provider
      value={{
        isSideDrawerOpen,
        openSideDrawer,
        closeSideDrawer,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        selectedProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toastMessage,
        showToast
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

