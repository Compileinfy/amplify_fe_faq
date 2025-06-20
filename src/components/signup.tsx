

'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schema/signupSchema';
import type { FormData } from '@/schema/signupSchema';
import { Amplify } from 'aws-amplify';
import { signUp, confirmSignUp, signOut } from 'aws-amplify/auth';
import outputs from '../../amplify_outputs.json';
import { useState } from 'react';

// ----->Configure Amplify
Amplify.configure(outputs);

const Signup = () => {
  const router = useRouter();
  const [emailForOTP, setEmailForOTP] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  //----->Step 1: Handle SignUp
  const onSubmit = async (data: FormData) => {
    try {
      const { nextStep } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            given_name: data.firstname,
            family_name: data.lastname,
          },
        },
      });

      // ----> Prevent automatic login
      await signOut();

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        alert(`OTP sent to: ${nextStep.codeDeliveryDetails.destination}`);
        setEmailForOTP(data.email);
        setShowOTPInput(true); // show the OTP input
      } else {
        alert('Signup complete. Please log in.');
        router.push('/auth/login');
      }
    } catch (error: any) {
      alert(error.message || 'Signup failed');
    }
  };

  // ----> Step 2: Confirm OTP
  const handleConfirmOTP = async () => {
    try {
      const { nextStep } = await confirmSignUp({
        username: emailForOTP,
        confirmationCode,
      });

      if (nextStep.signUpStep === 'DONE') {
        alert('Signup confirmed! Please login.');
        router.push('/auth/login');
      }
    } catch (error: any) {
      alert(error.message || 'OTP confirmation failed');
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-20 p-6 rounded-xl border border-gray-300 shadow-md bg-white">
      {!showOTPInput ? (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Confirm your email</h2>
          <p className="text-sm text-gray-600">
            We sent a 6-digit code to your email. Enter it below to confirm your signup.
          </p>

          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleConfirmOTP}
            className="w-full mt-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Confirm OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
