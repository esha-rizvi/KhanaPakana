
import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star text-amber-400"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-amber-300"></i>);
    }
  }
  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
