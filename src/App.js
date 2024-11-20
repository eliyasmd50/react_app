import { useEffect } from 'react';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import {  Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './Layout';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // this useEffect is usd for inital data rendering form the DB server
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);


  return (
    <div className="App">      
        <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home 
                  fetchError={fetchError} 
                  isLoading={isLoading} 
                  />} />
            <Route path='post' element={<NewPost />} />
            <Route path='edit/:id' element={<EditPost />} />
            <Route path='post/:id' element= {<PostPage />} />
            <Route path='about' element={<About />} />
            <Route index path='*' element={<Missing />} />
          </Route>
        </Routes>
        </DataProvider>
    </div>
  );
}

export default App;
