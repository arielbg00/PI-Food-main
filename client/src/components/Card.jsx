import React from "react";

export default function Card({ name, image, diets }) {
   return (
      <div>
         <div>
            <h4>{name}</h4>
         </div>
         <div>
            <img src={image} alt="flag" />
         </div>
         <div>
            <h2>{diets}</h2>
         </div>
      </div>
   );
}