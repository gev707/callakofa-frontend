import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Universe = () => {
  return <h1>Universe</h1>
}
export default Universe

Universe.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
