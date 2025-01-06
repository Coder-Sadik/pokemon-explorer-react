import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CardContainer from "./components/CardContainer";
import Pagination from "./components/Pagination";
import PokemonDetails from "./components/PokemonDetails";
import { fetchPokemonList, fetchPokemonDetails } from "./utility/api";
import Favorites from "./components/Favorites";

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchInput, setSearchInput] = useState("");
	const [favorites, setFavorites] = useState(() => {
		const storedFavorites = localStorage.getItem("favorites");
		return storedFavorites ? JSON.parse(storedFavorites) : [];
	});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	// Fetch Pokémon list with pagination
	const fetchDefaultPokemon = useCallback(
		async (page = 1) => {
			const controller = new AbortController();
			try {
				setLoading(true);
				setError(null);
				const offset = (page - 1) * itemsPerPage;
				const data = await fetchPokemonList(itemsPerPage, offset);
				setPokemonList(data);
			} catch (err) {
				if (err.name !== "AbortError") {
					setError("Failed to load Pokémon.");
				}
			} finally {
				setLoading(false);
			}
			return () => controller.abort();
		},
		[itemsPerPage]
	);

	// Fetch Pokémon by name
	const fetchPokemonByName = useCallback(async (name) => {
		try {
			setLoading(true);
			setError(null);
			const pokemon = await fetchPokemonDetails(name.toLowerCase());
			if (pokemon) {
				setPokemonList([
					{
						name: name.toLowerCase(),
						url: `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
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
	}, []);

	useEffect(() => {
		if (!searchInput) {
			fetchDefaultPokemon(currentPage);
		} else {
			fetchPokemonByName(searchInput);
		}
	}, [searchInput, currentPage, fetchDefaultPokemon, fetchPokemonByName]);

	// Handle search input
	const handleSearch = (query) => {
		setSearchInput(query);
	};

	// Clear search input field
	const handleClearInput = () => {
		setSearchInput("");
	};

	// Change page
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Save favorites to local storage
	useEffect(() => {
		try {
			localStorage.setItem("favorites", JSON.stringify(favorites));
		} catch (error) {
			console.error("Error saving favorites to local storage:", error);
		}
	}, [favorites]);

	// Toggle favorite status of a Pokémon
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
								<>
									<CardContainer
										pokemons={pokemonList}
										toggleFavorite={toggleFavorite}
										favorites={favorites}
									/>
									<Pagination
										currentPage={currentPage}
										onPageChange={handlePageChange}
									/>
								</>
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
