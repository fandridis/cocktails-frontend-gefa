import React from 'react';
import Select from 'react-select';
import SelectMat from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './Ingredient.css';

const Ingredient = (props) => {

  // Use the function/action passed from parent to get the tournaments
 // let tournaments = [];
  const ingredients = props.ingredients || [];
  const quantityTypes = props.quantityTypes || [];
  
  return (
    <div className="ingredient-wrapper">
      <Select 
        className='react-select-container'
        classNamePrefix="react-select"
        options={props.ingredients}
        onChange={props.handleIngredientChange}
        placeholder={"Select ingredient"}
      />

    <SelectMat
      value={[1, 2, 3]}
      onChange={props.handleChange}
      inputProps={{
        name: 'age',
        id: 'age-simple',
      }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </SelectMat>

    </div>
  );


};

export default Ingredient;