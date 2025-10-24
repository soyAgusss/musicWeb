import {useState} from 'react';
import {toast} from 'react-toastify';

function TaskItem({task, onDelete, onEdit}) {

    const [isDeleting, setIsDeleting] = useState(false);

    // Manejar el eliminado de la tarea
    const handleDelete = async () => {

        const ConfirmToast = ({ closeToast }) => (
    <div className="flex flex-col gap-2">
        <div>¿Estás seguro de que quieres eliminar esta tarea?</div>
        <div className="flex gap-2 mt-2">
            <button
                onClick={async (e) => {
                    e.stopPropagation();
                    closeToast?.();
                    setIsDeleting(true);
                    try {
                        await onDelete(task.id);
                        toast.success('Tarea eliminada exitosamente');
                    } catch (error) {
                        toast.error('Error al eliminar la tarea');
                    } finally {
                        setIsDeleting(false);
                    }
                }}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
                Confirmar
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    closeToast?.();
                }}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm"
            >
                Cancelar
            </button>
        </div>
    </div>
);

        toast.info(<ConfirmToast/>, {
            position: 'top-center',
            closeOnClick:false,
            closeButton:false,
            autoClose:false,
            draggable:false,
            pauseOnHover:false,
        });
    };

    // Formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day:'numeric'
        })
    }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {task.title}
        </h4>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 disabled:text-red-400 font-medium text-sm transition-colors duration-200"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {task.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(task.date)}
        </span>
        <span className="text-xs text-gray-400">
          ID: {task.id.slice(0, 8)}
        </span>
      </div>
    </div>
  )
}

export default TaskItem