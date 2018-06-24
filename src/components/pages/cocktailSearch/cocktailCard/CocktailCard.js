import React from 'react';
import './CocktailCard.css';

const CocktailCard = (props) => {
  
    return (
        <div className="cocktailCard-wrapper">
          <img 
            src={"https://cocktailsappimages.blob.core.windows.net/testcontainer/" + props.url}
            alt="cocktail drink"
            className="cocktailCard-image"
          />
        </div>
    );
  
};

export default CocktailCard;