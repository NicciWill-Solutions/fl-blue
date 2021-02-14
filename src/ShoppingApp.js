import { useState } from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';
import { myList } from './constants';

function ShoppingApp() {
  const [listItems, setListItems] = useState(myList);

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

  return (
    <div className='App'>
      <h1>Grocery Shopping List</h1>
      <AddItem listItems={listItems} setListItems={setListItems} />
      <div>
        <h3>Not Completed</h3>
        {getFilteredList(listItems, false)}
      </div>
      <div>
        <h3>Completed</h3>
        {getFilteredList(listItems, true)}
      </div>
    </div>
  );
}

export default ShoppingApp;
