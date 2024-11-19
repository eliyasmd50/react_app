import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from './context/DataContext';
import { format } from "date-fns";
import api from "./api/posts";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length
      ? (Number(posts[posts.length - 1].id) + 1).toString()
      : "1";
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostBody("");
      setPostTitle("");
      history("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };


    return (
      <main className="NewPost">
          <h1>New Post</h1>
          <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title: </label>
            <input 
                id="postTitle" 
                required
                type="text" 
                value={postTitle} 
                onChange={(e) => setPostTitle(e.target.value)}
                />
            <label htmlFor="postBody">Post: </label>
            <textarea 
                id="postBody" 
                required
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>

      </main>
    )
  }
  
  export default NewPost