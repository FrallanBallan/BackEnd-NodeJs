import { useAuth } from "@/contexts/auth";
import React, { useState } from "react";

const Model = ({ item, setEdit, onItemChange }) => {
  const auth = useAuth();

  const [newName, setNewName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);

  const handleClose = () => {
    setEdit(false);
  };

  //PUT
  const handleSave = async (e) => {
    e.preventDefault();
    const id = e.target.id;

    const updatedItem = {
      name: newName,
      category: category,
      quantity: Number(quantity), // Convert to number if necessary
      description: description,
    };

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error("Failed with everything");
      }

      if (onItemChange) {
        onItemChange();
      }
    } catch (error) {
      console.log(error, "problem editing body");
    }
  };

  return (
    <>
      <div className="mb-2 border border-gray-600">
        <div className="flex items-center  w-full border-gray-600 border-b ">
          <input
            defaultValue={item.name}
            type="text"
            className="flex-1 text-start p-2 border-gray-600 border-r"
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            defaultValue={item.quantity}
            type="text"
            className="flex-1 text-start p-2 border-gray-600 border-r"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            defaultValue={item.category}
            type="text"
            className="flex-1 text-start p-2 border-gray-600 border-r"
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* <p className="flex-1 text-start p-2 border-gray-600 ">
            {item.inStock ? "In Stock" : "Out of Stock"}
          </p> */}
        </div>
        <div className=" flex justify-between ">
          <textarea
            className="flex-1 text-start p-2 resize-none w-full"
            rows={1}
            defaultValue={item.description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex p-1 gap-2 ">
            <button
              id={item.id}
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              className="bg-red-600 text-white px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleClose}
            >
              {}Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
