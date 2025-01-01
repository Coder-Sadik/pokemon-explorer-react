import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../utility/api";

const PokemonDetails = () => {
	const { name } = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const fetchPokemonData = async () => {
		try {
			setLoading(true);
			setError(null);
			const pokemonData = await fetchPokemonDetails(name);
			setData(pokemonData);
		} catch {
			setError("Failed to load Pokémon.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPokemonData();
	}, [name]);

	return (
		<>
			<div className="flex items-center justify-center min-h-screen text-white">
				{loading ? (
					<p className="text-3xl font-semibold animate-bounce">
						Loading Pokémon details...
					</p>
				) : error ? (
					<p className="text-3xl font-semibold text-yellow-200">{error}</p>
				) : (
					data && (
						<div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col lg:flex-row border-2 border-yellow-500">
							{/* Left Section: Animated Image */}
							<div className="lg:w-1/2 bg-gradient-to-tl from-yellow-500 to-blue-500 p-8 flex items-center justify-center">
								<img
									className="w-72 h-72 object-contain drop-shadow-md"
									src={
										// data.sprites.versions["generation-v"]["black-white"]
										// 	.animated.front_default ||
										data.sprites.other["dream_world"].front_default ||
										data.sprites.other["official-artwork"].front_default
									}
									alt={`${name} image`}
								/>
							</div>

							{/* Right Section: Pokémon Details */}
							<div className="lg:w-1/2 p-8 space-y-6">
								<h1 className="text-5xl font-extrabold text-yellow-500 text-center lg:text-left">
									{name.toUpperCase()}
								</h1>
								<div className="grid grid-cols-2 gap-4 text-blue-500">
									<p className="text-lg">
										<span className="font-semibold text-gray-700">Type:</span>{" "}
										{data.types.map((type) => type.type.name).join(", ")}
									</p>
									<p className="text-lg">
										<span className="font-semibold text-gray-700">Height:</span>{" "}
										{data.height / 10} meters
									</p>
									<p className="text-lg">
										<span className="font-semibold text-gray-700">Weight:</span>{" "}
										{data.weight / 10} kg
									</p>
									<p className="text-lg">
										<span className="font-semibold text-gray-700">
											Abilities:
										</span>{" "}
										{data.abilities.map((a) => a.ability.name).join(", ")}
									</p>
								</div>
								<div>
									<h2 className="text-3xl font-bold text-yellow-500">
										Base Stats
									</h2>
									<ul className="mt-4 space-y-3">
										{data.stats.map((stat) => (
											<li key={stat.stat.name} className="flex justify-between">
												<span className="text-lg text-gray-700 font-semibold">
													{stat.stat.name}
												</span>
												<span className="text-lg text-blue-500 font-bold">
													{stat.base_stat}
												</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</>
	);
};

export default PokemonDetails;
