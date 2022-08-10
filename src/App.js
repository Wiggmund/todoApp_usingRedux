import './App.css';

import {Header} from './components/header/Header';
import {TodoList} from './components/todoList/TodoList';


function App() {
  return (
		<div className='content'>
			<Header />
			<TodoList />
		</div>
  );
}

export default App;
