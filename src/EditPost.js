import { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DataContext from './context/DataContext';
import { format } from "date-fns";
import api from "./api/posts";

const EditPost = () => {
    const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
    const {posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const history = useNavigate();

    useEffect(() => {
        if(posts) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [post.body, post.title, posts, setEditBody, setEditTitle]);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMM dd, yyyy pp");
        const updatePost = {
          id: id,
          title: editTitle,
          datetime: datetime,
          body: editBody,
        };
        try {
          const response = await api.put("/posts/" + id.toString(), updatePost);
          const allPosts = posts.map((post) =>
            post.id === id ? { ...response.data } : post
          );
          setPosts(allPosts);
          setEditTitle("");
          setEditBody("");
          history("/");
        } catch (error) {
          console.log(`Error: ${error.message}`);
        }
      };

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h1>Edit Post</h1>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title: </label>
                        <input 
                            id="postTitle" 
                            required
                            type="text" 
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)}
                            />
                        <label htmlFor="postBody">Post: </label>
                        <textarea 
                            id="postBody" 
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well Thats Disappointing</p>
                    <p>
                        <Link to={'/'}>Visit our HomePage</Link>
                    </p>
                </>
            }
      </main>
    )
}

export default EditPost