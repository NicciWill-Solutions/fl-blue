import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/DoneOutline';
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

const StyledListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

const ItemName = styled.div`
  display: inline-block;
  text-decoration: ${({ isCompleted }) =>
    isCompleted ? 'line-through' : 'none'};
`;

const StyledTooltip = styled(Tooltip)`
  cursor: pointer;
`;

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
    <StyledListItem>
      <ItemName isCompleted={item.isCompleted}>{item.name}</ItemName>
      <div>
        <StyledTooltip title='Delete' placement='left' arrow>
          <IconButton
            aria-label='delete'
            onClick={() => handleDeleteItem(item.id)}
          >
            <DeleteIcon style={{ color: 'currentcolor' }} />
          </IconButton>
        </StyledTooltip>

        <IconButton
          onClick={() =>
            item.isCompleted
              ? handleMarkNotCompleted(item.id)
              : handleMarkCompleted(item.id)
          }
        >
          {item.isCompleted ? (
            <StyledTooltip
              title='Move to Not Completed'
              placement='right'
              arrow
            >
              <RestoreIcon aria-label='not completed' />
            </StyledTooltip>
          ) : (
            <StyledTooltip title='Move to Completed' placement='right' arrow>
              <DoneIcon aria-label='completed' />
            </StyledTooltip>
          )}
        </IconButton>
      </div>
    </StyledListItem>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setListItems: PropTypes.func.isRequired,
};

export default ListItem;
