# Recipe Management App

A full-stack web application that allows users to manage a collection of recipes. This app enables users to create, view, update, and delete recipes, each containing a title, ingredients, instructions, and an optional image.

## Features

### Backend (Node.js/Express)
- **API Endpoints**
  - `GET /api/recipes` - Fetch a paginated list of recipes.
  - `GET /api/recipes/:id` - Fetch details of a single recipe.
  - `POST /api/recipes` - Create a new recipe.
  - `PATCH /api/recipes/:id` - Update an existing recipe.
  - `DELETE /api/recipes/:id` - Delete a recipe.

- **Data Storage**
  - Integrates with MongoDB for persistent storage.

- **Image Handling**
  - Upload and store images with recipes locally.

- **Validation**
  - Uses express-validator to enforce required fields and validate incoming data.

- **Error Handling**
  - Handle error with appropriate HTTP status codes and error messages.

### Frontend (React)
- **Recipe Management**
  - Simple and intuitive UI to create, view, update, and delete recipes.
  - Image preview functionality for recipe images.
