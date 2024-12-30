import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { fetchPokemonList, fetchPokemonDetails } from "./utility/api";

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch default Pokémon list
	const fetchDefaultPokemon = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchPokemonList(12); 
			setPokemonList(data);
		} catch (err) {
			setError("Failed to load Pokémon.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDefaultPokemon();
	}, []);

	const handleSearch = async (query) => {
		if (!query) {
			fetchDefaultPokemon();
			return;
		}

		try {
			setLoading(true);
			setError(null);

			// Fetch Pokémon by name
			const searchedPokemon = await fetchPokemonDetails(query.toLowerCase());
			setPokemonList([searchedPokemon]); // Display only the searched Pokémon
		} catch (err) {
			setError("No Pokémon found.");
			setPokemonList([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Navbar />
			<h1 className="text-center text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-md mt-6 md:mt-12">
				<span className="text-blue-500">Pokémon</span> Explorer
			</h1>

			<SearchBar onSearch={handleSearch} />

			{loading ? (
				<p className="text-center text-yellow-500 font-bold text-2xl mt-8">
					Loading Pokémon...
				</p>
			) : error ? (
				<p className="text-center text-red-500 font-bold text-2xl mt-8">
					{error}
				</p>
			) : (
				<CardContainer pokemons={pokemonList.slice(0, 12)} />
			)}
		</>
	);
}

export default App;
