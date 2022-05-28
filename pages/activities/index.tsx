import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Activities = () => {
  return <h1>Activities</h1>
}
export default Activities

Activities.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
