
import React, { useState, useEffect } from 'react';


function App() {
  const [breeds, setBreeds] = useState([]);
//   const [selected, setSelected] = useState(null);
  const [input, setInput] = useState('');
  const [click, setClick] = useState(false);
  const [breedsToRemove, setBreedsToRemove] = useState([]);


  useEffect(() => {
    fetch('https://dog-api.kinduff.com/api/facts?number=5')
      .then(response => response.json())
      .then(data => {
        setBreeds(data.facts)
      });
  }, []);

  const handleRemove = index => {
    const newBreeds = [...breeds];
    newBreeds.splice(index, 1);
    setBreeds(newBreeds);
  };


//   const handleSelect = index => {
//     setSelected(breeds[index]);
//   };
  const handleChange = index => {
    setClick(!click);
    const selectedBreeds = [...breeds]
    selectedBreeds.splice(index,1);
    setBreedsToRemove(selectedBreeds);
  }
console.log(breedsToRemove)

  const handleAdd = () => {
    if (!input) return;
    setBreeds([...breeds, input]);
    setInput('');
  };


  return (
    <div>
      <h1>Dog Breeds</h1>
      <ul>
        {breeds.map((breed, index) => (
          <li key={index}>
            {breed}
            <button onClick={() => handleRemove(index)}>Remove</button>
            {/* <button onClick={() => handleChange()}>Select</button> */}
            <input
                type="checkbox"
                value={click}
                onChange={handleChange}
            />
          </li>
        ))}
      </ul>
      {/* {selected && <p>Selected: {selected}</p>} */}
      <button>Remove</button>
      <input type="text"
            value={input}
            onChange={e=> setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}


export default App;