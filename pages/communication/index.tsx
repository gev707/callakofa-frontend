import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Comunication = () => {
  return <h1>Comunication</h1>
}
export default Comunication

Comunication.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
