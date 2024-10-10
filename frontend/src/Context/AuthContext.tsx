// import { ReactNode, createContext, useContext, useEffect, useState } from "react";
// import { checkAuthStatus, loginUser, logoutUser } from "../helpers/api-communicator";
// type User ={
//     username:string;
//     rollnumber:string;
// };
// type UserAuth = {
//     isLoggedIn: boolean;
//     user: User | null;
//     login: (username: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
// };

// const AuthContext = createContext<UserAuth|null>(null);



// export const AuthProvider = ({children}:{children:ReactNode})=>{
//     const [user,setUser] = useState<User|null>(null);
//     const [isLoggedIn,setIsLoggedIn] = useState(false);

//     useEffect(()=>{
//         //fetch if the user's cookies are valid then skip login
//         async function checkStatus() {
//             const data = await checkAuthStatus();
//             if(data){
//                 setUser({rollnumber:data.rollnumber, name:data.name});
//                 setIsLoggedIn(true);
//             }
//         }
//     checkStatus();
//     },[]);
//     const login = async (rollnumber:string, password:string)=>{
//         const data = await loginUser(rollnumber,password);
//         if(data){
//             setUser({rollnumber:data.rollnumber, name:data.name});
//             setIsLoggedIn(true);
//         }
//     };
//     const logout = async ()=>{

//         await logoutUser();
//         setUser(null);
//         setIsLoggedIn(false);
//         window.location.reload();
//     };

//     const value = {
//         user,isLoggedIn,login,logout,
//     };
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// };



// export const useAuth = () => useContext(AuthContext);