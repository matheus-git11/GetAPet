import api from "../utils/api";

import { useState, useEffect } from "react";
import useFlashMessage from './useFlashMessage'


export default function useAuth() {
  const {setFlashMessage} = useFlashMessage()
    
  async function register(user) {
    let msgText = 'Cadastro Realizado com sucesso'
    let msgType = 'sucess'
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;      
      });
      console.log(data);
    } catch (error) {
      console.log(error)
      msgText = error.response.data.message
      msgType = 'error'
      
  
    }
    setFlashMessage(msgText,msgType)
  }

  return { register };
}
