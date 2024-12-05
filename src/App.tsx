import Heading from "./components/Heading"
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import { useState } from "react";
import List from "./components/List";

function App() {
  const [ count, setCount ] = useState<number>(1);
  
  return (
    <>
      <Heading title= {"Hello World"} />
      <Section title="My Sub Heading" >This is a section.</Section>
      <Counter setCount = {setCount} >Count is {count}</Counter>
      <List items= {["Tea", "Cofee", "Boost"]} render={(item: string) => <span className="gold">{item}</span>}/>
    </>
  )
   
}

export default App
