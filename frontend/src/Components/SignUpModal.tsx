import type { User } from "../Models/User";
import { useForm } from "react-hook-form";
import * as NotesApi from "../services/notes_api";
import { ConflictError } from "../Errors/http_errors";
import { useState } from "react";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotesApi.SignUpCredentials>();

  async function onSubmit(credentials: NotesApi.SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errorText && (
            <span className="text-red-500 text-sm mb-2">{errorText}</span>
          )}
          <label htmlFor="username" className="mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-2 mb-4 rounded"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm mb-2">
              {errors.username.message}
            </span>
          )}
          <label htmlFor="email" className="mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 mb-4 rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mb-2">
              {errors.email.message}
            </span>
          )}
          <label htmlFor="password" className="mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 mb-4 rounded"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors mb-4"
            disabled={isSubmitting}
          >
            Sign Up
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors"
            onClick={onDismiss}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
