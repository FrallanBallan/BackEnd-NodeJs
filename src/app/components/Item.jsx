import { useAuth } from "@/contexts/auth";
import React, { useState } from "react";
import EditItem from "./EditItem";

const Item = ({
  onItemChange,
  name,
  description,
  quantity,
  id,
  inStock,
  category,
}) => {
  const auth = useAuth();
  const [edit, setEdit] = useState(false);

  let itemToChange = {
    name,
    description,
    quantity,
    id,
    inStock,
    category,
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.id;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("ERRRRROR");
      }
      if (onItemChange) {
        onItemChange();
      }
    } catch (error) {
      console.log(error, "errorrrr");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  // try {
  //   const response = await fetch(`/api/items${id}`, {
  //     method: "PUT",
  //   });
  // } catch (error) {
  //   console.log("Error updating with PUT", error);
  // }
  return (
    <>
      {!edit ? (
        <li className="mb-2 border border-gray-600 ">
          <div className="flex items-center  w-full border-gray-600 border-b bg-white  ">
            <p className="flex-1 text-start p-2 border-gray-600 border-r">
              {name}
            </p>
            <p className="flex-1 text-start p-2 border-gray-600 border-r">
              {quantity}
            </p>
            <p className="flex-1 text-start p-2 border-gray-600 border-r">
              {category}
            </p>
            <p className="flex-1 text-start p-2 border-gray-600 ">
              {inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className=" flex justify-between bg-white  ">
            <p className=" text-start p-2">{description}</p>
            <div className="flex p-1 gap-2 ">
              <button
                id={id}
                onClick={handleEdit}
                className="w-24 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                id={id}
                onClick={handleDelete}
                className="w-24 bg-red-600 text-white px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ) : (
        <EditItem
          onClick={handleCloseEdit}
          id={id}
          name={name}
          description={description}
          quantity={quantity}
          setEdit={setEdit}
          item={itemToChange}
          onItemChange={onItemChange}
        />
      )}
    </>
  );
};

export default Item;
