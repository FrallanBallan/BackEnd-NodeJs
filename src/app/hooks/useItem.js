// hooks/useItems.js
import { useState, useEffect } from "react";

const useItems = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, fetchItems };
};

export default useItems;

//  // Extract unique categories
//       const uniqueCategories = [...new Set(data.map(item => item.category))];
//       setCategories(uniqueCategories);

//       // Extract unique quantities
//       const uniqueQuantities = [...new Set(data.map(item => item.quantity))];
//       setQuantities(uniqueQuantities);

//       // Extract stock statuses
//       const stockStatuses = [...new Set(data.map(item => (item.inStock ? "In Stock" : "Out of Stock")))];
//       setStockStatuses(stockStatuses);
