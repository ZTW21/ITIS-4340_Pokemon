import { useEffect, useState } from "react";
import { getPokemonHabitat, getPokemonInfoByUrl, getPokemonLocation } from "../server/api";
const listClass = 'ml-10 pl-5 border-2 border-slate-200 w-1/3'
/**@typedef {{name: string, url: string}} InfoType*/
/**@typedef {{is_hidden: boolean, ability: InfoType}} AbilityType*/
/**@typedef {{front_default: string,front_shiny: string }} SpritesType*/
/**@typedef {{name: string, weight: string, height: string,habitat: string, abilities:AbilityType[],base_experience: string, moves: {move: InfoType}[],forms: InfoType[], species: InfoType,sprites:SpritesType,location_area_encounters: string }} PokemonInfoType*/
/**
 *
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
			/**@type {{move:InfoType}[]}*/
			moves: res.moves,
			/**@type {InfoType[]} */
			forms: res.forms,
			/**@type {InfoType}*/
			species: res.species,
			/**@type {{front_default: string,front_shiny: string }}*/
			sprites: res.sprites,
			/**@type {string}*/
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
			<img src={selectedPokemon.sprite} alt={selectedPokemon.name} className='w-40 h-40 mx-auto' />
			<h2 className='text-2xl text-center mt-2 uppercase'>{selectedPokemon.name}</h2>
			{isLoading || Object.keys(pokemonInfo).length === 0 ? (
				<h3>Loading....</h3>
			) : (
				<>
					<div>Weight: {pokemonInfo.weight}</div>
					<div>Height: {pokemonInfo.height}</div>
					<div>Experience: {pokemonInfo.base_experience}</div>
					<div>Location: {pokemonInfo.habitat || '...'}</div>
					<div>Forms: {pokemonInfo.forms.map(item => {
						return <div className={listClass}>{item.name}</div>
					})}</div>
					<div>
						Abilities:{" "}
						{pokemonInfo.abilities.map((item) => {
							return (
								<div className={listClass}>{item.ability.name}</div>
							);
						})}
					</div>
					<div>Moves: {pokemonInfo.moves.slice(0, 5).map(item => {
						return <div className={listClass}>{item.move.name}</div>
					})}</div>
					<div></div>
				</>
			)}
		</div>
	);
}

export default InformationPanel;
