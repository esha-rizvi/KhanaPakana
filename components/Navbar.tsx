
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkStyle = {
    color: '#A1887F',
    textDecoration: 'underline',
    textUnderlineOffset: '4px'
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-3xl font-bold text-amber-400" style={{fontFamily: "'Brush Script MT', cursive"}}>
              Khana Pakana
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className="text-stone-600 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Home</NavLink>
              <NavLink to="/recipes" className="text-stone-600 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Recipes</NavLink>
              <NavLink to="/ai-chef" className="text-stone-600 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => isActive ? activeLinkStyle : {}}>AI Chef</NavLink>
              <NavLink to="/favorites" className="text-stone-600 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Favorites</NavLink>
              <NavLink to="/contact" className="text-stone-600 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Contact</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-amber-400 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-300 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className="text-stone-600 hover:bg-amber-100 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/recipes" className="text-stone-600 hover:bg-amber-100 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Recipes</NavLink>
            <NavLink to="/ai-chef" className="text-stone-600 hover:bg-amber-100 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>AI Chef</NavLink>
            <NavLink to="/favorites" className="text-stone-600 hover:bg-amber-100 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Favorites</NavLink>
            <NavLink to="/contact" className="text-stone-600 hover:bg-amber-100 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;