import React from "react";
import CardLayout from "../../components/CardLayout";
import mobileTestStyle from "./MobileTest.module.css";

const MobileTest = () => {
  return (
    <>
      <CardLayout backgroun_color="red">
        <div className={mobileTestStyle.mobileCardContainer}>
          <h4>Mobile Design for this project</h4>
        </div>
      </CardLayout>
      <CardLayout backgroun_color="red">
        <div>
          <h4>Mobile Design for this project</h4>
        </div>
      </CardLayout>
      <CardLayout backgroun_color="red">
        <div>
          <h4>Mobile Design for this project</h4>
        </div>
      </CardLayout>
    </>
  );
};

export default MobileTest;
