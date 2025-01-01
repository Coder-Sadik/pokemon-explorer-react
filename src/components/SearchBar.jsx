/* eslint-disable react/prop-types */

const SearchBar = ({ onSearch, searchValue, clearInput }) => {
	const handleInputChange = (event) => {
		const value = event.target.value.trim().toLowerCase();
		onSearch(value);
	};

	return (
		<div className="flex justify-center items-center my-12 mx-12 md:mx-0">
			<input
				type="text"
				value={searchValue}
				placeholder="Search Pokémon"
				className="w-full md:w-1/3 border-b-4 border-gray-300 focus:border-yellow-500 text-gray-700 focus:text-yellow-500 focus:outline-none focus:ring-0 placeholder-gray-400 text-lg font-bold tracking-wider"
				onChange={(event) => handleInputChange(event)}
			/>
			{searchValue && (
				<button
					onClick={clearInput}
					className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default SearchBar;
