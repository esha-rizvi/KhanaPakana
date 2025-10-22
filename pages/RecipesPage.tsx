import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { searchRecipes, getAllCategories, getRecipesByCategory } from '../services/recipeService';
import { Meal, Category } from '../types';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category');

  // Local state for the search input to enable debouncing
  const [inputValue, setInputValue] = useState(searchQuery);
  const searchSubjectRef = useRef(new Subject<string>());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Effect to handle debounced search input
  useEffect(() => {
    const subscription = searchSubjectRef.current.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(query => {
      const newParams = new URLSearchParams(searchParams);
      if (query) {
        newParams.set('q', query);
      } else {
        newParams.delete('q');
      }
      setSearchParams(newParams, { replace: true });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams, setSearchParams]);

  // Effect to fetch recipes when URL params change
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        let results: Meal[] = [];
        
        if (selectedCategory) {
            results = await getRecipesByCategory(selectedCategory);
        } else {
            // Use the debounced searchQuery from URL
            results = await searchRecipes(searchQuery || 'Pakistani');
        }

        if (searchQuery && selectedCategory) {
            results = results.filter(meal =>
              meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setRecipes(results);
        if (results.length === 0) {
          setError('No recipes found for this selection. Try a different search or filter.');
        }
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();

  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    searchSubjectRef.current.next(newQuery);
  };

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if(selectedCategory === category) {
        newParams.delete('category');
    } else {
        newParams.set('category', category);
    }
    setSearchParams(newParams, { replace: true });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-stone-700 mb-4">Explore Pakistani Recipes</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          value={inputValue} // Controlled by local state
          onChange={handleSearchChange}
          placeholder="Search for Biryani, Karahi..."
          className="w-full md:w-1/2 px-4 py-2 border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      
      <div className="mb-8 overflow-x-auto pb-4">
        <div className="flex justify-center flex-wrap gap-2">
            <h3 className="w-full text-center text-lg font-semibold text-stone-600 mb-2 mt-4">Filter by Category</h3>
            {categories.slice(0, 10).map(cat => (
                <button key={cat.idCategory} onClick={() => handleCategoryChange(cat.strCategory)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${selectedCategory === cat.strCategory ? 'bg-amber-400 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                    {cat.strCategory}
                </button>
            ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
