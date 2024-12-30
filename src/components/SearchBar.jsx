const SearchBar = () => {
	return (
		<>
			<div className="flex justify-center my-12 mx-12 md:mx-0">
				<input
					type="text"
					placeholder="Search Pokemon"
					className="w-full md:w-1/3 border-b-4 border-gray-300 focus:border-yellow-500 text-gray-700 focus:text-yellow-500 focus:outline-none focus:ring-0 placeholder-gray-400 text-lg font-bold tracking-wider"
				/>
			</div>
		</>
	);
};

export default SearchBar;
