import React, { useState, useEffect } from 'react';

function App() {
    const [breeds, setBreeds] = useState([]);
    const [input, setInput] = useState('');
    const [click, setClick] = useState(false);
    const [breedsToRemove, setBreedsToRemove] = useState([]);
    const [checked, setChecked] = useState([]);
  
    useEffect(() => {
      fetch('https://dog-api.kinduff.com/api/facts?number=7')
        .then(response => response.json())
        .then(data => {
          setBreeds(data.facts)
        });
    }, []);
  
    //useEffect to reset my check state and remove the previous selections
    useEffect(() => {
      setChecked([])
    }, [breeds]);
  
    const handleRemove = index => {
      const newBreeds = [...breeds];
      newBreeds.splice(index, 1);
      setBreeds(newBreeds);
      setBreedsToRemove(breedsToRemove.filter(breed => breed !== breeds[index]));
    };
  
    const handleChange = index => {
      setClick(!click);
      setBreedsToRemove([...breedsToRemove, breeds[index]]);
    }
  
    const handleAdd = () => {
        //so we cant add an empty value
      if (!input) return;
      setBreeds([...breeds, input]);
      setInput('');
    };
  
    return (
      <div>
        <h1 className="text-2xl font-bold m-10">Dog Facts App</h1>
        <div className="block max-w-screen-xl m-6">
          {breeds.map((breed, index) => (
            <div key={index} className="text-xl flex w-full">
              {breed}
              <button onClick={() => handleRemove(index)}
                className="items-end"
              >Remove</button>
              <input
                    className="items-end"
                  type="checkbox"
                  checked={checked[index]}
                  onChange={() => {
                      const newChecked = [...checked];
                    //   toggle checkbox
                      newChecked[index] = !newChecked[index];
                      setChecked(newChecked);
                      handleChange(index);
                  }}
              />
  
            </div>
          ))}
        </div>
        <button onClick={() => setBreeds(breeds.filter(breed => !breedsToRemove.includes(breed)))}>Remove</button>
        <input type="text"
              value={input}
              onChange={e=> setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    );
  }
  
  export default App;
  