import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { API } from "../configs/api";
import { STORAGE_USERID_KEY } from "../utils/userIdAuthKey";
import { showToast } from "../components/Toastify/toast";

export type SignInTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  name: string;
  email: string;
  password: string;
};

type AuthContextTypes = {
  signIn: (data: SignInTypes) => Promise<boolean | void>;
  signUp: (data: SignUpTypes) => Promise<boolean | void>;
  signOut: () => void;
  authUserID: string;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authUserID, setAuthUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({ email, password }: SignInTypes) {
    if (!email || !password)
      throw showToast("Por favor informar email e senha", "info");

    setIsLoading(true);

    return API.post("/login", { email, password })
      .then((response) => {
        const userID = response.data.id;
        setAuthUserID(userID);

        localStorage.setItem(STORAGE_USERID_KEY, JSON.stringify(userID));

        return true;
      })
      .catch((error) => {
        console.error(error);
        showToast("Erro ao fazer login", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function signUp({ name, email, password }: SignUpTypes) {
    if (!name || !email || !password)
      throw showToast("Por favor informar nome, email e senha", "info");

    setIsLoading(true);

    return API.post("/user", { name, email, password })
      .then((response) => {
        if (response.status == 201) {
          showToast("Usuário cadastrado com sucesso!", "success");
        }

        return true;
      })
      .catch((error) => {
        console.error(error);
        showToast("Erro ao cadastrar usuário", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    setAuthUserID("");
    localStorage.removeItem(STORAGE_USERID_KEY);

    API.post("/logout").catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    const userIDStorage = localStorage.getItem(STORAGE_USERID_KEY);

    if (userIDStorage) {
      const userID = JSON.parse(userIDStorage);

      API.get(`/user`)
        .then((response) => {
          if (userID == response.data.id) {
            setAuthUserID(userID);
          } else {
            signOut();
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status == 401) signOut();
        });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, authUserID, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
