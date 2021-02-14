import { useRef, useState } from 'react';
import ListItem from './ListItem';

function ShoppingApp() {
  const myList = [
    {
      id: 1,
      name: 'apples',
      isCompleted: false,
    },
    {
      id: 2,
      name: 'bacon',
      isCompleted: false,
    },
    {
      id: 3,
      name: 'chicken',
      isCompleted: true,
    },
    {
      id: 4,
      name: 'onion',
      isCompleted: false,
    },
  ];

  const [listItems, setListItems] = useState(myList);
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
    <div className='App'>
      <h1>Grocery Shopping List</h1>
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
      <div>
        {
          //TODO: No items to display?
        }
        <h3>Not Completed</h3>
        {listItems.map((item) =>
          !item.isCompleted ? (
            <ListItem
              item={item}
              key={item.id}
              listItems={listItems}
              setListItems={setListItems}
            />
          ) : null
        )}
      </div>
      <div>
        <h3>Completed</h3>
        {listItems.map((item) =>
          item.isCompleted ? (
            <ListItem
              item={item}
              key={item.id}
              listItems={listItems}
              setListItems={setListItems}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default ShoppingApp;
