import { useAuth } from "@/contexts/auth";
import React, { useState, useEffect } from "react";

const Form = ({ onItemChange }) => {
  const [newItem, setNewItem] = useState({});
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = {
      name: formData.get("item-name"),
      quantity: formData.get("quantity"),
      description: formData.get("description"),
      category: formData.get("category"),
    };
    setNewItem(item);
    console.log(item);

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Failed man");
      }
      if (onItemChange) {
        onItemChange();
      }
    } catch (error) {
      console.log(error, "baom");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex gap-10 mb-4">
        <div className="flex-3 flex flex-col gap-2 min-w-72 ">
          <label htmlFor="item-name">Name:</label>
          <div className="flex flex-col">
            <input
              className="p-2 border border-black"
              id="item-name"
              name="item-name"
              type="text"
              placeholder="Denethors Tomatoes..."
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              className="p-2 border border border-black"
              id="quantity"
              name="quantity"
              type="number"
              placeholder="4"
            />
            <label htmlFor="category">Category:</label>
            <input
              className="p-2 border border-black"
              id="category"
              name="category"
              type="text"
              placeholder="Vegtable..."
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-start border" htmlFor="description">
            Description:
          </label>
          <textarea
            className="h-full p-2 placeholder:text-start placeholder:align-text-top resize-none border border-black"
            id="description"
            name="description"
            type="text"
            placeholder="Most juicy and volatile tomatoes in the world"
          />
        </div>
      </div>

      {/* <div className="w-72"> */}
      <div className="flex gap-2 mb-4  align-stretch justify-between">
        <button
          onSubmit={handleSubmit}
          className="flex-1 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
        >
          Add item
        </button>
        <select name="" id="1">
          <option value="">Name</option>
        </select>
        <select name="" id="2">
          <option value="">Quantity</option>
        </select>
        <select name="" id="3">
          <option value="">Category</option>
        </select>
      </div>
      {/* </div> */}
    </form>
  );
};

export default Form;
