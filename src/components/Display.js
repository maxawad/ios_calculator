import React, { useContext } from 'react';
import { NumberContext } from './NumberProvider';

import './styles.css'

const Display = () => {
  const { number, storedNumber, show } = useContext(NumberContext);
  return (
    <div className="number">
      {show === 'num' ? number || '0' : storedNumber}
    </div>
  );
};

export default Display;
