import React from 'react';
import './InfoPopup.css';

function InfoPopup({ text, handleClosePopup, isError }) {

  return (
    <div className='popup' onClick={handleClosePopup}>
      <div className='popup__container'>
        <pre className={`popup__title ${isError && 'error'}`}>{text || 'Что-то пошло не так. Иформация об ошибке не получена.'}</pre>
        <button className='popup__close' type="button" aria-label="Закрыть" onClick={handleClosePopup}></button>
      </div>
    </div >
  )
}

export default InfoPopup;   