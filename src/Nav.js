import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search) ||
        post.title.toLowerCase().includes(search)
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  return (
    <nav className="Nav">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search Posts</label>
            <input 
                id="search"
                type="text" 
                placeholder="Search Posts" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
        </form>
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/post'}>Posts</Link></li>
            <li><Link to={'/about'}>About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav