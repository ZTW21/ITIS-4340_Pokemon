import React from 'react';

function PokemonList({ pokemonList }) {
  const getIdFromUrl = (url) => {
    const idPattern = /pokemon\/(\d+)\//;
    const match = url.match(idPattern);
    return match ? match[1] : 'N/A';
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {pokemonList.map((pokemon) => {
        const pokemonId = getIdFromUrl(pokemon.url);
        const spriteUrl = `${process.env.PUBLIC_URL}/sprites/pokemon/${pokemonId}.png`;

        return (
          <div key={pokemonId} className="bg-gray-200 p-4 flex items-center rounded-lg shadow-md">
            <img src={spriteUrl} alt={pokemon.name} className="w-20 h-20 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{pokemon.name}</h3>
              <p className="text-sm">ID: {pokemonId}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
