import Item from "./Item";
import Form from "./Form";
import useItems from "../hooks/useItem";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";

const List = () => {
  const { items, fetchItems } = useItems();
  const [filteredItems, setFilteredItems] = useState([]);

  const handleFilterChange = (filterList) => {
    setFilteredItems(filterList);
    console.log("Fitlered items from FilterBar", filterList);
  };

  return (
    <>
      <Form onItemChange={fetchItems} />
      <FilterBar items={items} onFilterChange={handleFilterChange} />
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
          {/* Render Items */}
          {filteredItems.length > 0
            ? filteredItems.map((item) => (
                <Item key={item.id} onItemChange={fetchItems} {...item} />
              ))
            : items.map((item) => (
                <Item key={item.id} onItemChange={fetchItems} {...item} />
              ))}
        </ul>
      </div>
    </>
  );
};

export default List;
