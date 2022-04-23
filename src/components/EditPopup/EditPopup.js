import React from "react";
import "./EditPopup.css";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function EditPopup() {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  return (
    <div className="edit-popup">
      <div className="edit-popup__container">
        <form>
          <label>
            <input
              name="text"
              type="text"
              required
              value={"sadfs"}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              name="text"
              type="text"
              required
              value={"sadfs"}
              onChange={handleChange}
            />
          </label>
          <button type="submit" title="Не тормози, измени">Изменить</button>
        </form>
        {/* <button className='popup__close' type="button" aria-label="Закрыть" onClick={handleClosePopup}></button> */}
      </div>
    </div>
  );
}

export default EditPopup;
