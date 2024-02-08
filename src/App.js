import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import InformationPanel from './components/InformationPanel';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  }

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        setPokemonList(data.results);
        setFilteredPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon => {
      const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
      return pokemon.name.includes(searchQuery.toLowerCase()) || pokemonId.includes(searchQuery);
    });

    setFilteredPokemonList(filtered);
  }, [searchQuery, pokemonList]);

  return (
    <div className="App" style={{ backgroundColor: '#d2f2fa' }}>
      <div className="flex">
        <div className="w-2/3">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PokemonList pokemonList={filteredPokemonList} handlePokemonSelect={handlePokemonSelect} />
          )}
        </div>
        <div className="w-1/3">
          <InformationPanel selectedPokemon={selectedPokemon} />
        </div>
      </div>
    </div>
  );
}

export default App;
