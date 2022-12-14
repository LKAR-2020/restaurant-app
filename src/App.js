import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import {AnimatePresence} from 'framer-motion'
import { MainContainer, CreateContainer } from './components'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter >
    <div className=" w-screen h-auto flex flex-col bg-primary ">
        <Header/> 

      <main className="mt-28 p-8 w-full ">
            <Routes>
               <Route path="/*" element={<MainContainer />} />
               <Route path="/createItems" element={<CreateContainer />} />
            </Routes>
      </main>
    </div>
    </AnimatePresence>
  )
}

export default App