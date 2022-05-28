import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Support = () => {
  return <h1>Support</h1>
}
export default Support

Support.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
