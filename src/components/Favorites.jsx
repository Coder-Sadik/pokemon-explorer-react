import PokemonCard from "./PokemonCard";
/* eslint-disable react/prop-types */
const Favorites = ({ favorites, toggleFavorite }) => {
	return (
		<div className="p-12">
			<h1 className="text-3xl font-bold text-yellow-500 mb-8">
				Your Favorite Pokémon
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{favorites.map((pokemon) => (
					<PokemonCard
						key={pokemon.name}
						pokemon={pokemon}
						toggleFavorite={toggleFavorite}
						favorites={favorites}
					/>
				))}
			</div>
		</div>
	);
};

export default Favorites;
