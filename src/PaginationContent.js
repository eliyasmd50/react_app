const PaginationContent = ({ data, handlePreviuos, handleNext, currentPage, isLoading }) => {
    const totalPage = 10;
  return (
    <>
    {
      isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {data.map((item) => (
              <li key={item.id} > 
              page: {item.id}
              {item.title}
                  <p>
                  {item.body}
                  </p> 
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handlePreviuos} disabled={currentPage === 1}>Previos</button>
            <span>{currentPage} of {totalPage}</span>
            <button onClick={handleNext} disabled= {currentPage === totalPage}>Next</button>
          </div>
        </>
    )}
    </>
  )
}

export default PaginationContent