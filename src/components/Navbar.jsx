import { Link } from "react-router-dom";
import pokemonLogo from "../assets/pokemon_logo.png";

const Navbar = () => {
	return (
		<>
			<nav className="flex h-20 bg-yellow-500 justify-between items-center px-12">
				<div className="w-28">
					<img src={pokemonLogo} alt="pokemon_logo" />
				</div>
				<div className="text-white text-lg space-x-8">
					<Link to="/" className="link-style">
						Home
					</Link>
					<Link to="/favorites" className="link-style">
						Favorites
					</Link>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
