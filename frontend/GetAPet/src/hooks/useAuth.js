import api from "../utils/api";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  //nessa funcao estou retornanda true ou false pois nao consigo usar hooks do react router pelo fato de meu componente nao fazer parte do Routes
  async function register(user) {
    let msgText = "Cadastro Realizado com sucesso";
    let msgType = "sucess";
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });
      await authUser(data);
      return true;
    } catch (error) {
      console.log(error);
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
    return false;
  }

  function logout() {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "sucess";
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText = "login realizado com sucesso";
    let msgType = "sucess";
    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
  }

  return { register, authenticated, logout, login};
}
