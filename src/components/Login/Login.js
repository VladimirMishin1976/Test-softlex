import React from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Login.css';
import './InputSignUp.css';

function Login({ handleLogin }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const loginFormData = new FormData(e.target);
    handleLogin(loginFormData);
    resetForm();
  }


  return (
    <section className='login' >

      <h2 className='login__title'>Авторизация</h2>
      <form className='login__form' onSubmit={handleSubmit}>
        <label className='input-signup'>Логин
          <input className='input-signup__input'
            name='username'
            type='text'
            value={values.username || ''}
            required
            autoComplete='off'
            onChange={handleChange} />
          <span className='input-signup__error'>{errors.email}</span>
        </label>

        <label className='input-signup'>Пароль
          <input className='input-signup__input'
            autoComplete='off'
            name='password'
            type='password'
            value={values.password || ''}
            required
            minLength='3'
            onChange={handleChange} />
          <span className='input-signup__error'>{errors.password}</span>
        </label>
        <button className={`button ${!isValid && 'button_disabled'}`}
          disabled={!isValid}>Войти</button>
      </form>
    </section >
  );
}

export default Login;