import React from 'react';
import Select from 'react-select';
import './SelectGeneral.css';

const SelectGeneral = (props) => {

  // Use the function/action passed from parent to get the tournaments

  const list = props.list || [];
  const index = props.index || -1;
  const placeholder = props.placeholder || 'Select Value';
  const size = props.size || 'normal';
  
 // const quantityTypes = props.quantityTypes || [];

  const sizeInPixels = size === 'small' ? 200 : size === 'big' ? 400 : 300

  const customStyles = {
    control: () => ({
      width: sizeInPixels,
      display: 'flex'
    })
  }
  
  return (
    <div className="select-general-wrapper">
      <Select
        className='react-select-container'
        classNamePrefix="react-select"
        options={list}
        onChange={(e) => {props.handleChange(e, index)}}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );


};

export default SelectGeneral;