import React from "react";
import { getImgUrl } from "../until";

function PokemonList({ pokemonList, handlePokemonSelect }) {
	return (
		<div className='grid grid-cols-3 gap-4 p-4'>
			{pokemonList.map((pokemon) => {
				const spriteUrl = getImgUrl(pokemon.url);

				return (
					<div
						key={spriteUrl}
						className='aspect-square bg-[#f5f9fa] flex items-center justify-center rounded-lg shadow-md overflow-hidden relative cursor-pointer'
						onClick={() =>
							handlePokemonSelect({
								name: pokemon.name,
								sprite: spriteUrl,
								url: pokemon.url,
							})
						}>
						<img src={spriteUrl} alt={pokemon.name} className='w-full h-full object-cover' />
						<p className='absolute bottom-0 w-full text-center text-white bg-black bg-opacity-50 p-1 text-xs truncate uppercase'>
							{pokemon.name}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default PokemonList;
