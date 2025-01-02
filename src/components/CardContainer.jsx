/* eslint-disable react/prop-types */
import PokemonCard from "./PokemonCard";
const CardContainer = ({ pokemons, toggleFavorite, favorites }) => {
	return (
		<div className="card-container">
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
