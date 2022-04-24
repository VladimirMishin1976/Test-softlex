import React from "react";
import './TaskList.css';

function TaskList({ tasks, handleOpenEditTask }) {

  const changeTask = (task) => {
    handleOpenEditTask(task);
  }

  return (
    <section className="task-list">
      <h3>Выберите задачу для редактирования</h3>
      <table className="task-list__table">
        <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>E-mail</th>
            <th>Текст задачи</th>
            <th>Cтатус задачи</th>
          </tr>
        </thead>

        <tbody>
          {
            tasks.map(task => {
              return (
                <tr key={task.id} onClick={() => changeTask(task)} title='Кликните для редактирования' >
                  <td>{task.username}</td>
                  <td>{task.email}</td>
                  <td>{task.text}</td>
                  <td>{task.status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table >
      <h3>Расшифровка статуса</h3>
      <p>0 - задача не выполнена</p>
      <p>1 - задача не выполнена, отредактирована админом</p>
      <p>10 - задача выполнена</p>
      <p>11 - задача отредактирована админом и выполнена</p>
    </section>
  );
}

export default TaskList;
