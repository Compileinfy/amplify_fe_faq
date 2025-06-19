'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schema/signupSchema';
import type { FormData } from '@/schema/signupSchema';

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

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
            {...register('firstname')}
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
            {...register('lastname')}
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
            {...register('email')}
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
            {...register('password')}
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
