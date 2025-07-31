import axios from "axios";

const login = async ({ email, password }) => {
    const response = await axios.post("http://localhost:5000/user/login",{
      email,
      password,
    });                                    
  return response.data;
  
};
const register = async (body) => {
    
const {data} = await axios.post( "http://localhost:5000/user/register",
    body)
  
  return data;
}

export {login , register }