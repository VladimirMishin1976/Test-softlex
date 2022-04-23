import React from "react";
import './Pagination.css';

function Pagination({ pageNumber, setPageNumber, totalNumberElems, elemsOnPage }) {
  const totalNumberOfPage = Math.ceil(totalNumberElems / elemsOnPage)

  function toStart() {
    setPageNumber(1);
  }

  function toBack() {
    if (pageNumber > 0) setPageNumber(pageNumber - 1);
  }

  function toForward() {
    if (pageNumber < totalNumberOfPage) setPageNumber(pageNumber + 1);
  }

  function toEnd() {
    setPageNumber(totalNumberOfPage);
  }

  return (
    <ul className="pagination">
      <li className={`pagination__tostart ${pageNumber === 1 && 'inactive'}`} onClick={toStart}>Начало</li>
      <li className={`pagination__toback ${pageNumber === 1 && 'inactive'}`} onClick={toBack}>Назад</li>
      <li className="pagination__current">{pageNumber}</li>
      <li className={`pagination__toforward ${pageNumber === totalNumberOfPage && 'inactive'}`} onClick={toForward}>Вперед</li>
      <li className={`pagination__toend ${pageNumber === totalNumberOfPage && 'inactive'}`} onClick={toEnd}>{totalNumberOfPage}</li>
    </ul>
  )
}

export default Pagination;