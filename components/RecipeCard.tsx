
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface RecipeCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const rating = (parseInt(meal.idMeal) % 5) + 1; // pseudo-random rating
  
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl">
      <Link to={`/recipe/${meal.idMeal}`} className="block">
        <div className="relative">
            <img className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" src={meal.strMealThumb} alt={meal.strMeal} />
             <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors duration-300"></div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-stone-700 truncate group-hover:text-amber-500 transition-colors duration-300">{meal.strMeal}</h3>
           <div className="mt-2">
                <StarRating rating={rating > 5 ? 5 : rating} />
            </div>
          <p className="text-stone-500 text-sm mt-3">A delicious and easy to make dish that you will love.</p>
          <div className="mt-4 text-center">
             <span className="inline-block bg-amber-400 text-white text-sm font-semibold px-6 py-2 rounded-full group-hover:bg-amber-500 transition-colors duration-300">View Details</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
