import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';
import { intro } from './constants';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Typography from '@material-ui/core/Typography';

const StyledShoppingApp = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.palette.primary.dark};
`;

const ListWrapper = styled.div`
  border: 1px dotted ${theme.palette.primary.light};
  padding: 30px 50px;
  margin-top: 30px;
  border-radius: 4px;
  text-align: center;
  width: 40%;
`;

const IntroWrapper = styled(Typography)`
  color: ${theme.palette.grey[500]};
`;

const List = styled.div`
  border: 1px dotted ${theme.palette.primary.light};
  margin-bottom: 30px;
  border-radius: 4px;
  padding: 15px;
`;

const NotCompletedWrapper = styled(List)`
  background: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
`;

const CompletedWrapper = styled(List)`
  background: ${theme.palette.primary.main};
  color: ${theme.palette.secondary.main};
`;

function ShoppingApp() {
  const [listItems, setListItems] = useState([]);
  const [notCompletedList, setNotCompletedList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    function getFilteredList(listItems, completedStatus) {
      return listItems.map((item) =>
        item.isCompleted === completedStatus ? (
          <ListItem
            item={item}
            key={item.id}
            listItems={listItems}
            setListItems={setListItems}
          />
        ) : null
      );
    }
    setNotCompletedList(getFilteredList(listItems, false));
    setCompletedList(getFilteredList(listItems, true));
  }, [listItems]);

  const isListEmpty = (curr) => curr === null;

  return (
    <ThemeProvider theme={theme}>
      <StyledShoppingApp>
        <ListWrapper>
          <Typography variant='h2'>Grocery Shopping List</Typography>
          <IntroWrapper>{intro}</IntroWrapper>
          <AddItem listItems={listItems} setListItems={setListItems} />
          <NotCompletedWrapper>
            <Typography variant='h6'>Not Completed</Typography>
            {notCompletedList.every(isListEmpty) ||
            notCompletedList.length === 0 ? (
              <Typography>Hey! Add some items</Typography>
            ) : (
              ''
            )}
            {notCompletedList}
          </NotCompletedWrapper>
          <CompletedWrapper>
            <Typography variant='h6'>Completed</Typography>
            {completedList.every(isListEmpty) || completedList.length === 0 ? (
              <Typography>Hello? Is anyone there?</Typography>
            ) : (
              ''
            )}
            {completedList}
          </CompletedWrapper>
        </ListWrapper>
      </StyledShoppingApp>
    </ThemeProvider>
  );
}

export default ShoppingApp;
