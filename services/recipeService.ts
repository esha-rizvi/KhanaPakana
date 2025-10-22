import { Meal, Category, MealSummary } from '../types';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const ALLOWED_AREAS = ['Pakistani'];
const FORBIDDEN_STRINGS = ['pork', 'wine', 'alcohol', 'beer', 'lard', 'ham', 'bacon'];

const isAllowedRecipe = (meal: Meal): boolean => {
    if (!meal) return false;
    if (meal.strArea && !ALLOWED_AREAS.includes(meal.strArea)) {
        return false;
    }

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof Meal] as string | null;
        if (ingredient && FORBIDDEN_STRINGS.some(keyword => ingredient.toLowerCase().includes(keyword))) {
            return false;
        }
    }
    
    if (meal.strInstructions && FORBIDDEN_STRINGS.some(keyword => meal.strInstructions.toLowerCase().includes(keyword))) {
        return false;
    }

    return true;
}

async function fetcher<T,>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export const searchRecipes = async (query: string): Promise<Meal[]> => {
  const data = await fetcher<{ meals: Meal[] }>(`search.php?s=${query}`);
  return (data.meals || []).filter(isAllowedRecipe);
};

export const getRecipeById = async (id: string): Promise<Meal | null> => {
  const data = await fetcher<{ meals: Meal[] }>(`lookup.php?i=${id}`);
  if (!data.meals || !data.meals[0]) return null;
  const meal = data.meals[0];
  return isAllowedRecipe(meal) ? meal : null;
};

export const getRandomRecipe = async (): Promise<Meal> => {
    for (let i = 0; i < 20; i++) { // Try 20 times
        const { meals } = await fetcher<{ meals: Meal[] }>('random.php');
        if (meals && meals[0] && isAllowedRecipe(meals[0])) {
            return meals[0];
        }
    }
    // Fallback: search for a common halal Pakistani ingredient.
    const fallbackRecipes = await searchRecipes('karahi');
    if (fallbackRecipes.length > 0) return fallbackRecipes[0];
    
    const chickenRecipes = await searchRecipes('chicken');
    if (chickenRecipes.length > 0) return chickenRecipes[0];
    
    throw new Error('Could not find a suitable random recipe.');
};


export const getAllCategories = async (): Promise<Category[]> => {
    const data = await fetcher<{ categories: Category[] }>('categories.php');
    return (data.categories || []).filter(c => c.strCategory !== 'Pork');
};

export const getRecipesByCategory = async (category: string): Promise<Meal[]> => {
    if (category === 'Pork') return [];
    const { meals: summaryMeals } = await fetcher<{ meals: MealSummary[] }>(`filter.php?c=${category}`);
    if (!summaryMeals) return [];
    
    const mealDetailPromises = summaryMeals.map(summary => getRecipeById(summary.idMeal));
    const fullMeals = await Promise.all(mealDetailPromises);
    
    return fullMeals.filter((meal): meal is Meal => meal !== null && meal.strArea === 'Pakistani');
};

export const getRecipesByArea = async (area: string): Promise<Meal[]> => {
    if (!ALLOWED_AREAS.includes(area)) return [];

    const { meals: summaryMeals } = await fetcher<{ meals: MealSummary[] }>(`filter.php?a=${area}`);
    if (!summaryMeals) return [];

    const mealDetailPromises = summaryMeals.map(summary => getRecipeById(summary.idMeal));
    const fullMeals = await Promise.all(mealDetailPromises);

    return fullMeals.filter((meal): meal is Meal => meal !== null);
};

export const getFeaturedPakistaniRecipe = async (): Promise<Meal | null> => {
    try {
        const pakistaniRecipes = await getRecipesByArea('Pakistani');
        if (pakistaniRecipes.length > 0) {
            const randomIndex = Math.floor(Math.random() * pakistaniRecipes.length);
            return pakistaniRecipes[randomIndex];
        }
        return null;
    } catch (error) {
        console.error("Could not fetch a featured Pakistani recipe", error);
        return null;
    }
}