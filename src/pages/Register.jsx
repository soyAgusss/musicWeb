import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

function Register() {

  const navigate = useNavigate()

  const handleRegister = (userData) => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <img src="https://wallpaperbat.com/img/812321-free-website-background-in-psd.jpg" alt="" className='absolute w-screen h-screen z-0 opacity-30' />
      <div className="max-w-md w-full space-y-8 z-1">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            O{' '}
            <Link
              to="/login"
              className="font-medium text-green-300 hover:text-green-400"
            >
              inicia sesión en tu cuenta
            </Link>
          </p>
        </div>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  )
}

export default Register