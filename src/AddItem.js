import React, { useState, useRef } from 'react';

const AddItem = ({ listItems, setListItems }) => {
  const [error, setError] = useState('');
  const itemInputRef = useRef(null);

  function handleAddItem() {
    const newItem = itemInputRef.current.value;
    const maxIdReducer = (acc, curr) => (curr.id > acc ? curr.id : acc);
    const maxId = listItems.reduce(maxIdReducer, listItems[0].id);

    //TODO also check for a number?
    if (!newItem) {
      setError('Please enter an item');
    } else {
      setListItems([
        { id: maxId + 1, name: newItem, isCompleted: false },
        ...listItems,
      ]);
      setError('');
    }
    itemInputRef.current.value = '';
    itemInputRef.current.focus();
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleAddItem();
    }
  }

  function clearErrorMsg() {
    setError('');
  }

  return (
    <div>
      <input
        type='text'
        name='addItem'
        placeholder='Enter Item'
        ref={itemInputRef}
        onChange={clearErrorMsg}
        onKeyPress={handleKeyPress}
      ></input>
      {/* TODO: click button on Enter */}
      <button onClick={handleAddItem}>Add</button>
      {error ? <div style={{ color: 'red' }}>{error}</div> : ''}
    </div>
  );
};

export default AddItem;
