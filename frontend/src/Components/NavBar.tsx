import type { User } from "../Models/User";
import * as NotesApi from "../services/notes_api";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

export default function Navbar({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <header className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="space-x-6 md:block">
          <a href="/" className="text-lg font-semibold text-gray-800">
            Home
          </a>
          {loggedInUser ? (
            <>
              <span className="text-gray-800">
                Welcome, {loggedInUser.username}!
              </span>
              <button
                onClick={logout}
                className="text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSignUpClicked}
                className="text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                Sign Up
              </button>
              <button
                onClick={onLoginClicked}
                className="text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
