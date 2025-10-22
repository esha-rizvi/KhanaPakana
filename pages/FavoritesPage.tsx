
import React, { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { getRecipeById } from '../services/recipeService';
import { Meal } from '../types';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      setLoading(true);
      try {
        const mealPromises = favorites.map(id => getRecipeById(id));
        const meals = await Promise.all(mealPromises);
        setFavoriteMeals(meals.filter((meal): meal is Meal => meal !== null));
      } catch (error) {
        console.error("Failed to fetch favorite meals", error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteMeals();
    } else {
      setFavoriteMeals([]);
      setLoading(false);
    }
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-stone-700 mb-8">Your Favorite Recipes</h1>
      {loading ? (
        <Loader />
      ) : favoriteMeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <i className="far fa-heart text-6xl text-stone-300 mb-4"></i>
            <p className="text-center text-stone-500 text-lg">You haven't added any favorites yet.</p>
            <p className="text-center text-stone-400 mt-2">Start exploring and save the recipes you love!</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
