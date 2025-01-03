/* eslint-disable react/prop-types */
import PokemonCard from "./PokemonCard";
const CardContainer = ({ pokemons, toggleFavorite, favorites }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-12">
			{pokemons.map((pokemon) => (
				<div key={pokemon.name}>
					<PokemonCard
						pokemon={pokemon}
						toggleFavorite={toggleFavorite}
						favorites={favorites}
					/>
				</div>
			))}
		</div>
	);
};

export default CardContainer;
