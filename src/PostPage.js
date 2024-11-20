import { useParams, Link, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const PostPage = () => {
    const { id } = useParams();
    const history = useNavigate();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostsById = useStoreState((state) => state.getPostsById);
    const post = getPostsById(id);

    const handleDelete = (id) => {
        deletePost(id);
        history('/');
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