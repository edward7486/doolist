import React from 'react'
import Nav from './Nav.js'
import { Outlet } from 'react-router-dom'

const AppLayer = () => {
  return (
    <>
      <Nav />
      <main className="max-w-3xl px-2 sm:px-6 lg:px-8 m-auto">
        <Outlet />
      </main>     
    </>
  )
}

export default AppLayer