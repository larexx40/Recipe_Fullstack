import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RecipeResponse } from '../types/index';
import { createRecipe, getRecipeById, updateRecipe } from '../api/receipe.api';
import { FaArrowLeft } from 'react-icons/fa';

const RecipeForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                try {
                    const response: RecipeResponse = await getRecipeById(id);
                    setTitle(response.data.title);
                    setIngredients(response.data.ingredients);
                    setInstructions(response.data.instructions || '');
                } catch (error) {
                    const err = error as any;
                    console.log("Error: ", err?.response?.data?.message);
                    const errMsg = err?.response?.data?.message || "Unable to fetch recipe";
                    toast.error(errMsg);
                }
            };
            fetchRecipe();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        ingredients.forEach(ingredient => formData.append('ingredients', ingredient));
        formData.append('instructions', instructions);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (id) {
                // Update recipe
                const response: RecipeResponse = await updateRecipe(id, formData);
                toast.success(response.message);
            } else {
                // Create new recipe
                const response: RecipeResponse = await createRecipe(formData);
                toast.success(response.message);
            }
            navigate('/'); // Redirect to the recipe list after success
        } catch (error) {
            const err = error as any;
            console.log("Error: ", err?.response?.data?.message);
            const message = id ?  `Unable to update receipe` : `Unable to add receipe`
            const errMsg = err?.response?.data?.message || message;
            toast.error(errMsg);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
                <FaArrowLeft className="me-2" /> Back to Recipes
            </button>
            <h2 className="text-center">{id ? 'Edit Recipe' : 'Add Recipe'}</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="form-group mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            required
                        />
                    ))}
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddIngredient}>
                        Add Ingredient
                    </button>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Instructions</label>
                    <textarea
                        className="form-control"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg mt-3">{id ? 'Update Recipe' : 'Create Recipe'}</button>
            </form>
        </div>
    );
};

export default RecipeForm;
