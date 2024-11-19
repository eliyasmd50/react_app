import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import DataContext from './context/DataContext';
import api from "./api/posts";


const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const history = useNavigate();

    const handleDelete = async (id) => {
        try {
          const response = await api.delete("/posts/" + id.toString());
          console.log(response.data.id);
          const postList = posts.filter((post) => post.id !== id);
          setPosts(postList);
          history("/");
        } catch (error) {
          console.log(`Error: ${error.message}`);
        }
      };
  return (
    <main className="PostPage">
        <article className="Post">
            { post && 
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                    <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                        Delete Posts
                    </button>
                </>
            }
            {!post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well Thats Disappointing</p>
                    <p>
                        <Link to={'/'}>Visit our HomePage</Link>
                    </p>
                </>
            }
        </article>
    </main>
  )
}

export default PostPage