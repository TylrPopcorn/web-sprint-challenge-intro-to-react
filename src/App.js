import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components'

function makeFriend(value) {

  const StyledChar = styled.div`
    background-color: black;
    opacity: 0.5;
    width: 60%;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;

    border: 1px solid white;
    margin: 2px;
    padding: 5px;

    margin-left: 20%;
    color: white;
    font-family: 'Courier New';

    .charName{
      font-size: 1.2rem;
    }

    .birthYear{
      font-size: 1.3rem;
    }

    transition: all 0.2 ease-in-out;
    &:hover{
      background-color: white;
      color: black;
    }

  }
  `

  return (
    <StyledChar className={value.name}>
      <p className="charName">{value.name}</p>
      <p className="birthYear"> {value.birth_year}</p>
    </StyledChar>
  )
}

const SLOT_CONTAINER_STYLE = styled.div`
  
`

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [characters, setCharacters] = useState(null);

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/`)
      .then(function (value) {
        console.log(value)
        setCharacters(value.data)
      })
      .catch(function (err) {
        console.error(err);
      })
  }, [])


  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <SLOT_CONTAINER_STYLE className="slotContainer">

        {characters && characters.map(function (value) {
          //console.log(value)
          return makeFriend(value)
        })
        }

      </SLOT_CONTAINER_STYLE>
    </div>
  );
}

export default App;
