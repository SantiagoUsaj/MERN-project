import type { User } from "../Models/User";
import { useForm } from "react-hook-form";
import * as NotesApi from "../services/notes_api";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotesApi.LoginCredentials>();

  async function onSubmit(credentials: NotesApi.LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Log In</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
            Log In
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

export default LoginModal;
