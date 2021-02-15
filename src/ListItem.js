import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/DoneOutline';
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const StyledListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled(Typography)`
  display: inline-block;
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? 'line-through' : 'none'};
`;

const StyledTooltip = styled(Tooltip)`
  cursor: pointer;
`;

const ListItem = ({ item, listItems, setListItems }) => {
  function handleDeleteItem(itemId) {
    const updatedList = listItems.filter((item) => item.id !== itemId);
    setListItems(updatedList);
  }

  function handleCompletedStatus(itemId, isCompleted) {
    const itemToUpdate = listItems.filter((item) => item.id === itemId);
    const updatedList = listItems.filter((item) => item.id !== itemId);
    itemToUpdate[0].isCompleted = isCompleted ? false : true;
    setListItems([...itemToUpdate, ...updatedList]);
  }

  return (
    <StyledListItem>
      <ItemName iscompleted={item.isCompleted}>{item.name}</ItemName>
      <div>
        <IconButton
          onClick={() => handleCompletedStatus(item.id, item.isCompleted)}
        >
          {item.isCompleted ? (
            <StyledTooltip title='Move to Not Completed' placement='left' arrow>
              <RestoreIcon aria-label='not completed' />
            </StyledTooltip>
          ) : (
            <StyledTooltip title='Move to Completed' placement='left' arrow>
              <DoneIcon aria-label='completed' />
            </StyledTooltip>
          )}
        </IconButton>

        <StyledTooltip title='Delete' placement='right' arrow>
          <IconButton
            aria-label='delete'
            onClick={() => handleDeleteItem(item.id)}
          >
            <DeleteIcon style={{ color: 'currentcolor' }} />
          </IconButton>
        </StyledTooltip>
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
