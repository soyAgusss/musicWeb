import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/validationSchema';
import { toast } from 'react-toastify';
import Input from './Input';
import bcrypt from 'bcryptjs';

function RegisterForm({ onRegister }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {

      const {confirmPassword, ...userData} = data

      // Guardar en LocalStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Verificar si el usuario ya existe
      if(users.find(u => u.email === userData.email)) {
        toast.error("El usuario ya existe")
        return
      }

      // Hashear contraseña (encriptar)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      console.log(hashedPassword);
  

      // Crear usuario con la contraseña hasheada
      const userToSave = {
        ...userData,
        password: hashedPassword
      }

      users.push(userToSave);
      localStorage.setItem('users', JSON.stringify(users));
      /* localStorage.setItem('user', JSON.stringify(userData)); */
      const userWithoutHash = {...userData, password: undefined}
      localStorage.setItem('user', JSON.stringify(userWithoutHash));

      onRegister(userToSave);
      toast.success('Registro exitoso :)')

    } catch (error) {
      console.log(error);
      toast.error('Error en el registo :(')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Usuario"
        type="text"
        name="username"
        placeholder="Tu usuario"
        register={register}
        error={errors.username}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="tu@email.com"
        register={register}
        error={errors.email}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••"
        register={register}
        error={errors.password}
      />
      <Input
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        placeholder="••••••"
        register={register}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white text-shadow-neutral-950
        bg-gradient-to-r from-cyan-400 to-green-600
        hover:bg-gradient-to-r hover:from-cyan-300 hover:to-green-500
        hover:focus:outline-none focus:ring-1 disabled:opacity-50"
      >
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}

export default RegisterForm