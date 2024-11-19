import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {

  const [ posts, setPosts ] = useState([])
  const [ search, setSearch ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle ] = useState('');
  const [postBody, setPostBody ] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useNavigate();

  // this useEffect is usd for inital data rendering form the DB server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        //if the response is not in the 200 range
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    }
    fetchPosts();
  },[])

  // this useEffect is used to display elements in the home page
  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body.toLowerCase()).includes(search.toLowerCase()))
      || ((post.title.toLowerCase()).includes(search.toLowerCase())));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  //to handle the posts that was created new
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? (Number(posts[posts.length - 1].id) + 1).toString() : "1";
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = { id: id, title: postTitle, datetime: datetime, body: postBody };
    try{
      const response  = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostBody('');
      setPostTitle('');
      history('/');
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // to delete the inidividual post
  const handleDelete = async (id) => {
    try {
      const response = await api.delete('/posts/' + id.toString());
      console.log(response.data.id);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      history('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  // to update the individual posts
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const updatePost = { id: id, title: editTitle, datetime: datetime, body: editBody };
    try {
      const response = await api.put('/posts/' + id.toString(), updatePost);
      const allPosts = posts.map(post => (post.id === id) ? {...response.data} : post);
      setPosts(allPosts);
      setEditTitle('');
      setEditBody('');
      history('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  } 

  return (
    <div className="App">
      <Header title="React Js Blog"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route exact path='/' element={<Home posts={searchResults}/>} />
        <Route exact path='/post' element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit}/>} />
        <Route path='/edit/:id' element={<EditPost posts={posts} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody} handleEdit={handleEdit}/>} />
        <Route path='/post/:id' element= {<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
