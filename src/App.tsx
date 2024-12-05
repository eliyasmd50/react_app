import { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface User {
  id: number,
  username: string
}

type fibFunc = (n: number) => number

const fibonacci: fibFunc = (n) => {
    if( n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2)
}

const myNum: number = 37;


function App() {
  const [ count, setCount ] = useState<number>(0);
  const [ users, setUsers ] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null)

  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);


  // use effect calls when the component is mounting and if the component is unmounting it returns a cleanup function
  //it did call once again when the user prop updated once after the initial callling when the time of mounting
  useEffect(() => {
    console.log("mounting");
    console.log("Users: ", users);
    return () => console.log("un mounting");
  }, [users]);


  // usecallback is used to memoize a function that recreates for every renders it will again call the functions only when the props changes
  const addTwo = useCallback(() => setCount(prev => prev + 2), []);

// it is used to memoize an expensive calculations in the react it contains a value which has an expensive calculations to do and once the calculation is done at the initial renders it stores the value and the values will be return for every render, if the props value chanmges it will agin rerender the value
  const result = useMemo(() => fibonacci(myNum), [myNum])

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h2>{result}</h2>
      <input type="text" ref={inputRef} />
    </div>
  )
   
}

export default App
