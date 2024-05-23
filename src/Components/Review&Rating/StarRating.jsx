import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStar = (index) => {
    if (index < fullStars) {
      return <span key={index}>&#9733;</span>; // Filled star
    } else if (hasHalfStar && index === fullStars) {
      return <span key={index}>&#9734;&#9733;</span>; // Half-filled star
    } else {
      return <span key={index}>&#9734;</span>; // Empty star
    }
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
    </div>
  );
};


export default StarRating;
