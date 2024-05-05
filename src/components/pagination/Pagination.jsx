import PropTypes from 'prop-types';
import './pagination.css'; // Import CSS file for styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };
  const handleDbPrev = () => {
    onPageChange(currentPage - 2);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };
  const handleDbNext = () => {
    onPageChange(currentPage + 2);
  };

  const handleJump = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];

    const addPage = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        pages.push(
          <button
            key={pageNumber}
            onClick={() => handleJump(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        );
      }
    };

    addPage(currentPage - 2);
    addPage(currentPage - 1);
    pages.push(
      <button key={currentPage} className={`current-page ${currentPage === totalPages ? 'last-page' : ''}`}>
        {currentPage}
      </button>
    );
    addPage(currentPage + 1);
    addPage(currentPage + 2);

    return pages;
  };

  return (
    <div className="pagination-container">
          {currentPage > 2 && (
      <>
        <button onClick={handleDbPrev}>&lt;&lt;</button>
        <button onClick={handlePrev}>&lt;</button>
      </>
    )}
    {currentPage >= 2 && currentPage < 3 && (
      <>
        <button onClick={handlePrev}>&lt;</button>
      </>
    )}
    {renderPagination()}
    {currentPage < totalPages - 1 && (
      <>
        <button onClick={handleNext}>&gt;</button>
        <button onClick={handleDbNext}>&gt;&gt;</button>
      </>
    )}
    {currentPage >= totalPages - 1 && currentPage < totalPages && (
      <>
        <button onClick={handleNext}>&gt;</button>
      </>
    )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
