import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import GoogleLoginButton from '../components/GoogleLoginButton';
function Login() {

  const navigate = useNavigate()

  const handleLogin = (userData) => {
    navigate('/home')
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
    <img src="https://wallpaperbat.com/img/812321-free-website-background-in-psd.jpg" alt="" className='absolute w-screen h-screen z-0 opacity-30' />
    <div className="max-w-md w-full space-y-8 z-1">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          O{' '}
          <Link
            to="/register"
            className="font-medium text-green-300 hover:text-green-400"
          >
            crea una cuenta nueva
          </Link>
        </p>
      </div>
      
      <LoginForm onLogin={handleLogin} />

      {/* Sección de login con Google */}
      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-gray-950 text-white'>O continua con</span>
          </div>
        </div>
        <div className='mt-6'>
          <GoogleLoginButton onLogin={handleLogin} />
        </div>
      </div>
    </div>
  </div>
)
}

export default Login