import React, { useEffect, useState } from "react";
import Item from "./Item";
import Form from "./Form";
import useItems from "../hooks/useItem";

const List = () => {
  const { items, fetchItems } = useItems();

  return (
    <>
      <Form onItemChange={fetchItems} />
      <div className="w-full mt-6">
        <ul>
          <div className="flex items-center justify-between w-full mb-4 bg-white  ">
            <p className="flex-1 text-start border border-gray-600 border-r p-2">
              Name:
            </p>
            <p className="flex-1 text-start border border-gray-600 border-l-0 p-2">
              Quantity:
            </p>
            <p className="flex-1 text-start border border-gray-600 border-l-0 border-r p-2">
              Category:
            </p>
            <p className="flex-1 text-start border border-gray-600 border-l-0 border-r p-2">
              Availability
            </p>
          </div>
          {items.map((item) => (
            <Item
              key={item.id}
              // name={item.name}
              // description={item.description}
              // quantity={item.quantity}
              {...item}
              onItemChange={fetchItems}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
