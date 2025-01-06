import { NavLink } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";
import pokemonLogo from "../assets/pokemon_logo.png";

const Navbar = () => {
	return (
		<nav className="flex h-20 bg-yellow-500 justify-between items-center px-6 md:px-12 sticky top-0 shadow-lg z-30">
			{/* Logo */}
			<div className="flex items-center">
				<img src={pokemonLogo} alt="pokemon_logo" className="w-20 md:w-28" />
			</div>

			{/* Links */}
			<div className="flex gap-6 md:gap-10 items-center text-white">
				{/* Home */}
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex flex-col items-center gap-1 group md:gap-2 ${
							isActive ? "text-yellow-700 font-bold" : "text-white"
						}`
					}
				>
					<FaHome className="text-2xl group-hover:text-yellow-700 transition-all" />
					<span className="hidden md:inline group-hover:text-yellow-700 text-lg font-medium transition-all">
						Home
					</span>
				</NavLink>

				{/* Favorites */}
				<NavLink
					to="/favorites"
					className={({ isActive }) =>
						`flex flex-col items-center gap-1 group md:gap-2 ${
							isActive ? "text-yellow-700 font-bold" : "text-white"
						}`
					}
				>
					<FaHeart className="text-2xl group-hover:text-yellow-700 transition-all" />
					<span className="hidden md:inline group-hover:text-yellow-700 text-lg font-medium transition-all">
						Favorites
					</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
