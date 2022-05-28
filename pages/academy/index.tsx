import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Academy = () => {
  return <h1>Academy</h1>
}
export default Academy

Academy.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
