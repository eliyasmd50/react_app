import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // this useEffect is usd for inital data rendering form the DB server
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // this useEffect is used to display elements in the home page
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return <DataContext.Provider value={{
    search, setSearch,
    searchResults, fetchError, isLoading,
    posts, setPosts, 
  }}>{children}</DataContext.Provider>;
};

export default DataContext;
