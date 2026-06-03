import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/user/login`,{
      email,
      password,
    });                                    
  return response.data;
  
};
const register = async (body) => {
    
const {data} = await axios.post( `${API_URL}/user/register`,
    body)
  
  return data;
}

const adminLogin = async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/admin/login`,{
      email,
      password,
    });                                    
  return response.data;
  
};

export {login , register, adminLogin }
