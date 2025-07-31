import { createContext, useState } from "react";

export const configContext = createContext()

const ConfigContextProvider = ({ children }) => {
    const [config, setConfig] = useState({});      
    const [details, setDetails] = useState("");    
           
           
    return (
      <configContext.Provider value={{ config, setConfig, details, setDetails }}>
        {children}
      </configContext.Provider>
    );
};
  
  export default ConfigContextProvider;    