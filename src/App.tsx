import { useEffect, useState } from "react";
import "./App.css";

interface catFact {
  fact: string;
  length: number;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CatFacts />
      </header>
    </div>
  );
}

const CatFacts = () => {
  const [data, setData] = useState({} as catFact);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (): Promise<any> => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch("https://catfact.ninja/fact", options);

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>{data.fact}</h1>
      <CatFactButton callback={fetchData}>get cat fact</CatFactButton>
    </>
  );
};

const CatFactButton = ({ callback, children }: { callback: () => Promise<any>; children: string }) => {
  const [buttonCounter, setButtonCounter] = useState(Number(localStorage.getItem("buttonCounter")) ?? 0);

  function clickHandler() {
    callback();
    setButtonCounter(buttonCounter + 1);
  }

  useEffect(() => {
    localStorage.setItem("buttonCounter", JSON.stringify(buttonCounter));
  }, [buttonCounter]);

  return (
    <div>
      <p>{`button clicked: ${buttonCounter}`}</p>
      <button onClick={() => clickHandler()}>{children}</button>
    </div>
  );
};

export default App;
