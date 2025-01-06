import PokemonCard from "./PokemonCard";
/* eslint-disable react/prop-types */
const Favorites = ({ favorites, toggleFavorite }) => {
	return (
		<>
			<h1 className="text-3xl text-center font-bold text-yellow-500 mb-8 mt-12">
				{favorites.length > 0 ? "Your Favorite Pokémon" : "No pokemons added"}
			</h1>
			<div className="card-container">
				{favorites.map((pokemon) => (
					<PokemonCard
						key={pokemon.name}
						pokemon={pokemon}
						toggleFavorite={toggleFavorite}
						favorites={favorites}
					/>
				))}
			
			</div>
		</>
	);
};

export default Favorites;
