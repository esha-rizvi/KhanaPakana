
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 text-stone-600 border-t border-stone-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-stone-500 hover:text-amber-500">
            <span className="sr-only">Facebook</span>
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="#" className="text-stone-500 hover:text-amber-500">
            <span className="sr-only">Instagram</span>
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="#" className="text-stone-500 hover:text-amber-500">
            <span className="sr-only">Twitter</span>
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-stone-500 hover:text-amber-500">
            <span className="sr-only">Pinterest</span>
            <i className="fab fa-pinterest text-2xl"></i>
          </a>
        </div>
        <p className="mt-8 text-center text-base text-stone-500">
          &copy; {new Date().getFullYear()} Khana Pakana. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
