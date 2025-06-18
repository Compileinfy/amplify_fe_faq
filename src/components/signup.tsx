'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const Signup = () => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(
    {
         mode: "onChange",
    }
  );
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] mx-auto mt-20 p-6 rounded-xl border border-gray-300 shadow-md bg-white"
    >
      <div className="flex border-b mb-4">
        <button
          type="button"
          onClick={() => router.push('/auth/login')}
          className="w-1/2 py-2 border-r border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          SignIn
        </button>
        <button
          type="button"
          className="w-1/2 py-2 text-black font-medium border-b-2 border-black"
        >
          SignUp
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Firstname</label>
          <input
            type="text"
            {...register('firstname', {
              required: 'Firstname is required',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Name must contain only letters',
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.firstname && (
            <span className="text-red-500 text-sm">{errors.firstname.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Lastname</label>
          <input
            type="text"
            {...register('lastname', {
              required: 'Lastname is required',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Name must contain only letters',
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.lastname && (
            <span className="text-red-500 text-sm">{errors.lastname.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  'Password must be at least 8 characters long and contain at least one letter and one number',
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Signup
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
