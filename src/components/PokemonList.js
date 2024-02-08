import React from 'react';

function PokemonList({ pokemonList, handlePokemonSelect }) {
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
          <div
            key={pokemonId}
            className="aspect-square bg-[#f5f9fa] flex items-center justify-center rounded-lg shadow-md overflow-hidden relative cursor-pointer"
            onClick={() => handlePokemonSelect({
              name: pokemon.name,
              sprite: spriteUrl
            })}
          >
            <img src={spriteUrl} alt={pokemon.name} className="w-full h-full object-cover" />
            <p className="absolute bottom-0 w-full text-center text-white bg-black bg-opacity-50 p-1 text-xs truncate uppercase">{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
