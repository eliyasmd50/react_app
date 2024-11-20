import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const { id } = useParams();
    const getPostsById = useStoreState((actions) => actions.getPostsById);
    const post = getPostsById(id);
    const history = useNavigate();
    const editPost = useStoreActions((actions) => actions.editPost);

    useEffect(() => {
        if(post) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [post.body, post.title, post, setEditBody, setEditTitle]);

    const handleEdit = (id) => {
        const datetime = format(new Date(), "MMM dd, yyyy pp");
        const updatePost = {
          id: id,
          title: editTitle,
          datetime: datetime,
          body: editBody,
        };
        editPost(updatePost);
        history('/post/' + id);
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
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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