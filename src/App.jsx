import React, { useState, useEffect } from 'react';

function App() {
    const [breeds, setBreeds] = useState([]);
    const [input, setInput] = useState('');
    const [click, setClick] = useState(false);
    const [breedsToRemove, setBreedsToRemove] = useState([]);
    const [checked, setChecked] = useState([]);
  
    useEffect(() => {
      fetch('https://dog-api.kinduff.com/api/facts?number=5')
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
        <div className="block max-w-screen-xl mx-auto">
          {breeds.map((breed, index) => (
            <div key={index} className="text-xl flex justify-between w-full bg-orange-300 rounded-lg p-3 mb-2">
              {breed}
              <div className="justify-end flex flex-nowrap rounded-lg ">
              <button onClick={() => handleRemove(index)}
                className="bg-blue-300 rounded-lg p-2"
              >Remove</button>
              <input
                    className="h-1/2 w-5 m-3 ml-2"
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
            </div>
          ))}
        </div>
        <input type="text"
              value={input}
              onChange={e=> setInput(e.target.value)}
              className="border-2 border-black flex m-4 w-2/3 h-36 pb-24 pl-4 mx-auto"
              placeholder="Type the breed or details you want to add!"
        />
        <button onClick={() => setBreeds(breeds.filter(breed => !breedsToRemove.includes(breed)))}
                className="bg-blue-500 rounded-lg "
        >Remove</button>
        <button onClick={handleAdd}>Add</button>
      </div>
    );
  }
  
  export default App;
  