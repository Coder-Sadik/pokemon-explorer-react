import PokemonCard from "./PokemonCard";

const CardContainer = () => {
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-12">
				<PokemonCard />
				<PokemonCard />
				<PokemonCard />
				<PokemonCard />
				<PokemonCard />
			</div>
		</>
	);
};

export default CardContainer;
