import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const posts = useStoreState((state) => state.posts);
  const savePost = useStoreActions((actions) => actions.savePost);
  const history = useNavigate();

  const handleSubmit = (e) => {
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
    savePost(newPost);
    history('/');
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