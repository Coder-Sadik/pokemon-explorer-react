function Pagination({ currentPage, onPageChange }) {
	return (
		<div className="flex justify-center mt-5 gap-4 mb-4">
			<button
				className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				Previous
			</button>
			<p className="px-4 py-2 font-semibold">Page {currentPage}</p>
			<button
				className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next
			</button>
		</div>
	);
}

export default Pagination;
