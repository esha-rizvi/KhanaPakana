
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import { Meal } from '../types';
import Loader from '../components/Loader';
import { useFavorites } from '../hooks/useFavorites';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMeal = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const mealData = await getRecipeById(id);
        setMeal(mealData);
      } catch (error) {
        console.error("Failed to fetch recipe details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };
  
  const isMealFavorite = id ? isFavorite(id) : false;

  const handleFavoriteClick = () => {
    if(!id) return;
    if(isMealFavorite) {
        removeFavorite(id);
    } else {
        addFavorite(id);
    }
  }

  if (loading) return <Loader />;
  if (!meal) return <p className="text-center mt-10">Recipe not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="md:order-2">
             <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:order-1">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">{meal.strMeal}</h1>
            <div className="flex items-center space-x-4 text-stone-500 mb-6">
                <span>{meal.strCategory}</span>
                <span>•</span>
                <span>{meal.strArea}</span>
            </div>
            
             <button onClick={handleFavoriteClick} className={`mb-6 w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${isMealFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-amber-400 text-white hover:bg-amber-500'}`}>
                <i className={`fa-heart ${isMealFavorite ? 'fas' : 'far'}`}></i>
                {isMealFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <h2 className="text-2xl font-semibold text-stone-700 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-stone-600 mb-6">
              {getIngredients().map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-8 border-t border-stone-200">
             <h2 className="text-2xl font-semibold text-stone-700 mb-4">Instructions</h2>
             <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{meal.strInstructions}</p>
             {meal.strYoutube && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-stone-700 mb-4">Video Tutorial</h2>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg shadow-lg"
                        ></iframe>
                    </div>
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
