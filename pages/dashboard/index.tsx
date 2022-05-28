import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Dashboard = () => {
  return <h1>Dashboard</h1>
}
export default Dashboard

Dashboard.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
