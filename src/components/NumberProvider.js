import React, { useState } from 'react';

export const NumberContext = React.createContext();

const NumberProvider = props => {
  const [number, setNumber] = useState('');
  const [storedNumber, setStoredNumber] = useState('');
  const [functionType, setFunctionType] = useState('');
  const [show, setShow] = useState('num')

  console.log('number', number)
  console.log('storedNumber', storedNumber)
  console.log('functionType', functionType)

  const handleSetDisplayValue = num => {
    if (number && storedNumber) {
      setStoredNumber(num)
      setShow('stored')
    } else {
      if ((!number.includes('.') || num !== '.') && number.length < 8) {
        setNumber(`${(number + num).replace(/^0+/, '')}`);
      }
      setShow('num')
    }
  };

  const handleSetStoredValue = () => {
    setStoredNumber(number);
    setNumber('');
    setShow('stored')
  };

  const handleClearValue = () => {
    setNumber('');
    setStoredNumber('');
    setFunctionType('');
    setShow('num')
  };

  const handleSetCalcFunction = type => {
    if (number) {
      setFunctionType(type);
      handleSetStoredValue();
    }
    if (storedNumber) {
      setFunctionType(type);
    }
  };

  const handleToggleNegative = () => {
    if (number) {
      if (number > 0) {
        setNumber(`-${number}`);
      } else {
        const positiveNumber = number.slice(1);
        setNumber(positiveNumber);
      }
      setShow('num')
    } else if (storedNumber > 0) {
      setStoredNumber(`-${storedNumber}`);
      setShow('stored')
    } else {
      const positiveNumber = storedNumber.slice(1);
      setStoredNumber(positiveNumber);
      setShow('stored')
    }
  };

  const doMath = () => {
    if (number && storedNumber) {
      switch (functionType) {
        case '+':
          setStoredNumber(`${Math.round(`${(parseFloat(storedNumber) + parseFloat(number)) * 100}`) / 100}`);
          break;
        case '-':
          setStoredNumber(`${Math.round(`${(parseFloat(storedNumber) - parseFloat(number)) * 1000}`) / 1000}`);
          break;
        case '/':
          setStoredNumber(`${Math.round(`${(parseFloat(storedNumber) / parseFloat(number)) * 1000}`) / 1000}`);
          break;
        case 'X':
          setStoredNumber(`${Math.round(`${parseFloat(storedNumber) * parseFloat(number) * 1000}`) / 1000}`);
          break;
        case '%':
          setStoredNumber(`${Math.round(`${parseFloat(storedNumber) % parseFloat(number) * 1000}`) / 1000}`);
          break;
        default:
          break;
      }
      setShow('stored');
      // setNumber('');
    }
  };

  return (
    <NumberContext.Provider
      value={{
        doMath,
        functionType,
        handleClearValue,
        handleSetCalcFunction,
        handleSetDisplayValue,
        handleSetStoredValue,
        handleToggleNegative,
        number,
        show,
        storedNumber,
        setNumber,
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
