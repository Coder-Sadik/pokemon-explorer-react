import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CardContainer from "./components/CardContainer";
import PokemonDetails from "./components/PokemonDetails";
import { fetchPokemonList, fetchPokemonDetails } from "./utility/api";
import Favorites from "./components/Favorites";

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchInput, setSearchInput] = useState();
	
	const [favorites, setFavorites] = useState(() => {
		const storedFavorites = localStorage.getItem("favorites");
		return storedFavorites ? JSON.parse(storedFavorites) : [];
	});

	// Fetch default Pokémon list
	const fetchDefaultPokemon = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchPokemonList(12);
			setPokemonList(data);
		} catch {
			setError("Failed to load Pokémon.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDefaultPokemon();
	}, []);

	// Handle search query input
	const handleSearch = async (query) => {
		setSearchInput(query);
		if (!query) {
			fetchDefaultPokemon(); // Reset to default list if query is empty
			return;
		}

		try {
			setLoading(true);
			setError(null);

			// Fetch Pokémon by name from the API and get detailed info
			const searchedPokemon = await fetchPokemonDetails(query);

			// Check if the Pokémon exists, and then add it to the list
			if (searchedPokemon) {
				setPokemonList([
					{
						name: query,
						url: `https://pokeapi.co/api/v2/pokemon/${query}`,
					},
				]);
			} else {
				setError("No Pokémon found.");
				setPokemonList([]);
			}
		} catch {
			setError("No Pokémon found.");
			setPokemonList([]);
		} finally {
			setLoading(false);
		}
	};

	// to clear search input
	const handleClearInput = () => {
		setSearchInput("");
		handleSearch("");
	};

	// Load favorites from local storage
	useEffect(() => {
		try {
			const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
			if (storedFavorites && Array.isArray(storedFavorites)) {
				setFavorites(storedFavorites);
			}
		} catch (error) {
			console.error("Error loading favorites from local storage:", error);
		}
	}, []);

	useEffect(() => {
		// Save to local storage whenever favorites change
		try {
			localStorage.setItem("favorites", JSON.stringify(favorites));
		} catch (error) {
			console.error("Error saving to local storage:", error);
		}
	}, [favorites]); // Runs whenever favorites state changes

	const toggleFavorite = (pokemon) => {
		setFavorites((prevFavorites) => {
			const isFavorite = prevFavorites.some((fav) => fav.name === pokemon.name);
			return isFavorite
				? prevFavorites.filter((fav) => fav.name !== pokemon.name)
				: [...prevFavorites, pokemon];
		});
	};

	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<h1 className="header-theme">
								<span className="text-blue">Pokémon</span> Explorer
							</h1>
							<SearchBar
								onSearch={handleSearch}
								searchValue={searchInput}
								clearInput={handleClearInput}
							/>
							{loading ? (
								<p className="text-center text-yellow-500 font-bold text-2xl mt-8">
									Loading Pokémon...
								</p>
							) : error ? (
								<p className="text-center text-red-500 font-bold text-2xl mt-8">
									{error}
								</p>
							) : (
								<CardContainer
									pokemons={pokemonList.slice(0, 12)}
									toggleFavorite={toggleFavorite}
									favorites={favorites}
								/>
							)}
						</>
					}
				/>
				<Route
					path="/pokemonDetails/:name"
					element={
						<PokemonDetails
							favorites={favorites}
							toggleFavorite={toggleFavorite}
						/>
					}
				/>
				<Route
					path="/favorites"
					element={
						<Favorites toggleFavorite={toggleFavorite} favorites={favorites} />
					}
				/>
			</Routes>
		</>
	);
}

export default App;
