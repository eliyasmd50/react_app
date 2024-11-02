const Content = () => {
    const handleChange = () => {
        const name = ['Eliyas', 'Mohamed', 'eliyasmd'];
        const int = Math.floor(Math.random() * name.length);
        return name[int];
      }
      
  return (
    <main>
        <p>
            Hello {handleChange()}!
        </p>
    </main>
  )
}

export default Content