// import { createContext, useState } from "react";

// export const configContext = createContext();

// const ConfigContextProvider = ({ children }) => {
//     const [config, setConfig] = useState({});      
//     const [details, setDetails] = useState("");    
           
           
//     return (
//       <configContext.Provider value={{ config, setConfig, details, setDetails }}>
//         {children}
//       </configContext.Provider>
//     );
// };
  
//   export default ConfigContextProvider;  



import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // install this package if not done

export const configContext = createContext();

const ConfigContextProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // this gives you { name, email, role, _id, etc. }
        setDetails(decoded); // ✅ Set user details in context
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return (
    <configContext.Provider value={{ config, setConfig, details, setDetails }}>
      {children}
    </configContext.Provider>
  );
};

export default ConfigContextProvider;
