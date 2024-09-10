import { useAuth } from "@/contexts/auth";
import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";

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
              required
              className="p-2 border border-black"
              id="item-name"
              name="item-name"
              type="text"
              placeholder="Denethors Tomatoes..."
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              required
              className="p-2 border border border-black"
              id="quantity"
              name="quantity"
              type="number"
              placeholder="4"
            />
            <label htmlFor="category">Category:</label>
            <input
              required
              className="p-2 border border-black"
              id="category"
              name="category"
              type="text"
              placeholder="Vegtable..."
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-start" htmlFor="description">
            Description:
          </label>
          <textarea
            required
            className="h-full p-2 placeholder:text-start placeholder:align-text-top resize-none border border-black"
            id="description"
            name="description"
            type="text"
            placeholder="Most juicy and volatile tomatoes in the world"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4  align-stretch justify-between">
        <button
          onSubmit={handleSubmit}
          className=" w-72 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
        >
          Add item
        </button>
      </div>
    </form>
  );
};

export default Form;

// import { useState, useEffect } from "react";
// import { useAuth } from "@/contexts/auth";

// const Form = ({ onItemChange }) => {
//   const [newItem, setNewItem] = useState({});
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [quantities, setQuantities] = useState([]);
//   const [stockStatuses, setStockStatuses] = useState([]);
//   const [filters, setFilters] = useState({ category: "", quantity: "", inStock: "" });

//   const auth = useAuth();

//   // Fetch items and extract categories, quantities, and stock statuses
//   const fetchItems = async () => {
//     try {
//       const res = await fetch("/api/items");
//       const data = await res.json();
//       setItems(data);

//       // Extract unique categories
//       const uniqueCategories = [...new Set(data.map(item => item.category))];
//       setCategories(uniqueCategories);

//       // Extract unique quantities
//       const uniqueQuantities = [...new Set(data.map(item => item.quantity))];
//       setQuantities(uniqueQuantities);

//       // Extract stock statuses
//       const stockStatuses = [...new Set(data.map(item => (item.inStock ? "In Stock" : "Out of Stock")))];
//       setStockStatuses(stockStatuses);

//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   useEffect(() => {
//     fetchItems(); // Fetch items when the component mounts
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const item = {
//       name: formData.get("item-name"),
//       quantity: formData.get("quantity"),
//       description: formData.get("description"),
//       category: formData.get("category"),
//     };
//     setNewItem(item);

//     try {
//       const response = await fetch("/api/items", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//         body: JSON.stringify(item),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to create item");
//       }
//       if (onItemChange) {
//         onItemChange(); // Optionally notify parent component of the new item
//       }
//       fetchItems(); // Re-fetch items after new item creation
//     } catch (error) {
//       console.error("Error creating item:", error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const filteredItems = items.filter(item => {
//     const { category, quantity, inStock } = filters;
//     return (
//       (!category || item.category === category) &&
//       (!quantity || item.quantity === Number(quantity)) &&
//       (!inStock || (inStock === "In Stock" ? item.inStock : !item.inStock))
//     );
//   });

//   return (
//     <form className="w-full" onSubmit={handleSubmit}>
//       <div className="flex gap-10 mb-4">
//         <div className="flex-3 flex flex-col gap-2 min-w-72">
//           <label htmlFor="item-name">Name:</label>
//           <div className="flex flex-col">
//             <input
//               className="p-2 border border-black"
//               id="item-name"
//               name="item-name"
//               type="text"
//               placeholder="Denethors Tomatoes..."
//             />
//             <label htmlFor="quantity">Quantity:</label>
//             <input
//               className="p-2 border border-black"
//               id="quantity"
//               name="quantity"
//               type="number"
//               placeholder="4"
//             />
//             <label htmlFor="category">Category:</label>
//             <input
//               className="p-2 border border-black"
//               id="category"
//               name="category"
//               type="text"
//               placeholder="Vegetable..."
//             />
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col gap-2">
//           <label className="text-start" htmlFor="description">
//             Description:
//           </label>
//           <textarea
//             className="h-full p-2 placeholder:text-start placeholder:align-text-top resize-none border border-black"
//             id="description"
//             name="description"
//             placeholder="Most juicy and volatile tomatoes in the world"
//           />
//         </div>
//       </div>

//       <div className="flex gap-2 mb-4 align-stretch justify-between">
//         <button
//           type="submit"
//           className="w-72 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
//         >
//           Add item
//         </button>

//         <div className="flex gap-2">
//           {/* Category Filter */}
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleFilterChange}
//             className="border border-black"
//           >
//             <option value="">All Categories</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>

//           {/* Quantity Filter */}
//           <select
//             name="quantity"
//             value={filters.quantity}
//             onChange={handleFilterChange}
//             className="border border-black"
//           >
//             <option value="">All Quantities</option>
//             {quantities.map((quantity, index) => (
//               <option key={index} value={quantity}>
//                 {quantity}
//               </option>
//             ))}
//           </select>

//           {/* In Stock Filter */}
//           <select
//             name="inStock"
//             value={filters.inStock}
//             onChange={handleFilterChange}
//             className="border border-black"
//           >
//             <option value="">All Stock Statuses</option>
//             {stockStatuses.map((status, index) => (
//               <option key={index} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Display filtered items */}
//       <div>
//         <h2>Filtered Items:</h2>
//         <ul>
//           {filteredItems.map((item) => (
//             <li key={item.id}>
//               {item.name} - {item.quantity} - {item.category} -{" "}
//               {item.inStock ? "In Stock" : "Out of Stock"}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </form>
//   );
// };

// export default Form;
