import CardContainer from "./components/CardContainer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
	return (
		<>
			<Navbar />
			<h1 className="text-center text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-md  mt-6 md:mt-12">
				<span className="text-blue-500">Pokémon</span> Explorer
			</h1>
			<SearchBar />
			<CardContainer />
		</>
	);
}

export default App;
