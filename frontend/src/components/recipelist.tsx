import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, deleteRecipe } from '../api/receipe.api';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Recipe, RecipeResponse, RecipesResponse } from '../types/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/recipelist.css';
import { Modal, Button } from 'react-bootstrap'

const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [recipesPerPage] = useState<number>(10); 
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: RecipesResponse = await getRecipes(currentPage, recipesPerPage); // Pass pagination parameters
                setRecipes(response.data.recipes);
                setTotalPages(response.data.pagination.totalPages); // Set total pages from the response
                toast.success(response.message);
            } catch (error) {
                const err = error as any;
                console.log("Error: ", err?.response?.data?.message);
                const errMsg = err?.response?.data?.message || "Unable to fetch recipes";
                toast.error(errMsg);
            }
        };
        fetchData();
    }, [currentPage]); // Run fetchData when currentPage changes

    const openDeleteModal = (id: string) => {
        setSelectedRecipeId(id);
        setShowModal(true);
    };

    const closeDeleteModal = () => {
        setShowModal(false);
        setSelectedRecipeId(null);
    };

    const handleDelete = async () => {
        if (selectedRecipeId) {
            try {
                const response: RecipeResponse = await deleteRecipe(selectedRecipeId);
                setRecipes(recipes.filter(recipe => recipe._id !== selectedRecipeId));
                toast.success(response.message);
            } catch (error) {
                toast.error('Failed to delete recipe.');
            } finally {
                closeDeleteModal();
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Recipes</h2>
            <Link to="/create" className="btn btn-primary mb-3">Add Recipe</Link>
            <div className="card shadow-sm">
                <div className="card-body">
                    <table className="table table-borderless table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Instructions</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map(recipe => (
                                <tr key={recipe._id}>
                                    <td>
                                        {recipe.imageUrl ? (
                                            <img
                                                src={recipe.imageUrl}
                                                alt={recipe.title}
                                                className="img-thumbnail"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{recipe.title}</td>
                                    <td className="text-truncate" style={{ maxWidth: '200px' }}>{recipe.instructions}</td>
                                    <td>
                                        <Link to={`/recipe/${recipe._id}`} className="btn btn-info btn-sm me-2">View</Link>
                                        <Link to={`/edit/${recipe._id}`} className="btn btn-warning btn-sm me-2">
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => openDeleteModal(recipe._id)} className="btn btn-danger btn-sm">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Implementation */}
            <div className="d-flex justify-content-end mt-3">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary me-2"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary ms-2"
                >
                    Next
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default RecipeList;
