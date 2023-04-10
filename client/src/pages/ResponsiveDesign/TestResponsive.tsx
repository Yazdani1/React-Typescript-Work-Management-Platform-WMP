import React from "react";
import PageLayout from "../../Pagelayout/PageLayout";
import MobileTest from "./MobileTest";
import WebTest from "./WebTest";

const TestResponsive = () => {
  
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 720;
  
    React.useEffect(() => {
      /* Inside of a "useEffect" hook add an event listener that updates
         the "width" state variable when the window size changes */
      window.addEventListener("resize", () => setWidth(window.innerWidth));
  
      /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
    }, []);

  return (
    <PageLayout>
      <div>TestResponsive</div>

      {width < breakpoint ? <MobileTest /> : <WebTest />}
    </PageLayout>
  );
};

export default TestResponsive;
