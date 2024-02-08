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
          <div key={pokemonId} className="aspect-square bg-gray-200 flex flex-col items-center justify-center rounded-lg shadow-md overflow-hidden">
            <img src={spriteUrl} alt={pokemon.name} className="w-50 h-50 object-contain" />
            <p className="text-center mt-1 text-xs">{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
