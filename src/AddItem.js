import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import { Typography } from '@material-ui/core';
import theme from './theme';

const StyledAddItem = styled.div`
  margin: 30px 0;
`;

const ErrorMessage = styled(Typography)`
  color: ${theme.palette.error.main};
  position: relative;
  left: -77px;
`;

const AddItem = ({ listItems, setListItems }) => {
  const [error, setError] = useState('');
  const itemInputRef = useRef(null);

  function handleAddItem() {
    const newItem = itemInputRef.current.value;
    const maxIdReducer = (acc, curr) => (curr.id > acc ? curr.id : acc);
    const maxId = listItems?.reduce(maxIdReducer, listItems[0]?.id) || 0;

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
    <StyledAddItem>
      <Input
        type='text'
        name='addItem'
        placeholder='Enter Item'
        inputRef={itemInputRef}
        onChange={clearErrorMsg}
        onKeyPress={handleKeyPress}
        variant='outlined'
      ></Input>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        onClick={handleAddItem}
      >
        Add Item
      </Button>
      {error ? <ErrorMessage>{error}</ErrorMessage> : ''}
    </StyledAddItem>
  );
};

AddItem.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setListItems: PropTypes.func.isRequired,
};

export default AddItem;
