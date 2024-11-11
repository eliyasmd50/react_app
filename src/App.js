import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

function App() {

  const [items, setItems ] = useState(
    [
      {
        id: 1,
        checked: true,
        item: "item1"
      },
      {
        id: 2,
        checked: false,
        item: "item2"
      },
      {
        id: 3,
        checked: false,
        item: "item3"
      }
    ]
  );

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const afterDelete = items.filter((item) => item.id !== id);
    setItems(afterDelete);
    localStorage.setItem("shoppingList", JSON.stringify(afterDelete));
  }

  return (
    <div className='App'>
      <Header  title="Groceries"/>
      <Content 
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer 
        length={items.length}
      />
    </div>
  );
}

export default App;
