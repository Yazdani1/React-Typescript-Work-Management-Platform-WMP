import { ReactNode, FC, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import NavbarMobileView from "../components/Sidebar/NavbarMobileView";

interface IPropsPageLayout {
  children: ReactNode;
}
const PageLayout: FC<IPropsPageLayout> = ({ children }) => {
  const [expandSidebar, setExpandSidebar] = useState<boolean>(true);

  const handleExpandClick = () => {
    setExpandSidebar(!expandSidebar);
  };

  return (
    <div className="container-fluid">
      <NavbarMobileView />

      <div className="row">
        <div className={expandSidebar ? "col-xl-2" : "col-xl-1"}>
          <Sidebar
            expandSidebar={expandSidebar}
            handleExpandClick={handleExpandClick}
          />
        </div>
        <div className={expandSidebar ? "col-xl-10" : "col-xl-11"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
