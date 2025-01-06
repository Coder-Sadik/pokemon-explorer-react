import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, toggleFavorite, favorites }) => {
	const [pokemonDetails, setPokemonDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// console.log(pokemon);

	// Fetch Pokémon details
	useEffect(() => {
		const fetchPokemonDetails = async () => {
			try {
				setLoading(true);
				const response = await fetch(pokemon.url);
				const data = await response.json();
				setPokemonDetails(data);
			} catch {
				setError("Failed to load Pokémon details.");
			} finally {
				setLoading(false);
			}
		};

		fetchPokemonDetails();
	}, [pokemon.url]);

	// Check if the Pokémon is a favorite
	const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

	if (loading) {
		return (
			<div className="border-4 rounded-sm border-blue-500 w-full">
				<div className="bg-yellow-500 h-[200px] flex justify-center items-center">
					<p className="text-blue-500 font-bold">Loading...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="border-4 rounded-sm border-blue-500 w-full">
				<div className="bg-yellow-500 h-[200px] flex justify-center items-center">
					<p className="text-red-500 font-bold">{error}</p>
				</div>
			</div>
		);
	}

	// Extract Pokémon image from the fetched details
	const pokemonImage =
		pokemonDetails?.sprites?.other?.dream_world?.front_default;

	return (
		<div className="border-4 rounded-sm border-blue-500 w-full">
			<div className="bg-yellow-500 h-[200px] flex justify-center p-4">
				{/* Pokémon Image */}
				<img
					src={pokemonImage}
					alt={pokemon.name}
					className="object-contain h-full"
				/>
			</div>
			<div className="text-center p-4">
				{/* Pokémon Name */}
				<p className="text-xl md:text-3xl font-bold text-yellow-500 drop-shadow-lg tracking-wider mt-4">
					{pokemon.name.toUpperCase()}
				</p>

				{/* View Details Link */}
				<Link
					to={`/pokemonDetails/${pokemon.name}`}
					className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg transition duration-300 ease-in-out hover:bg-blue-600"
				>
					View Details
				</Link>

				{/* Toggle Favorite Button */}
				<button
					onClick={() => toggleFavorite(pokemon)}
					className={`inline-block ml-2 mt-2 px-4 py-2 rounded-md shadow-lg transition duration-300 ease-in-out ${
						isFavorite ? "bg-red-500 text-white" : "bg-yellow-500 text-black"
					}`}
				>
					{isFavorite ? "Unfavorite" : "Favorite"}
				</button>
			</div>
		</div>
	);
};

export default PokemonCard;
