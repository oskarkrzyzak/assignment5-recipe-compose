import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    cookTime: "",
    ingredients: "",
    instructions: "",
  });

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}/recipes`);
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch {
      console.error("Error fetching recipes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRecipe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", cookTime: "", ingredients: "", instructions: "" });
        fetchRecipes();
      }
    } catch {
      console.error("Error adding recipe");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await fetch(`${API_URL}/recipes/${id}`, { method: "DELETE" });
      fetchRecipes();
    } catch {
      console.error("Error deleting recipe");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍳 Recipe Sharing App</h1>
        <p>Share your favorite recipes with the world!</p>
      </header>

      <main className="main-content">
        {/* ADD RECIPE */}
        <section className="add-recipe-section">
          <h2>Add New Recipe</h2>
          <form className="recipe-form" onSubmit={addRecipe}>
            <input
              type="text"
              name="name"
              placeholder="Recipe Name"
              value={form.name}
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="cookTime"
              placeholder="Cook Time (e.g., 30 minutes)"
              value={form.cookTime}
              onChange={handleInput}
              required
            />
            <textarea
              name="ingredients"
              placeholder="Ingredients (one per line)"
              value={form.ingredients}
              onChange={handleInput}
              rows="4"
              required
            />
            <textarea
              name="instructions"
              placeholder="Cooking Instructions"
              value={form.instructions}
              onChange={handleInput}
              rows="6"
              required
            />
            <button type="submit">Add Recipe</button>
          </form>
        </section>

        {/* LIST RECIPES */}
        <section className="recipes-section">
          <h2>All Recipes ({recipes.length})</h2>

          {loading ? (
            <p>Loading recipes...</p>
          ) : recipes.length === 0 ? (
            <p>No recipes yet — add one above!</p>
          ) : (
            <ul className="recipe-list">
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <h3>{recipe.name}</h3>
                  <p><strong>⏱ Cook Time:</strong> {recipe.cookTime}</p>
                  <p><strong>Ingredients:</strong><br />{recipe.ingredients}</p>
                  <p><strong>Instructions:</strong><br />{recipe.instructions}</p>
                  <button onClick={() => deleteRecipe(recipe.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;