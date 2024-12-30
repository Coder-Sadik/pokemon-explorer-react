const PokemonDetails = () => {
	return (
		<>
			<div className="flex justify-center">
				<div className="flex-1">
					<img
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
						alt="pokemon_image"
					/>
				</div>
				<div className="flex-1">
					<h1>Pikachu</h1>
					<p>Type: Normal</p>
					<p>Height: 0.4 meters</p>
					<p>Weight: 6.0 kg</p>
					<p>Abilities</p>
					<p>Types</p>
					<p>Base Stats</p>
				</div>
			</div>
		</>
	);
};

export default PokemonDetails;
