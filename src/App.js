import { useState, useEffect } from 'react';
import fetchData from './api/fetchData';

function App() {
  const [ searchItem, setSearchItem ] = useState('');
  const [ userData, setUserData ] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');

  useEffect(() => {
    const users = async () => {
      const result = await fetchData();
      setUserData(result.data);
    };
    users()
  }, [])



  const handleSearch = async (e) => {
    setSearchItem(e.target.value);
    const searchResult = userData.filter((item) => (item.name).toLowerCase().includes(searchItem));
    setSearchValue(searchResult);
  }

  return (
    <div>
      <h1>Search Filter</h1>
      <input
       type='text'
       value={searchItem}
       onChange={handleSearch}
       placeholder='Enter the text to search'
       style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />
      <>
        <ul>
            {searchValue.length > 0 
            ? (
              searchValue.map((item) => 
                <li key={item.id}>
                  {item.name} <br/>
                  {item.username}
                </li>
              )
            ) : (
              <li>NO content Available</li>
            )}
        </ul>
      </>
    </div>
  )
}

export default App;
