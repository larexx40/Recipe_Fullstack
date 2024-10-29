import axios from 'axios';
import { RecipesResponse, RecipeResponse, ApiResponse, Recipe } from '../types/index';

const API_BASE_URL = 'http://localhost:5000/api/recipes/';

export const getRecipes = async (currentPage: number, perPage: number): Promise<RecipesResponse> => {
    const response = await axios.get<RecipesResponse>(`${API_BASE_URL}?page=${currentPage}&limit=${perPage}`);
    return response.data;
};

export const deleteRecipe = async (id: string): Promise<RecipeResponse> => {
    const response = await axios.delete<RecipeResponse>(`${API_BASE_URL}${id}`);
    return response.data;
};

// Fetch a single recipe by ID
export const getRecipeById = async (id: string): Promise<ApiResponse<Recipe>>  =>{
    const response = await axios.get(`${API_BASE_URL}${id}`)
    return response.data

}

// Add a new recipe
export const createRecipe = async (data: FormData) => {
    const response = await axios.post(API_BASE_URL, data)
    return response.data;
};

// Update a recipe by ID
export const updateRecipe = async (id: string, data: FormData) => {
    const response = await axios.patch(`${API_BASE_URL}${id}`, data);
    return response.data;
};
