import React from 'react';
import { Link } from 'react-router-dom';
import './CocktailList.css';

import CocktailCard from '../cocktailCard/CocktailCard';

const CocktailList = (props) => {
  
return (
      <div className="cocktailList-wrapper">
          {props.cocktails.map(cocktail =>

            <Link to={{
              pathname: `/cocktailDetails/${cocktail.name}`,
              state: { 
                test: 'This is a test',
                cocktail: cocktail
              }
            }}>
            <CocktailCard
              key={cocktail.name}
              name={cocktail.name}
              img={cocktail.imageLink}
              strength={cocktail.strength}
              shortDescription={cocktail.shortDescription}
            />
          </Link>
      )}
  </div>
  );
  
};

export default CocktailList;