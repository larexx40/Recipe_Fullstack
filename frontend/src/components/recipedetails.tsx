import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipe, RecipeResponse } from '../types/index';
import { getRecipeById } from '../api/receipe.api';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa'; // Import arrow icon

const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                try {
                    const response: RecipeResponse = await getRecipeById(id);
                    setRecipe(response.data); // This should now correctly match Recipe type
                } catch (error) {
                    const err = error as any;
                    console.log("Error: ", err?.response?.data?.message);
                    const errMsg = err?.response?.data?.message || "Unable to fetch recipe details";
                    toast.error(errMsg);
                    toast.error('Failed to fetch recipe details.');
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            } else {
                toast.error('Recipe ID is missing.');
                setLoading(false);
                navigate('/'); // Navigate back to the recipes list if ID is missing
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    // Loading state
    if (loading) {
        return (
            <div className="text-center">
                <h2>Loading...</h2>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    // If recipe is not found
    if (!recipe) {
        toast.error('Recipe not found.');
        navigate('/'); // Navigate back to the recipes list if recipe is not found
        return null;
    }

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
                <FaArrowLeft className="me-2" /> Back to Recipes
            </button>
            <h2 className="text-center mb-4">Recipe Details</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">{recipe.title}</h2>
                    {recipe.imageUrl && (
                        <img src={recipe.imageUrl} alt={recipe.title} className="img-fluid mb-3 rounded" />
                    )}
                    <h4 className="mt-3">Ingredients</h4>
                    <ul className="list-group mb-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="list-group-item">{ingredient}</li>
                        ))}
                    </ul>
                    <h4>Instructions</h4>
                    <p className="card-text">{recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
