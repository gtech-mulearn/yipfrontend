import React from 'react'
import './Dashboard.css'
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer'

function Dashboard() {
  return (
    <>
      <LeftDrawer/>
      <div className="dash-container"></div>
    </>
  )
}

export default Dashboard
