import { useState, useEffect } from 'react';
import fetchData from './api/fetchData';
import PaginationContent from './PaginationContent';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    const api = async ()=> {
      try {
        const fetchingData = await fetchData(currentPage);
        console.log(fetchingData.data);
        setData(fetchingData.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    api();
  }, [currentPage]);

  const handlePreviuos = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }



  return (
    <div>
      <PaginationContent 
        data={data} 
        handlePreviuos={handlePreviuos} 
        handleNext={handleNext} 
        currentPage={currentPage}
        isLoading={isLoading} 
      />
    </div>
  )
}

export default App;
