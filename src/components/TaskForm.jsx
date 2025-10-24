import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '../utils/validationSchema';
import Input from './Input';
import { toast } from 'react-toastify';

function TaskForm({onTaskSubmit, editingTask, onCancelEdit}) { /* Funciones crear, editar y cancelar edicion de las tareas */

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues:{
            title:'',
            description:'',
            date:''
        }
    });

    // Llenar el formulario if task
    useState(() => {
        if(editingTask) {
            setValue('title', editingTask.title);
            setValue('description', editingTask.description);
            setValue('date', editingTask.date);
        } else {
            reset();
        }
    }, {editingTask, setValue, reset});

    // Guardar la tarea
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await onTaskSubmit(data);
            reset();
            toast.success(editingTask ? 'Tarea actualizada exitosamente' : 'Tarea creada exitosamente');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la tarea');
        } finally {
            setIsSubmitting(false);
        }
    }

    // Manejar cuando el usuario cancela la edición de la tarea
    const handleCancel = () => {
        reset();
        if(onCancelEdit) {
            onCancelEdit();
        }
    }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Título"
          name="title"
          register={register}
          error={errors.title}
          placeholder="Ingresa el título de la tarea"
        />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={3}
            placeholder="Describe la tarea..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <Input
          label="Fecha"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {isSubmitting ? 'Guardando...' : (editingTask ? 'Actualizar' : 'Crear')}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm