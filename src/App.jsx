import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [clickedNames, setClickedNames] = useState([]);
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/ability/1/")
      .then((response) => response.json())
      .then((result) => setData(result.pokemon));
  }, []);

  function handleClick(item) {
    const name = item.pokemon.name;

    if (clickedNames.includes(name)) {
      alert(`Game Over: Score: ${score}`);
      setScore(0);
      setClickedNames([]);
    } else {
      setClickedNames((prevClickedNames) => [...prevClickedNames, name]);
      setScore((prevScore) => prevScore + 1);
    }
    shuffleData();
  }

  function shuffleData() {
    setData((prevData) => {
      const shuffled = [...prevData];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }

  return (
    <>
    <div>
      {data.map((item) => (
        <button
          key={item.pokemon.name}
          onClick={() => handleClick(item)}
        >
          {item.pokemon.name}
        </button>
      ))}
    </div>
    <p>Score: {score}</p>
    </>
  );
}

export default App;