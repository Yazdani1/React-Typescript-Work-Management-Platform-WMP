import React from 'react'
import CardLayout from '../../components/CardLayout'
import webTestStyle from "./WebTest.module.css";

const WebTest = () => {
  return (
    <CardLayout>

      <div className={webTestStyle.webCardContainer}>
      <h4>This is a web view of our design</h4>

      </div>


    </CardLayout>
  )
}

export default WebTest