import React, { useState, useEffect } from "react";
import { getImgUrl } from "../until";

function SearchBar({ setSearchQuery, onSearch }) {
	const [searchQuery, setSearchQueryState] = useState("");
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		const updateMatches = async () => {
			if (searchQuery.length > 0) {
				const fetchedMatches = await fetchMatches(searchQuery);
				setMatches(fetchedMatches.slice(0, 3)); // Take the top 3 matches
				// select the first one
				handleGoClick();
			} else {
				setMatches([]);
			}
		};

		updateMatches();
	}, [searchQuery]);

	const handleGoClick = () => {
		if (matches.length > 0) {
			onSearch(matches[0]); // Use the first match's name for the "Go!" action
		}
	};

	return (
		<div className='flex justify-center my-4'>
			<div className='flex items-center w-full max-w-3xl px-4'>
				<img
					src={`${process.env.PUBLIC_URL}/pokesearch-logo.png`}
					alt='Poke Search Logo'
					className='h-12 mr-8'
				/>
				<div className='flex items-center space-x-4 flex-grow relative'>
					<input
						className='border p-4 rounded-full flex-grow bg-[#43a1de] text-white placeholder-white'
						type='text'
						placeholder='Search for a Pokémon'
						value={searchQuery}
						onChange={(e) => {
							setSearchQueryState(e.target.value.trim());
							setSearchQuery(e.target.value);
						}}
					/>
					<button
						style={{
							backgroundColor: "#fbc4c5",
							color: "#c63838",
							boxShadow: "0 6px 10px rgba(0, 0, 0, 0.25)",
						}}
						className='bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold'
						onClick={handleGoClick}>
						Go!
					</button>
					{matches.length > 0 && (
						<div className='absolute top-full mt-1 bg-white border rounded shadow-lg w-full z-10'>
							{matches.map((match, index) => (
								<div key={index} className='p-2 hover:bg-gray-100 cursor-pointer'>
									{match.name}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

async function fetchMatches(searchQuery) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
		const data = await response.json();

		// Filter the results based on the search query and return the top 3 matches
		const filteredMatches = data.results.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		return filteredMatches.slice(0, 3).map((pokemon) => ({
			name: pokemon.name,
			url: pokemon.url,
			sprite: getImgUrl(pokemon.url),
		}));
	} catch (error) {
		console.error("Error fetching matches: ", error);
		return [];
	}
}

export default SearchBar;
