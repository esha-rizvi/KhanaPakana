
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'khanaPakanaFavorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage', error);
    }
  };

  const addFavorite = useCallback((mealId: string) => {
    if (!favorites.includes(mealId)) {
      saveFavorites([...favorites, mealId]);
    }
  }, [favorites]);

  const removeFavorite = useCallback((mealId: string) => {
    saveFavorites(favorites.filter((id) => id !== mealId));
  }, [favorites]);

  const isFavorite = useCallback((mealId: string) => {
    return favorites.includes(mealId);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
