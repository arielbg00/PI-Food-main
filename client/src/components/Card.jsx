import React from "react";
import s from "../styles/card.module.css";

export default function Card({ name, image, diets, summary }) {
   return (
      <div className={s.witdh}>
         <div>
            <h4 className={s.textDark}>{name}</h4>
         </div>
         <div>
            <img src={image} alt="flag" />
         </div>
         <div>
            <h2>{diets}</h2>
         </div>
         <p>{summary}</p>

      </div>
   );
}