import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName, changePage } from "../redux/actions";

export default function SearchBar() {

   const dispatch = useDispatch();
   const [name, setName] = useState("");

   const handleInputChange = (e) => {
      setName(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (name) {
         dispatch(getRecipeName(name));
         dispatch(changePage(1));
         setName("");
      }
   };

   return (
      <div>
         <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="Search..." value={name} onChange={(e) => handleInputChange(e)} />
            <button type="submit">Search</button>
         </form>
      </div>
   );
}