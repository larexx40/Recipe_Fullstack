export interface Recipe {
    _id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    imageUrl?: string; 
}

export interface ApiResponse<T> {
    success: boolean; 
    message: string; 
    data: T;         // Generic data field
}

export interface Pagination {
    page: number;
    perPage: number;
    totalPages: number;
    totalData: number;
}

export type RecipeResponse = ApiResponse<Recipe>; // Recipe response type
export type RecipesResponse = ApiResponse<{recipes: Recipe[], pagination: Pagination}>; // Multiple recipes response type
