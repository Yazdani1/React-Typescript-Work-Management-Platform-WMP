import { FC } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import "./Sidebar.css";
import SidebarList from "./SidebarList";

interface SidebarProps {
  expandSidebar: boolean;
  handleExpandClick?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ expandSidebar, handleExpandClick }) => {
  return (
    <div className="container-fluid sidebar-section">
      <div className={expandSidebar ? "sidebar-expand sidebar" : "sidebar"}>
        <div className="icon-for-sidebar-expand-and-collapse">
          <p onClick={handleExpandClick}>
            {expandSidebar ? (
              <BsChevronLeft size={30} />
            ) : (
              <BsChevronRight size={30} />
            )}
          </p>
        </div>

        <SidebarList expandSidebar={expandSidebar} />
      </div>
    </div>
  );
};

export default Sidebar;
