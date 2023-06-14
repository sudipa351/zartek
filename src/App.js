import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch dish categories and dishes from API
    axios
      .get("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const handleRemoveFromCart = () => {
    setCartCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      <header>
        <h1>Menu</h1>
        <span>Cart: {cartCount}</span>
      </header>
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div>
          <h2>{selectedCategory.name}</h2>
          {selectedCategory.dishes.map((dish) => (
            <div key={dish.id} className="dish">
              <div>
                <h3>{dish.name}</h3>
                {dish.addoncat && <span>Customizations available</span>}
              </div>
              <div>
                <button onClick={handleRemoveFromCart}>-</button>
                <span>0</span>
                <button onClick={handleAddToCart}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
