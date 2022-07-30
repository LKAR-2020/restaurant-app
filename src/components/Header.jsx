import React, {useState} from 'react';
import logo from '../img/logo.png';
import avatar from '../img/avatar.png';
import {motion} from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import { app } from "../Firebase.config";
import { NavLink } from "react-router-dom"
import {MdShoppingBasket, MdAddShoppingCart, MdLogout} from 'react-icons/md'
import {useStateValue } from "../context/StateProvider"
import { actionType } from '../context/reducer';


const Header = () => {
// connexion des utilisateur avec firebase
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider(); 
  const [{user}, dispatch] = useStateValue();
 
  const [isMenu, setIsMenu] = useState(false)

  const login = async() => {
    // connexion d'un utilusateur
    if (!user){
      const {user: {refreshtoken, providerData}} = await signInWithPopup(firebaseAuth,provider)
      dispatch({
        type : actionType.SET_USER,
        user : providerData[0]
      });
     //  maintenir la connection
     localStorage.setItem("user", JSON.stringify(providerData[0]));
     }else{
       setIsMenu(!isMenu);
     }
     
  };
  const logout = () =>{
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });

  };
    return (
        <header className="fixe z-50 w-screen bg-slate-300 p-3 px-4 md:p-6 md:px-16 ">
          {/* desktop et tablette */}
          <div className=" hidden md:flex w-full h-full items-center justify-between ">
            <NavLink to={"/"} className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-8 object-cover" />
                <p className="text-headingColor text-xl font-bold">Memé station</p>
            </NavLink>
            <div className='flex items-center gap-8'>
                <motion.ul 
                initial={{opacity : 0, x :200 }}
                animate={{opacity : 1, x :0 }}
                exit={{opacity : 0, x :200 }}
                className="flex items-center gap-8  ">
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Home</li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Menu</li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">About Us </li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Services</li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Connexion</li>
                </motion.ul>
                <div className="relative flex items-center justify-center">
                <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer " />
                <div className=" absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cardNumBg flex items-center justify-center ">
                  <p className=' text-sm text-white font-semibold'>2</p>
                </div>
                </div>
                


                <div className="relative">
                <motion.img whileTap= {{scale: 0.6 }}
                  src={user ? user.photoURL : avatar} 
                  alt="userProfils " 
                  className='w-10 h-10 min-h-[40px] min-w-[40px] rounded-full cursor-pointer' 
                  onClick= { login }
                  />
                  {
                    isMenu && (
                      <motion.div 
                      initial={{ opacity : 0 , scale: 0.6}}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className=" w-40 rounded-lg flex bg-primary shadow-xl flex-col absolute top-12 right-3 ">
                    {
                      user && user.email === "alexisrichmond7@gmail.com" && (
                        <NavLink to = {"/CreateItems"} >
                        <p className="flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base ">Article <MdAddShoppingCart /> </p>
                        </NavLink>
                      )
                    }
                    
                    <p 
                    onClick = { logout }
                    className="flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base ">Deconnexion <MdLogout/> </p>
                    
                  </motion.div>
                    )
                  }
                </div>
            </div>
            
          </div>


        {/* mobile */}
          <div className="flex items-center justify-between  md:hidden w-full h-full">
          <NavLink to={"/"} className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-8 object-cover" />
                <p className="text-headingColor text-xl font-bold">Memé station</p>
            </NavLink>
            <div className="relative">
                <motion.img whileTap= {{scale: 0.6 }}
                  src={user ? user.photoURL : avatar} 
                  alt="userProfils " 
                  className='w-10 h-10 min-h-[40px] min-w-[40px] rounded-full cursor-pointer' 
                  onClick= { login }
                  />
                  {
                    isMenu && (
                      <motion.div 
                      initial={{ opacity : 0 , scale: 0.6}}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className=" w-40 rounded-lg flex bg-primary shadow-xl flex-col absolute top-12 right-3 ">
                    {
                      user && user.email === "alexisrichmond7@gmail.com" && (
                        <NavLink to = {"/CreateItems"} >
                        <p className="flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base ">Article <MdAddShoppingCart /> </p>
                        </NavLink>
                      )
                    }
                    <ul
                className="flex flex-col    ">
                  <li className= " text-base px-4 py-2 text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer ">Home</li>
                  <li className= " text-base px-4 py-2 text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer ">Menu</li>
                  <li className= " text-base px-4 py-2 text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer ">About Us </li>
                  <li className= " text-base px-4 py-2 text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer ">Services</li>
                  <li className= " text-base px-4 py-2 text-textColor hover:text-headingColor hover:bg-slate-200 duration-100 transition-all ease-in-out cursor-pointer ">Connexion</li>
                </ul>
                    <p
                    onClick={ logout } 
                    className="flex items-center m-2 p-2 shadow-lg rounded-lg gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor justify-center bg-slate-100 text-base ">Deconnexion <MdLogout/> </p>
                    
                  </motion.div>
                    )
                  }
                </div>
          </div>
        </header>
    );
};

export default Header;