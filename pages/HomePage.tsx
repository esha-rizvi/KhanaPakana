
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchRecipes, getAllCategories, getFeaturedPakistaniRecipe } from '../services/recipeService';
import { Meal, Category } from '../types';
import Loader from '../components/Loader';
import RecipeCard from '../components/RecipeCard';
import Hero from '../components/Hero';

const HomePage: React.FC = () => {
  const [popularDishes, setPopularDishes] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPakistani, setFeaturedPakistani] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        setLoading(true);
        
        const popularSearches = ['Biryani', 'Chicken Karahi', 'Qorma'];
        const dishPromises = popularSearches.map(term => searchRecipes(term).then(results => results[0]));
        const featuredPromise = getFeaturedPakistaniRecipe();
        const categoriesPromise = getAllCategories();

        const [fetchedDishes, featured, fetchedCategories] = await Promise.all([
             Promise.all(dishPromises),
             featuredPromise,
             categoriesPromise
        ]);
        
        setPopularDishes(fetchedDishes.filter(Boolean));
        setFeaturedPakistani(featured);
        setCategories(fetchedCategories.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch home page data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/recipes?category=${categoryName}`);
  };

  return (
    <div className="animate-fade-in">
       <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <section>
                <h2 className="text-3xl font-bold text-center text-stone-700 mb-8">Popular Dishes</h2>
                {loading ? <Loader /> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularDishes.map((meal) => (
                            <RecipeCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                )}
            </section>
            
            {featuredPakistani && (
                <section className="mt-16 bg-amber-50 rounded-2xl p-8">
                     <h2 className="text-3xl font-bold text-center text-stone-700 mb-8">Featured Pakistani Dish</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <img src={featuredPakistani.strMealThumb} alt={featuredPakistani.strMeal} className="rounded-xl shadow-lg w-full h-full object-cover"/>
                        <div>
                            <h3 className="text-2xl font-bold text-stone-800">{featuredPakistani.strMeal}</h3>
                            <p className="text-stone-500 mt-2">A flavorful and authentic dish from the heart of Pakistan. Perfect for any occasion.</p>
                            <p className="mt-4 text-stone-600 line-clamp-4">{featuredPakistani.strInstructions}</p>
                             <Link to={`/recipe/${featuredPakistani.idMeal}`} className="inline-block mt-6 bg-amber-400 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-amber-500 transition-colors duration-300">
                                View Full Recipe
                            </Link>
                        </div>
                     </div>
                </section>
            )}

            <section className="mt-16">
                <h2 className="text-3xl font-bold text-center text-stone-700 mb-8">Browse by Category</h2>
                {loading ? <Loader /> : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <div key={category.idCategory} onClick={() => handleCategoryClick(category.strCategory)} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                                <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-300"/>
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-white text-xl font-semibold text-center p-2">{category.strCategory}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
        <style>{`
            @keyframes fade-in {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-in-out;
            }
        `}</style>
    </div>
  );
};

export default HomePage;