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
