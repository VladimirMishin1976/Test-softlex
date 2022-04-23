import React from "react";
import './Sort.css';

function Sort({ submitSort }) {

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let output = '';
    for (const entry of data) {
      output += '&' + entry[0] + '=' + entry[1];
    }
    submitSort(output);// в виде параметров запроса.
  }


  return (
    <form className="sort" onSubmit={handleSubmit} name="sort">
      <h2>Выберите поле, по которому выполняется сортировка</h2>
        <input type="radio" id="nameSort1" name="sort_field" value="username" defaultChecked />
        <label htmlFor="nameSort1" >Имя пользователя</label>

        <input type="radio" id="nameSort2" name="sort_field" value="email" />
        <label htmlFor="nameSort2" lang="en">Email</label>

        <input type="radio" id="nameSort3" name="sort_field" value="status" />
        <label htmlFor="nameSort3">Статус</label>

      <h2>Выберите направление сортировки</h2>
        <input type="radio" id="directUp" name="sort_direction" value="asc" defaultChecked />
        <label htmlFor="directUp" >По увеличению</label>

        <input type="radio" id="directDown" name="sort_direction" value="desc" />
        <label htmlFor="directDown">По уменьшению</label>
      <button type="submit" lang="en" >Сортировать</button>
    </form>
  )
}

export default Sort;
