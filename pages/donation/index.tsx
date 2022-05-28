import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const Donation = () => {
  return <h1>Donation</h1>
}
export default Donation

Donation.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
