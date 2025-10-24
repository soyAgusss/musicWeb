import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import googleAuthService from '../services/googleAuth';
import '/src/home.css'

function Home() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || null);

  // Crear estados para manejar el crud de tareas
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Cargar tareas que existen en localStorage cuando se monta el componente
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTask);
  }, []);

  // Guardar tareaas en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Funciones propias del crud

  const handleTaskSubmit = (taskData) => {
    if(editingTask){
      // Actualizar la tarea existente
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id ? {...taskData, id:editingTask.id} : task
        )
      );
      setEditingTask(null);
    } else {
      // Crear una nueva tarea
      const newTask = {
        ...taskData,
        id:crypto.randomUUID(),
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    }
    setShowTaskForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTask => prevTask.filter(task => task.id !== taskId));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };



  const handleLogout = async () => {

    // Cerrar sesiones de Google
    if(user && user.provider === 'google'){
      await googleAuthService.logout();
    }

    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen darkerGrayBackground">
      <header className='flex max-2-3x1 mx-auto h-15 px-5 bg-black items-center justify-between'>

        <div className='flex text-white items-center gap-3'>
          <div>
            <button className='text-sm px-5 py-1 font-semibold hover:text-green-300 transition-colors duration-300 ease-in-out cursor-pointer'>MUSIC</button>
          </div>
          <div>
            <button className='text-sm px-5 py-1 font-semibold hover:text-green-300 transition-colors duration-300 ease-in-out cursor-pointer'>ALBUMS</button>
          </div>
          <div>
            <button className='text-sm px-5 py-1 font-semibold hover:text-green-300 transition-colors duration-300 ease-in-out cursor-pointer'>ARTISTS</button>
          </div>
        </div>

        <div className='darkerGrayBackground h-9 flex rounded-lg items-center w-80 px-3'>
          <i class="fa-solid fa-magnifying-glass text-gray-300 pr-2 opacity-50"></i> 
          <input type="text"
          className='text-white text-sm focus:outline-none bg-transparent w-70'
          placeholder='Type here to search'/>
          <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                X
            </button>
        </div>

        <div className='flex ml-2 h-11 w-30 text-white items-center justify-between'>
          <div className='flex gap-5'>
            <button className='hover:text-green-300 transition-colors duration-300 ease-in-out cursor-pointer'>
              <i class="fa-solid fa-bell text-xl"></i>
            </button>
            <button className='hover:text-green-300 transition-colors duration-300 ease-in-out cursor-pointer'>
              <i class="fa-solid fa-gear text-xl"></i>
            </button>
          </div>

        <div className='grayBackground rounded-full px-1 py-1 h-11 w-11'>
          <img src="https://i.pinimg.com/474x/27/5f/99/275f99923b080b18e7b474ed6155a17f.jpg?nii=t" alt=""
          className='relative w-9 rounded-full'/>
        </div>

        </div>

      </header>

      <div className="max-w-5xl mx-auto bg-black pt-5">
        <div className="bg-black shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-6">
              <p className="text-1xl text-white">
                Trending New hits
              </p>
            </div>
            <div className="px-10 pt-6">
              <h1 className="text-5xl font-bold text-white mb-4">
                Song Title
              </h1>
              <div className="flex gap-10 pt-2 pb-5">
                <div>
                  <p className="text-lg font-light text-white">Artist name</p>
                </div>
                <div>
                  <p className="text-lg font-light text-gray-500">0 Plays</p>
                </div>
              </div>
              <div className='flex h-9 gap-3'>
                <button className='cursor-pointer w-25 bg-gradient-to-r from-cyan-400 to-green-600 text-sm text-black rounded-full '>Listen now</button>
                <button className='cursor-pointer w-9 outline-1 outline-white rounded-full'><i class="fa-solid fa-heart text-white"></i></button>
              </div>
            </div>

            {/* Sección de Artistas */}
            <div className="px-10 pt-3 mt-10 border-gray-200">
              <div className="darkerGrayBackground px-5 py-3 flex justify-between items-center rounded-t-lg">
                <p className="text-xl font-normal text-white">
                  Top artists
                </p>
                <button className="text-gray-300 font-normal cursor-pointer">
                  See all
                </button>

                
              </div>
              <div className='darkerGrayBackground flex justify-between px-10 py-2 pb-4 rounded-b-lg'>
                  <div className='bg-red-300 text-white justify-center max-w-25'>
                    <img src="https://tse4.mm.bing.net/th/id/OIP.5MbRF-KZ9jCLuuFBXU28WQHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" alt=""
                    className='text-center rounded-full w-25 shadow'/>
                    <p className='pt-1 text-center'>Bruno Mars</p>
                  </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home