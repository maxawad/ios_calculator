import React, { useContext } from 'react';
import { NumberContext } from './NumberProvider';

const CalculatorButton = ({ buttonValue }) => {
  const { handleSetDisplayValue } = useContext(NumberContext);
  console.log(buttonValue)
  return (
    <button type="button" onClick={() => handleSetDisplayValue(buttonValue)}>
      {
        buttonValue === 0 ? <span>{buttonValue}</span> : buttonValue
      }
    </button>
  );
};

export default CalculatorButton;
