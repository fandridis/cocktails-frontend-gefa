import React from 'react';
// import { Link } from 'react-router-dom';
import './CocktailCard.css';

const CocktailCard = (props) => {
  
    return (
      <div className="label__container">
        <p className="Cocktail__label">{props.strength}</p>
                <div className="cocktailCard-wrapper">
          <div className="CocktailCard__header">
            
            {/* heart will go here */}
          </div> 
          <div className="CocktailCard__ImgBackground">

          <img 
            src={"https://cocktailsappimages.blob.core.windows.net/testcontainer/" + props.img}
            alt="cocktail drink"
            className="cocktailCard__image"
          />

          </div> 
          <div className="CocktailCard__footer">
            <h1 className="CocktailCard__name">
              {props.name}
            </h1>
            <p className="CocktailCard__details">
              {props.shortDescription}
            </p>
          </div>
        </div>
      </div>

    );
  
};

export default CocktailCard;