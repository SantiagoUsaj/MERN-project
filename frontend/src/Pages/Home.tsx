import { useEffect, useState } from "react";
import LoginModal from "../Components/LoginModal";
import Navbar from "../Components/NavBar";
import NotesPageLoggedInView from "../Components/NotesPageLoggedInView";
import NotesPageLoggedOut from "../Components/NotesPageLoggedOut";
import SignUpModal from "../Components/SignUpModal";
import type { User } from "../Models/User";
import * as NotesApi from "../services/notes_api";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <Navbar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => {
          setLoggedInUser(null);
        }}
      />

      <main className="bg-gray-100 min-h-screen flex flex-col items-center p-8 text-justify">
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOut />}
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </main>
    </>
  );
}
