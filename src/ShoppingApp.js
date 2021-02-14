import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';
import { intro } from './constants';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Truculenta, sans-serif',
        color: '#3a6077',
      }}
    >
      <div
        className='listContainer'
        style={{
          border: '1px solid #397a98',
          padding: '30px 50px',
          marginTop: '30px',
          borderRadius: '4px',
          textAlign: 'center',
          width: '40%',
        }}
      >
        <h1>Grocery Shopping List</h1>
        <p>{intro}</p>
        <AddItem listItems={listItems} setListItems={setListItems} />
        <div
          style={{
            border: '1px solid #397a98',
            background: '#ebdcd7',
            color: '#50a3b7',
            marginBottom: '30px',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <h2>Not Completed</h2>
          {notCompletedList.every(isListEmpty) || notCompletedList.length === 0
            ? 'Hey! Add some items'
            : ''}
          {notCompletedList}
        </div>
        <div
          style={{
            border: '1px solid #397a98',
            background: '#50a3b7',
            color: '#ebdcd7',
            marginBottom: '30px',
            borderRadius: '4px',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <h2>Completed</h2>
          {completedList.every(isListEmpty) || completedList.length === 0
            ? 'Hello? Is anyone there?'
            : ''}
          {completedList}
        </div>
      </div>
    </div>
  );
}

export default ShoppingApp;
