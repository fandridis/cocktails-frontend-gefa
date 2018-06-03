import React from 'react';
import Select from 'react-select';
import './AddQuantityType.css';

const AddIngredientType = (props) => {

  // Use the function/action passed from parent to get the tournaments
 // let tournaments = [];
 // const ingredients = props.ingredients || [];
  const quantityTypes = props.quantityTypes || [];
  const index = props.index;

  
  return (
    <div className="quantity-wrapper">
      <Select 
        className='react-select-container'
        classNamePrefix="react-select"
        options={quantityTypes}
        onChange={(e) => {props.handleQuantityTypeChange(e, index)}}
        placeholder={"Quant. Type"}
      />
    </div>
  );


};

export default AddIngredientType;