import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import './App.css';

import * as Api from '../../utlils/Api';
import Login from '../Login/Login'
import TaskList from '../TaskList/TaskList';
import Sort from '../Sort/Sort';
import AddTask from '../AddTask/AddTask';
import Pagination from '../Pagination/Pagination';
import InfoPopup from '../InfoPopup/InfoPopup';
import EditPopup from '../EditPopup/EditPopup';

import { NUMBER_TASKS_ON_PAGE } from '../../utlils/constants';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [user, setUser] = React.useState('');
  const [tasks, setTasks] = React.useState([{ "id": 0, "username": "0", "email": "", "text": "", "status": 0, "image_path": "" }]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [getParams, setGetParams] = React.useState('&sort_field=username&sort_direction=asc');
  const [totalNumberOfTasks, setTotalNumberOfTasks] = React.useState(1);
  const [infoPopup, setInfoPopup] = React.useState({ isOpen: false, text: 'Тут что-то не так', error: false });

  React.useEffect(_ => {
    //Проверка срока давности и наличия токена ввиду отсутсвия способа проверки токена с сервера.
    if (!(localStorage.getItem('token')) || Number(localStorage.getItem('tokenDate')) - Date.now() > 24 * 60 * 60000) {
      setLoggedIn(false);
      localStorage.clear();
    } else {
      setLoggedIn(true);
      setUser(localStorage.getItem('userData'));
    }
  }, [])

  React.useEffect(_ => {
    Api.getTasks('&page=' + pageNumber + getParams)
      .then(res => {
        setTasks(res.message.tasks);
        setTotalNumberOfTasks(res.message.total_task_count);
      })
      .catch(err => {
        console.log(err);
      })
  }, [pageNumber, getParams, totalNumberOfTasks]);

  function submitSort(paramsOfRequest) {
    setGetParams(paramsOfRequest);
  }

  function handleAddTask(taskData) {
    Api.createTask(taskData)
      .then(res => {
        if (res.status === 'error') throw res;

        setInfoPopup({ isOpen: true, text: "Задача успешно добавлена" });
        setTotalNumberOfTasks(totalNumberOfTasks + 1);
      })
      .catch(err => {
        setInfoPopup({ isOpen: true, text: err.message.text, isError: true });
      })
  }

  function handleClosePopup() {
    setInfoPopup({ isOpen: false, text: '', isError: false });
  }

  function handleLogin(loginFormData) {
    Api.login(loginFormData)
      .then(res => {
        const userName = loginFormData.get('username');
        if (res.status === 'error') throw res;
        localStorage.setItem('token', res.message.token);
        localStorage.setItem('tokenDate', Date.now());
        localStorage.setItem('userData', userName);
        setLoggedIn(true);
        setUser(userName);
      })
      .catch(err => {
        setInfoPopup({ isOpen: true, text: errorText(err), isError: true });
      });
  }

  function handleChangeTask(elem) {
    console.log(elem)
  }

  function errorText(responce) {
    let text = [];
    if (!responce.message) return 'Неизвестная ошибка'

    for (const key in responce.message) {
      text.push(key + ': ' + responce.message[key])
    }
    console.log(text.join('\n'));
    return text.join('\n');
  }

  return (
    <div className="app">

      {loggedIn && <h2 >Добро пожаловать дорогой наш {user}!</h2>}

      {!loggedIn && <Login handleLogin={handleLogin} />}

      <Sort submitSort={submitSort} />
      <TaskList tasks={tasks} handleChangeTask={handleChangeTask} />
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalNumberElems={totalNumberOfTasks} elemsOnPage={NUMBER_TASKS_ON_PAGE} />
      <AddTask handleAddTask={handleAddTask} />

      {/* <Routes>
        <Route path='/' ></Route>
      </Routes> */}

      {infoPopup.isOpen && <InfoPopup
        text={infoPopup.text}
        handleClosePopup={handleClosePopup}
        isError={infoPopup.isError}
      />}

      <EditPopup/>
    </div>
  );
}

export default App;
