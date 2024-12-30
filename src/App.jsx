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
	const [favorites, setFavorites] = useState([]);

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
			setPokemonList([searchedPokemon]);
		} catch (err) {
			setError("No Pokémon found.");
			setPokemonList([]);
		} finally {
			setLoading(false);
		}
	};

	//to add favorite Pokemon
	const toggleFavorite = (pokemon) => {
		setFavorites((prevFavorites) => {
			const isFavorite = prevFavorites.find((fav) => fav.name === pokemon.name);
			if (isFavorite) {
				return prevFavorites.filter((fav) => fav.name !== pokemon.name);
			}
			return [...prevFavorites, pokemon];
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
