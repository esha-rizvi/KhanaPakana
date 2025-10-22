import React, { useState, useMemo } from 'react';
import { getRecipesFromIngredients } from '../services/aiService';
import { AISuggestedRecipe } from '../types';
import Loader from '../components/Loader';

const AIChefPage: React.FC = () => {
    const [ingredients, setIngredients] = useState('');
    const [suggestions, setSuggestions] = useState<AISuggestedRecipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const userIngredientsSet = useMemo(() => {
        return new Set(ingredients.toLowerCase().split(',').map(i => i.trim()).filter(Boolean));
    }, [ingredients]);

    const handleGenerateRecipes = async () => {
        if (!ingredients.trim()) {
            setError("Please enter the ingredients you have.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuggestions([]);
        try {
            const results = await getRecipesFromIngredients(ingredients);
            setSuggestions(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const hasIngredient = (ingredientName: string): boolean => {
        const lowerIngredientName = ingredientName.toLowerCase();
        for (const userIng of userIngredientsSet) {
            if (lowerIngredientName.includes(userIng)) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-stone-700">AI Chef</h1>
                <p className="mt-4 text-lg text-stone-500">
                    Don't know what to cook? Enter the ingredients you have, and our AI will suggest authentic Pakistani recipes for you!
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col gap-4">
                    <label htmlFor="ingredients" className="block text-lg font-medium text-stone-600">Your Ingredients</label>
                    <textarea
                        id="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="e.g., chicken, onion, tomatoes, yogurt, ginger garlic paste..."
                        rows={4}
                        className="w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                    />
                    <button
                        onClick={handleGenerateRecipes}
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-400 hover:bg-amber-500 transition-colors duration-300 disabled:bg-stone-300"
                    >
                        {loading ? 'Thinking...' : 'Generate Recipes'}
                    </button>
                </div>
            </div>

            {loading && <Loader />}
            
            {error && <p className="text-center text-red-500 mt-8">{error}</p>}
            
            {suggestions.length > 0 && (
                <div className="mt-12 space-y-8">
                    <h2 className="text-3xl font-bold text-center text-stone-700">Here are your suggestions!</h2>
                    {suggestions.map((recipe, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-lg animate-fade-in">
                            <h3 className="text-2xl font-bold text-stone-800 mb-2">{recipe.recipeName}</h3>
                            <p className="text-stone-600 italic mb-4">{recipe.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xl font-semibold text-stone-700 mb-3">Ingredients</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {recipe.ingredients.map((ing, i) => (
                                            <li key={i} className={`text-stone-600 ${hasIngredient(ing.name) ? 'font-bold text-green-600' : ''}`}>
                                                {ing.amount} {ing.name}
                                                {hasIngredient(ing.name) && <span className="text-xs ml-2">(You have this)</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-stone-700 mb-3">Instructions</h4>
                                    <ol className="list-decimal list-inside space-y-2 text-stone-600">
                                        {recipe.instructions.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
             <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AIChefPage;
