import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditPost = ({
    posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody
}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if(posts) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [posts, setEditTitle, setEditBody]);

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