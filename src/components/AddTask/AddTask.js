import React from "react";
import './AddTask.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function AddTask({ handleAddTask }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const taskData = new FormData(e.target);
    handleAddTask(taskData);
    resetForm();
  }

  return (
    <>
      <h2>Добавить задачу</h2>
      <form className="add-task" onSubmit={handleSubmit} noValidate>
        <label>
          <input
            placeholder="Введите имя пользователя"
            type='text'
            name='username'
            value={values.username || ''}
            onChange={handleChange}
            minLength={2}
            maxLength={40}
            required
          />
          <span className="input-error">{errors.username}</span>
        </label>

        <label>
          <input
            placeholder="Введите E-mail"
            type='email'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            required
            maxLength={40}
          />
          <span className="input-error">{errors.email}</span>
        </label>

        <label>
          <input
            placeholder="Введите задачу"
            type='text'
            name='text'
            value={values.text || ''}
            onChange={handleChange}
            minLength={2}
            maxLength={500}
            required
          />
          <span className="input-error">{errors.text}</span>
        </label>
        <button type="submit" disabled={!isValid}>Отправить</button>
      </form>
    </>
  )
}

export default AddTask;
