import { HiChevronLeft,HiChevronRight,HiChevronDoubleLeft,HiChevronDoubleRight } from 'react-icons/hi';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = getPages(currentPage, totalPages);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <button
        aria-label='first-page'
        onClick={() => goToPage(1)}
        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
        disabled={currentPage === 1}
      >
        <HiChevronDoubleLeft size={20} />
      </button>

      <button
        aria-label='previous-page'
        onClick={() => goToPage(currentPage - 1)}
        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
        disabled={currentPage === 1}
      >
        <HiChevronLeft size={20} />
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-1 text-gray-500">...</span>
        ) : (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded-lg text-sm transition 
              ${page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-800 hover:bg-gray-200'}`}
          >
            {page}
          </button>
        )
      )}

      <button
       aria-label='next-page'
        onClick={() => goToPage(currentPage + 1)}
        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
        disabled={currentPage === totalPages}
      >
        <HiChevronRight size={20} />
      </button>

      <button
       aria-label='last-page'
        onClick={() => goToPage(totalPages)}
        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
        disabled={currentPage === totalPages}
      >
        <HiChevronDoubleRight size={20} />
      </button>
    </div>
  );
}

function getPages(current, total) {
  const delta = 2;
  const range = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }

  if (current - delta > 2) {
    range.unshift('...');
  }
  if (current + delta < total - 1) {
    range.push('...');
  }

  range.unshift(1);
  if (total > 1) range.push(total);

  return range;
}
