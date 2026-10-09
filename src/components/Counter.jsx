import { useState } from "react";

function Counter({ name, age }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className="justify-center align-middle flex m-20 gap-10">
      <button className="border" onClick={incrementCount}>
        +
      </button>
      <span>Count:{count}</span>
      <button className="border" onClick={decrementCount}>
        -
      </button>
      <h1>
        {name}-{age}
      </h1>
    </div>
  );
}

export default Counter;