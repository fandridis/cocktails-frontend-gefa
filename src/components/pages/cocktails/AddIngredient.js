import React from 'react';
import Select from 'react-select';
import './AddIngredient.css';

const AddIngredient = (props) => {

  // Use the function/action passed from parent to get the tournaments
 // let tournaments = [];
  const ingredients = props.ingredients || [];
  const index = props.index;
 // const quantityTypes = props.quantityTypes || [];
  
  return (
    <div className="ingredient-wrapper react-select-css">
      <Select
        className='react-select-container'
        classNamePrefix="react-select"
        options={ingredients}
        onChange={(e) => {props.handleIngredientChange(e, index)}}
        placeholder={"Select ingredient"}
      />
    </div>
  );


};

export default AddIngredient;