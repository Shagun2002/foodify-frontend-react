import React, { useState } from "react";

function Rating({ value, color }) {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    </div>
  );
}
export default Rating;

export function RatingInput({ value, color, onSelect }) {
  const handleRatingClick = (selectedValue) => {
    console.log("selected = ", selectedValue);
    onSelect(selectedValue);
  };

  const stars = Array(5).fill(0);

  return (
    <div className="rating">
      {stars.map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={starValue}
            onClick={() => handleRatingClick(starValue)}
            style={{ cursor: 'pointer' }} 
          >
            <i
              style={{ color }}
              className={
                value > starValue ? "fas fa-star" : "far fa-star"
              }
            ></i>
            
          </span>
        );
      })}
    </div>
  );
}
