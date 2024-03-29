import { useEffect, useState } from "react";
import { getPokemonHabitat, getPokemonInfoByUrl, getPokemonLocation } from "../server/api";
import { getImgUrl } from "../until";
const listClass = 'ml-10 pl-5 border-2 border-slate-200 w-1/3 border-border-color text-2xl'
/**@typedef {{name: string, url: string}} InfoType*/
/**@typedef {{is_hidden: boolean, ability: InfoType}} AbilityType*/
/**@typedef {{front_default: string,front_shiny: string }} SpritesType*/
/**@typedef {{name: string, weight: string, height: string,habitat: string, abilities:AbilityType[],base_experience: string, moves: {move: InfoType}[],forms: InfoType[], species: InfoType,sprites:SpritesType,location_area_encounters: string }} PokemonInfoType*/
/**
 * @param {{selectedPokemon:{url: string,name: string,sprite: string }}} param0
 * @returns
 */
function InformationPanel({ selectedPokemon }) {
	const gradientStyle = {
		background: "linear-gradient(to bottom, #ffd93d, #ffd93d 85%, #d2f2fa 100%)",
	};

	/**@type {[PokemonInfoType,any]}*/
	const [pokemonInfo, setInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!selectedPokemon) return;
		setPokemonInfo();
	}, [selectedPokemon?.name]);

	const setPokemonInfo = async () => {
		setIsLoading(true);
		const res = await getPokemonInfoByUrl(selectedPokemon);
		setInfo({
			name: res.name,
			weight: res.weight,
			height: res.height,
			abilities: res.abilities,
			base_experience: res.base_experience,
			moves: res.moves,
			forms: res.forms,
			species: res.species,
			sprites: res.sprites,
			location_area_encounters: res.location_area_encounters,
		});
		setIsLoading(false);

		setPokemonLocation(res);
	}

	const setPokemonLocation = async (pokemonInfo) => {
		/**@type {InfoType} */
		const res = await getPokemonHabitat(pokemonInfo);
		setInfo({
			...pokemonInfo,
			habitat: res.name
		})
	}

	if (!selectedPokemon) {
		return (
			<div style={gradientStyle} className='p-4 min-h-screen'>
				Select a Pokémon to see its details.
			</div>
		);
	}
	return (
		<div style={gradientStyle} className='p-4 min-h-screen'>
			<img src={getImgUrl(selectedPokemon.url)} alt={selectedPokemon.name} className='w-40 h-40 mx-auto' />
			<h2 className='font-bold text-3xl text-center mt-2 uppercase pb-4'>{selectedPokemon.name}</h2>
			{isLoading || Object.keys(pokemonInfo).length === 0 ? (
				<h3>Loading....</h3>
			) : (
				<>
					<div className='flex flex-auto'>
						<div className='font-bold text-2xl'>Weight:</div>
						<div className="text-2xl">{pokemonInfo.weight}</div>
					</div>
					<div className='flex flex-auto'>
						<div className='font-bold text-2xl'>Height:</div>
						<div className="text-2xl">{pokemonInfo.height}</div>
					</div>
					<div className='flex flex-auto'>
						<div className='font-bold text-2xl'>Experience:</div>
						<div className="text-2xl">{pokemonInfo.base_experience}</div>
					</div>
					<div className='flex flex-auto'>
						<div className='font-bold text-2xl'>Location:</div>
						<div className="text-2xl">{pokemonInfo.habitat || '...'}</div>
					</div>
					
					<div className='font-bold text-2xl'>Forms:</div> <div>{pokemonInfo.forms.map((item, index) => {
						return <div key={index} className={listClass}>{item.name}</div>
					})}</div>
					<div>
					<div className='font-bold text-2xl'>Abilities:{" "}</div>
						{pokemonInfo.abilities.map((item, index) => {
							return (
								<div key={index} className={listClass}>{item.ability.name}</div>
							);
						})}
					</div>
					<div className='font-bold text-2xl'>Moves:</div> <div className="">{pokemonInfo.moves.slice(0, 5).map((item, index) => {
						return <div key={index} className={listClass}>{item.move.name}</div>
					})}</div>
				</>
			)}
		</div>
	);
}

export default InformationPanel;
