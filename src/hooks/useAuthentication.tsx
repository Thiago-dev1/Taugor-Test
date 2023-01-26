import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";
import { useState, useEffect } from "react"


interface Login {
    email: string,
    password: string
}

interface Register extends Login {
  name: string
}

export const useAuthentication = () => {
  const [error, setError] = useState<string | null | boolean>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data: Register) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      return user;
    } catch (error) {
        // @ts-ignore
      console.log(error.message)
      // @ts-ignore
      console.log(typeof error.message)

      let systemErrorMessage;
        // @ts-ignore
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        // @ts-ignore
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      console.log('aqui')
      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data: Login) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
    //   console.log(error.message);
    //   console.log(typeof error.message);
    //   console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      // @ts-ignore
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
        // @ts-ignore
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }
      
      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    error,
    createUser,
    logout,
    login,
    loading,
  };
};
