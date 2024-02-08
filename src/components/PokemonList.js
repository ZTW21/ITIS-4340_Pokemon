import React from 'react';

function PokemonList({ pokemonList }) {
  const getIdFromUrl = (url) => {
    const idPattern = /pokemon\/(\d+)\//;
    const match = url.match(idPattern);
    return match ? match[1] : 'N/A';
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {pokemonList.map((pokemon) => {
        const pokemonId = getIdFromUrl(pokemon.url);
        const spriteUrl = `${process.env.PUBLIC_URL}/sprites/pokemon/${pokemonId}.png`;

        return (
          <div key={pokemonId} className="aspect-square bg-gray-200 flex justify-center items-center rounded-lg shadow-md overflow-hidden">
            <img src={spriteUrl} alt={pokemon.name} className="w-full h-full object-cover" />
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
