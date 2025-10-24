import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Email inválido."),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
});

export const registerSchema = z.object({
    username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres.'),
    email: z.string().email("Email inválido."),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
});

export const taskSchema = z.object({
    title: z.string().min(5, 'El título es requerido').max(80, 'El título no puede tener más de 80 caracteres.'),
    description: z.string().min(1, 'La descripción es requerida').max(500, 'La descripción no puede tener más de 500 caracteres.'),
    date: z.string().min(1, 'La fecha es requerida')
})