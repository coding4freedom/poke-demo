import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  // setting state with react hooks useState
  // you need to give useState() an initial value or empty 
  // value
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  // everytime we refresh our page useEffect will trigger
  useEffect(() => {
    setLoading(true)
    let cancel    
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      })

      // this line will cancel any old request
      return () => cancel()
  }, [currentPageUrl]); 
  // the empty array mean it will only run once
  // we pass currentPageUrl to the useEffect [] to refecth our 
  // pokemon
  // this will make a fetch request and return a promise

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
   setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading Information..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
