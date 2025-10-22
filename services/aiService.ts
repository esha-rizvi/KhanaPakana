import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestedRecipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        recipeName: {
          type: Type.STRING,
          description: "The name of the recipe."
        },
        description: {
          type: Type.STRING,
          description: "A short, appealing description of the dish."
        },
        ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              amount: { type: Type.STRING }
            },
            required: ['name', 'amount']
          },
          description: "A list of all ingredients required for the recipe with their amounts."
        },
        instructions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Step-by-step cooking instructions."
        }
      },
      required: ['recipeName', 'description', 'ingredients', 'instructions']
    }
};

export const getRecipesFromIngredients = async (ingredients: string): Promise<AISuggestedRecipe[]> => {
    if (!ingredients.trim()) {
        throw new Error("Ingredients cannot be empty.");
    }
    
    const prompt = `You are an expert Pakistani chef specializing in Halal cuisine. A user has the following ingredients: ${ingredients}. Suggest 3-4 simple and delicious Halal Pakistani recipes they can make. For each recipe, provide a name, a short description, a complete list of required ingredients with amounts, and step-by-step instructions. Ensure all recipes are authentically Pakistani and strictly Halal.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const suggestions = JSON.parse(jsonText) as AISuggestedRecipe[];
        return suggestions;

    } catch (error) {
        console.error("Error fetching AI recipe suggestions:", error);
        throw new Error("Could not get recipe suggestions from AI. Please try again.");
    }
};