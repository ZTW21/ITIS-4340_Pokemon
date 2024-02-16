import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";
import InformationPanel from "./components/InformationPanel";

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [filteredPokemonList, setFilteredPokemonList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [showScrollTopButton, setShowScrollTopButton] = useState(false);

	const handlePokemonSelect = (pokemon) => {
		setSelectedPokemon(pokemon);
	};

	const handleScroll = () => {
		if (window.pageYOffset > 300) {
			setShowScrollTopButton(true);
		} else {
			setShowScrollTopButton(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		async function fetchPokemonList() {
			try {
				setLoading(true);
				const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
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
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const setMatchPokemons = (filteredPokemons) => {
		if (filteredPokemons.length === 0) {
			setFilteredPokemonList(pokemonList);
			setSelectedPokemon(null);
			return;
		}

		setFilteredPokemonList(filteredPokemons);
		if (filteredPokemons.length > 0) {
			setSelectedPokemon(filteredPokemons[0]);
		}
	};
	return (
		<div className='App' style={{ backgroundColor: "#d2f2fa" }}>
			<div className='flex'>
				<div className='w-2/3'>
					<SearchBar pokemonList={pokemonList} setMatchPokemons={setMatchPokemons} />
					{loading ? (
						<div>Loading...</div>
					) : (
						<PokemonList pokemonList={filteredPokemonList} handlePokemonSelect={handlePokemonSelect} />
					)}
				</div>
				<div className='w-1/3'>
					<InformationPanel selectedPokemon={selectedPokemon} />
				</div>
			</div>
			{showScrollTopButton && (
				<button
					onClick={scrollToTop}
					style={{
						position: "fixed",
						bottom: "20px",
						right: "20px",
						padding: "10px",
						fontSize: "16px",
						zIndex: 1000,
					}}>
					Scroll to Top
				</button>
			)}
		</div>
	);
}

export default App;
