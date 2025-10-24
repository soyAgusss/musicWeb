import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const isAuthenticated = Boolean(localStorage.getItem('user'))

  return (
    <Router>
      <div className='App'>
        <Routes>

          <Route
          path='/login'
          element={isAuthenticated ? <Navigate to="/home/" replace/> : <Login/>} 
          />

          <Route
          path='/register'
          element={isAuthenticated ? <Navigate to="/home/" replace/> : <Register/>} 
          />

          <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          } 
          />

          <Route
          path='/'
          element={<Navigate to="/login" replace/>}
          />

        </Routes>

        <ToastContainer position='bottom-right'/>

      </div>
    </Router>
  )
}

export default App
