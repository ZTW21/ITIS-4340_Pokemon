import { getData } from "./http";

const host = "https://pokeapi.co";
const commonUrl = host + "/api/v2/";

const getPokemonList = (limitCount) => {
	const url = commonUrl + "pokemon?limit=" + limitCount;
	return getData(url);
};

const getPokemonInfoByUrl = (pokemon) => {
	const url = pokemon.url;
	return getData(url);
};

const getPokemonLocation = (pokemonInfo) => {
	/**@type {string}*/
	let url = pokemonInfo.location_area_encounters;
	if (!url.includes("http")) {
		url = host + url;
	}
	return getData(url);
};

/**
 * @param {import("../components/InformationPanel").PokemonInfoType} pokemonInfo
 * @returns {Promise<import("../components/InformationPanel").InfoType>}
 */
const getPokemonHabitat = (pokemonInfo) => {
	const url = commonUrl + "pokemon-species/" + pokemonInfo.name;
	return getData(url).then((res) => {
		return res?.habitat || "";
	});
};

export { getPokemonList, getPokemonInfoByUrl, getPokemonLocation, getPokemonHabitat };
