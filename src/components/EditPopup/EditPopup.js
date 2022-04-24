import React from "react";
import "./EditPopup.css";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function EditPopup({ task, handleClosePopup, handleEditTask }) {
  const {text, status, id} = task;
   
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation();

  React.useEffect((_) => {
    setValues({ text: text, status: status });
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleEscape(e) {
    if (e.key === "Escape") handleClosePopup();
  }

  function onClosePopup() {
    handleClosePopup();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const editData = new FormData(e.target);
    handleEditTask({editData, id});
    // resetForm();
  }

  return (
    <div className="edit-popup" onClick={onClosePopup}>
      <div
        className="edit-popup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="edit-popup__form" onSubmit={handleSubmit}>
          <label>
            <h3>Редактировать задачу</h3>
            <input
              className="edit-popup__input-text"
              autoFocus
              name="text"
              type="text"
              required
              minLength={2}
              maxLength={40}
              value={values.text || ""}
              onChange={handleChange}
            />
          </label>

          <h3>Изменить статус задачи</h3>
          <div>
            <input type="radio" id="done" name="status" value={11} />
            <label htmlFor="done">Задача выполнена</label>
          </div>
          <div>
            <input
              type="radio"
              id="notDone"
              name="status"
              value={1}
              defaultChecked
            />
            <label htmlFor="notDone">Задача не выполнена</label>
          </div>

          <button
            className="edit-popup__submit"
            type="submit"
            title="Не тормози, измени"
          >
            Изменить
          </button>
        </form>
        <button
          className="edit-popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClosePopup}
        ></button>
      </div>
    </div>
  );
}

export default EditPopup;
