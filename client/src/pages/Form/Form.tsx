import React, { useState } from "react";
//Custom
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import formStyle from "./Form.module.css";

const Form = () => {
  const [formStep, setFormStep] = useState<number>(1);

  // to handle form previous step..

  const handleFormNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  // to handle form next step..

  const handleFormPrevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  return (
    <PageLayout>
      <CardLayout backgroun_color="white">
        {/* Step design */}

        <div className={formStyle.formStepContainer}>
          <div  className={ formStep >= 1 ? formStyle.stepCompleted :formStyle.firstStepCircle}>
            <h5>1</h5>
          </div>

          <div className={formStep >= 2 ? formStyle.stepCompleteddot : formStyle.circleDotBorderDesign}>

          </div>

          <div className={formStep >= 2 ? formStyle.stepCompleted :formStyle.firstStepCircle}>
            <h5>2</h5>
          </div>

          <div className={formStep >= 3 ? formStyle.stepCompleteddot :formStyle.circleDotBorderDesign}>

          </div>

          <div  className={formStep >= 3 ? formStyle.stepCompleted : formStyle.firstStepCircle}>
            <h5>3</h5>
          </div>


        </div>

        {/* User Info */}

        {formStep === 1 && (
          <div>
            <h4>Personal Information:</h4>
            <div style={{ width: "750px" }}>
              <label>Name:</label>

              <input type="text" className="form-control" />
            </div>

            <div style={{ width: "750px" }}>
              <label>Email:</label>

              <input type="text" className="form-control" />
            </div>
            <div style={{ width: "750px" }}>
              <label>Phone:</label>

              <input type="text" className="form-control" />
            </div>
          </div>
        )}

        {/* User Education */}

        {formStep === 2 && (
          <div>
            <h4>Education:</h4>

            <div style={{ width: "750px" }}>
              <label>Degree:</label>

              <input type="text" className="form-control" />
            </div>

            <div style={{ width: "750px" }}>
              <label>University:</label>

              <input type="text" className="form-control" />
            </div>
            <div style={{ width: "750px" }}>
              <label>Subject:</label>

              <input type="text" className="form-control" />
            </div>
          </div>
        )}

{formStep === 3 && (
          <div>
            <h4>Work Experience:</h4>

            <div style={{ width: "750px" }}>
              <label>Full time job:</label>

              <input type="text" className="form-control" />
            </div>

            <div style={{ width: "750px" }}>
              <label>Project:</label>

              <input type="text" className="form-control" />
            </div>
          
          </div>
        )}


        <div
          style={{ margin: "15px", display: "flex", justifyContent: "left" }}
        >
          {formStep <= 1 ? null : (
            <button onClick={handleFormPrevStep} className="btn btn-success">
              Prev
            </button>
          )}

          {formStep === 3 ? (
            <button style={{ marginLeft: "15px" }} className="btn btn-success">
              Submit
            </button>
          ) : (
            <button
              onClick={handleFormNextStep}
              style={{ marginLeft: "15px" }}
              className="btn btn-info"
            >
              Next
            </button>
          )}
        </div>
      </CardLayout>
    </PageLayout>
  );
};

export default Form;
