import React from 'react';

const Input = ({ objValue }) => {
    const { label, type } = objValue;
    console.log(objValue);
    return (
      <div>
        <p>{label}: {type}</p>
      </div>
    );
};

export default Input;