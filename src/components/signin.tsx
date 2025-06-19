'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

const Signin = () => {
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
          className="w-1/2 py-2 text-black font-medium border-b-2 border-black"
        >
          SignIn
        </button>
        <button
          type="button"
          onClick={() => router.push('/auth/sign-up')}
          className="w-1/2 py-2 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          SignUp
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
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
            {...register('password', { required: 'Password is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signin;

