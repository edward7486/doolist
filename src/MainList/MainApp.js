import React from 'react'
import Title from './Title'
import Form from './Form.js'
import List from './List.js'
import Completed from './Completed.js'
import EditProject from '../EditProject.js'
import { Outlet } from 'react-router-dom'

const MainApp = () => {
  return (
    <>
      <Title />
      <Form />
      <List />
      <Completed />
      <EditProject title={'Project Settings'}/>
      <Outlet />
    </>
  )
}

export default MainApp