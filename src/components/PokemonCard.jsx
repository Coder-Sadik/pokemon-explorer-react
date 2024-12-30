import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../utility/api";

const PokemonCard = ({ pokemon }) => {
	const [pokemonDetails, setPokemonDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadPokemonDetails = async () => {
			try {
				setLoading(true);
				const data = await fetchPokemonDetails(pokemon.name);
				setPokemonDetails(data);
			} catch (err) {
				setError("Failed to load Pokémon details.");
			} finally {
				setLoading(false);
			}
		};
		loadPokemonDetails();
	}, [pokemon.name]);

	const pokemonImage =
		pokemonDetails?.sprites?.other?.dream_world?.front_default;

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

	return (
		<div className="border-4 rounded-sm border-blue-500 w-full">
			<div className="bg-yellow-500 h-[200px] flex justify-center p-4">
				<img src={pokemonImage} alt={pokemon.name} className="" />
			</div>
			<div className="text-center">
				<p className="text-xl md:text-3xl font-bold text-yellow-500 drop-shadow-lg tracking-wider mt-4">
					{pokemon.name.toUpperCase()}
				</p>
				<button className="px-6 py-3 bg-yellow-400 text-blue-500 font-bold text-lg rounded-sm shadow-lg hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 m-4">
					Explore
				</button>
			</div>
		</div>
	);
};

export default PokemonCard;
