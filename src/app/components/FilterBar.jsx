import React, { useState, useEffect } from "react";

const FilterBar = ({ items, onFilterChange }) => {
  //   const [filterList, setFilterList] = useState([]);

  //Om useState ändras körs useEffect eller om Items uppdateras
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isInStock, setIsInStock] = useState(false);

  //Om de finns något si selectedCategory
  useEffect(() => {
    const filteredList = items.filter((item) => {
      const categoryMatch = selectedCategory
        ? item.category === selectedCategory
        : true;
      const stockMatch = isInStock ? item.inStock === true : true;
      //Om man skapar ny citrus out of stock funkar inte filtrering

      return categoryMatch && stockMatch;
    });
    // console.log("Updated filterList", filterList);
    onFilterChange(filteredList);
  }, [items, selectedCategory, isInStock]);
  //Om något ändras så körs
  //
  const onCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const uniqueCategories = Array.from(
    new Set(items.map((item) => item.category))
  );

  const onInStockChange = (e) => {
    setIsInStock(e.target.checked);
  };

  return (
    <div className="flex gap-2 ">
      <select
        name="categoryChoice"
        id="categoryChoice"
        className="border border-black"
        onChange={onCategoryChange}
      >
        <option value="">All categories</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label htmlFor="isInStock">In Stock</label>
      <input
        type="checkbox"
        name="isInStock"
        id="isInStock"
        onChange={onInStockChange}
      />
    </div>
  );
};

export default FilterBar;
