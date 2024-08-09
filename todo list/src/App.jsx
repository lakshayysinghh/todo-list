import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(todostring);
      setTodos(todos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    savetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    savetoLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    savetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    savetoLS();
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh]  md:w-1/2">
        <h1 className='font-bold text-center'>iTASK - Manage your todos at one place</h1>
        <div className="my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input 
            onChange={handleChange} 
            value={todo} 
            type="text" 
            className='w-full rounded-full py-2 px-2' 
          />
          <button 
            onClick={handleAdd} 
            disabled={todo.length <= 3} 
            className='bg-violet-800 hover:bg-violet-950 disabled:border-violet-800 p-3 py-1 text-sm font-bold text-white rounded-md mt-1'
          >
            Save
          </button>
        </div>
        <div className="my-2 flex items-center">
          <input className='my-4'
            type="checkbox" 
            checked={showFinished} 
            onChange={toggleFinished} 
          /> 
          <label className="ml-2">Show finished</label>
          <div className='h-[1px] bg-purple-950 rounded-lg'> </div>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.iscompleted) && (
              <div key={item.id} className="todo flex  my-3 justify-between">
                <div className='flex gap-5'>
                  <input 
                    name={item.id} 
                    onChange={handleCheckbox} 
                    type="checkbox" 
                    checked={item.iscompleted} 
                  />
                  <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button 
                    onClick={(e) => handleEdit(e, item.id)} 
                    className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)} 
                    className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'
                  >
                   <FaDeleteLeft />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
