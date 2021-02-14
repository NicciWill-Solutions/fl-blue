import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';
import { intro, myList } from './constants';
import styled from 'styled-components';

const StyledShoppingApp = styled.div`
  display: flex;
  justify-content: center;
  font-family: Truculenta, sans-serif;
  color: #3a6077;
`;

const ListWrapper = styled.div`
  border: 1px dashed #397a98;
  padding: 30px 50px;
  margin-top: 30px;
  border-radius: 4px;
  text-align: center;
  width: 40%;
`;

const List = styled.div`
  border: 1px solid #397a98;
  margin-bottom: 30px;
  border-radius: 4px;
  padding: 15px;
`;

const NotCompletedWrapper = styled(List)`
  background: #ebdcd7;
  color: #50a3b7;
`;

const CompletedWrapper = styled(List)`
  background: #50a3b7;
  color: #ebdcd7;
`;

function ShoppingApp() {
  const [listItems, setListItems] = useState(myList);
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
    <StyledShoppingApp>
      <ListWrapper>
        <h1>Grocery Shopping List</h1>
        <p>{intro}</p>
        <AddItem listItems={listItems} setListItems={setListItems} />
        <NotCompletedWrapper>
          <h2>Not Completed</h2>
          {notCompletedList.every(isListEmpty) || notCompletedList.length === 0
            ? 'Hey! Add some items'
            : ''}
          {notCompletedList}
        </NotCompletedWrapper>
        <CompletedWrapper>
          <h2>Completed</h2>
          {completedList.every(isListEmpty) || completedList.length === 0
            ? 'Hello? Is anyone there?'
            : ''}
          {completedList}
        </CompletedWrapper>
      </ListWrapper>
    </StyledShoppingApp>
  );
}

export default ShoppingApp;
