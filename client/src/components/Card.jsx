import React from "react";
import s from "../styles/card.module.css";

export default function Card({ name, image, diets }) {
   return (
      <div className={s.witdh}>
         <div>
            <h4>{name}</h4>
         </div>
         <div>
            <img src={image} alt="flag" />
         </div>
         <div>
            <h2 className={s.textW}>{diets}</h2>
         </div>
      </div>
   );
}