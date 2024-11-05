const Content = () => {
    const handleChange = () => {
        const name = ['Eliyas', 'Mohamed', 'eliyasmd'];
        const int = Math.floor(Math.random() * name.length);
        return name[int];
      }
    
    const handleClick = () => {
        console.log("you clicked it");
    }
    const handleClick2 = (name) => {
        console.log(`${name} clicked it`)
    }
    const handleClick3 = (e) => {
        console.log(e.target.innerText)
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello {handleChange()}!
        </p>
        <button onClick={handleClick}>Click It</button>
        <button onClick={() => handleClick2('Eliyas')}>Click It</button>
        <button onClick={(e) => handleClick3(e)}>Click It</button>
    </main>
  )
}

export default Content