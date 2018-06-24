import React from 'react';
import './CocktailList.css';

import CocktailCard from '../cocktailCard/CocktailCard';

const CocktailList = (props) => {
  
    return (
        <div className="cocktailList-wrapper">
          {props.cocktails.map(cocktail =>
            <CocktailCard
              key={cocktail.name}
              url={cocktail.imageLink}
            />
          )}
        </div>
    );
  
};

export default CocktailList;