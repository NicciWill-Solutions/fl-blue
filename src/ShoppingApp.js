import { useRef, useState } from 'react';

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

  function handleDeleteItem(itemId) {
    const updatedList = listItems.filter((item) => item.id !== itemId);
    setListItems(updatedList);
  }

  function handleMarkNotCompleted(itemId) {
    const itemToUpdate = listItems.filter((item) => item.id === itemId);
    const updatedList = listItems.filter((item) => item.id !== itemId);
    itemToUpdate[0].isCompleted = false;
    setListItems([...itemToUpdate, ...updatedList]);
  }

  function handleMarkCompleted(itemId) {
    const itemToUpdate = listItems.filter((item) => item.id === itemId);
    const updatedList = listItems.filter((item) => item.id !== itemId);
    itemToUpdate[0].isCompleted = true;
    setListItems([...itemToUpdate, ...updatedList]);
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
        ></input>
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
            <div key={item.id}>
              {item.name} |{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteItem(item.id)}
              >
                DEL
              </span>
              |{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleMarkCompleted(item.id)}
              >
                MTC
              </span>
            </div>
          ) : null
        )}
      </div>
      <div>
        <h3>Completed</h3>
        {listItems.map((item) =>
          item.isCompleted ? (
            <div key={item.id}>
              {item.name} |{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleMarkNotCompleted(item.id)}
              >
                MTNC
              </span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ShoppingApp;
