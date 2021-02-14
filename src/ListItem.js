import React from 'react';
import PropTypes from 'prop-types';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';

const ListItem = ({ item, listItems, setListItems }) => {
  function handleDeleteItem(itemId) {
    const updatedList = listItems.filter((item) => item.id !== itemId);
    setListItems(updatedList);
  }

  function handleMarkCompleted(itemId) {
    const itemToUpdate = listItems.filter((item) => item.id === itemId);
    const updatedList = listItems.filter((item) => item.id !== itemId);
    itemToUpdate[0].isCompleted = true;
    setListItems([...itemToUpdate, ...updatedList]);
  }

  function handleMarkNotCompleted(itemId) {
    const itemToUpdate = listItems.filter((item) => item.id === itemId);
    const updatedList = listItems.filter((item) => item.id !== itemId);
    itemToUpdate[0].isCompleted = false;
    setListItems([...itemToUpdate, ...updatedList]);
  }

  return (
    <li
      style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          textDecoration: item.isCompleted ? 'line-through' : 'none',
        }}
      >
        {item.name}
      </div>
      <div style={{ display: 'inline-block' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => handleDeleteItem(item.id)}
        >
          DEL
        </span>
        |{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() =>
            item.isCompleted
              ? handleMarkNotCompleted(item.id)
              : handleMarkCompleted(item.id)
          }
        >
          {item.isCompleted ? 'MTNC' : 'MTC'}
        </span>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setListItems: PropTypes.func.isRequired,
};

export default ListItem;
