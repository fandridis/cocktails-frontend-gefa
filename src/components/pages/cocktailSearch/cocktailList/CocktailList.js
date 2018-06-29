import React from 'react';
import './CocktailList.css';

import CocktailCard from '../cocktailCard/CocktailCard';

const CocktailList = (props) => {
  
  return (
      <div className="cocktailList-wrapper">
          {props.cocktails.map(cocktail =>
            <CocktailCard
              key={cocktail.name}
              name={cocktail.name}
              img={cocktail.imageLink}
              strength={cocktail.strength}
              shortDescription={cocktail.shortDescription}
            />
          )}
     </div>
  );
  
};

export default CocktailList;