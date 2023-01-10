import React, { FC } from "react";
import "./SidebarList.css";

import { FcGallery } from "react-icons/fc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";


import { BsFillCloudUploadFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";

import { NavLink } from "react-router-dom";

interface IPropsSidebarList {
  expandSidebar: boolean;
}

const SidebarList: FC<IPropsSidebarList> = ({ expandSidebar }) => {
  return (
    <React.Fragment>
      {expandSidebar ? (
        <div className="navbar-items">
          <ul>
            <li className="nav-item">
              <NavLink
                to={"/"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
                end
              >
                <IoIosImages size={25} color="yellow" /> WM Overview
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/ecommerce"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <BsFillCloudUploadFill size={25} color="yellow" /> E-Commerce
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/expense"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <FcGallery size={25} />Expense
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/product"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <MdOutlineProductionQuantityLimits size={25} color="yellow" /> Product
              </NavLink>
            </li>


            
            <li className="nav-item">
              <NavLink
                to={"/favourite-tpi"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <AiFillStar size={25} color="yellow" /> FavouriteTPI
              </NavLink>
            </li>

               
            <li className="nav-item">
              <NavLink
                to={"/form"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <AiFillStar size={25} color="yellow" /> Form
              </NavLink>
            </li>

       
            <li className="nav-item">
              <NavLink
                to={"/test-responsive"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <AiFillStar size={25} color="yellow" /> Test Responsive
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to={"/photo-library"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <AiFillStar size={25} color="yellow" /> Photo Library
              </NavLink>
            </li>

            
            <li className="nav-item">
              <NavLink
                to={"/online-store"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <AiFillStar size={25} color="yellow" /> Online Store
              </NavLink>
            </li>




          </ul>
        </div>
      ) : (
        <div className="navbar-items-only-icons">
          <ul>
            <li className="nav-item">
              <NavLink
                to={"/"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
                end
              >
                <IoIosImages size={25} color="yellow" />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/ecommerce"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <BsFillCloudUploadFill size={25} color="yellow" />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/expense"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <FcGallery size={25} />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/product"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <MdOutlineProductionQuantityLimits size={25} color="yellow" /> 
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/favourite-tpi"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <AiFillStar size={25} color="yellow" /> 
              </NavLink>
            </li>

          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default SidebarList;
