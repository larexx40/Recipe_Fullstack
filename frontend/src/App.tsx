import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeForm from './components/recipeform';
import RecipeDetails from './components/recipedetails';
import RecipeList from './components/recipelist';

const App: React.FC = () => {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/create" element={<RecipeForm />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/edit/:id" element={<RecipeForm />} />
            </Routes>
        </Router>
    );
};

export default App;
