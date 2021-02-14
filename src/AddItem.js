import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const AddItem = ({ listItems, setListItems }) => {
  const [error, setError] = useState('');
  const itemInputRef = useRef(null);

  function handleAddItem() {
    const newItem = itemInputRef.current.value;
    const maxIdReducer = (acc, curr) => (curr.id > acc ? curr.id : acc);
    const maxId = listItems?.reduce(maxIdReducer, listItems[0]?.id) || 0;

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
    <div style={{ marginBottom: '20px' }}>
      <input
        type='text'
        name='addItem'
        placeholder='Enter Item'
        ref={itemInputRef}
        onChange={clearErrorMsg}
        onKeyPress={handleKeyPress}
      ></input>
      {/* TODO: click button on Enter */}
      <button style={{ marginLeft: '5px' }} onClick={handleAddItem}>
        Add Item
      </button>
      {error ? (
        <div style={{ color: 'red', position: 'relative', left: '-50px' }}>
          {error}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

AddItem.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setListItems: PropTypes.func.isRequired,
};

export default AddItem;
