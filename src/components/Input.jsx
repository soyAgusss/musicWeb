function Input({label, type = 'text', error, register, name, placeholder}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white">{label}
      </label>
      <input
      {...register(name)}
      type={type}
      id={name}
      placeholder={placeholder}
      className="mt-1 w-full block bg-gray-900 px-3 py-2 text-white border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red:500"
      />
      {
        error && (
        <p className='mt-1 text-sm text-red-500'>{error.message}</p>
        )
      }
    </div>
  )
}

export default Input