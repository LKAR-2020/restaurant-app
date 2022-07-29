import React from 'react';
import logo from '../img/logo.png';
import avatar from '../img/avatar.png';
import {motion} from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import { app } from "../Firebase.config";
// import { link } from "react-router-dom"
import {MdShoppingBasket} from 'react-icons/md'
import {useStateValue } from "../context/StateProvider"
import { actionType } from '../context/reducer';


const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider(); 
  const [{user}, dispatch] = useStateValue()
  const login = async() => {
     const {user: {refreshtoken, providerData}} = await signInWithPopup(firebaseAuth,provider)
     dispatch({
       type : actionType.SET_USER,
       user : providerData[0]
     })

  }
    return (
        <header className="fixe z-50 w-screen bg-slate-300 p-6 px-16 ">
          {/* desktop et tablette */}
          <div className=" hidden md:flex w-full h-full items-center justify-between ">
            <div className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-8 object-cover" />
                <p className="text-headingColor text-xl font-bold">Memé station</p>
            </div>
            <div className='flex items-center gap-8'>
                <ul className="flex items-center gap-8  ">
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Home</li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Menu</li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">About Us </li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Services</li>
                  <li className= " text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Connexion</li>
                </ul>
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
                </div>
            </div>
            
          </div>


        {/* mobile */}
          <div className="flex md:hidden w-full h-full bg-blue-600">

          </div>
        </header>
    );
};

export default Header;