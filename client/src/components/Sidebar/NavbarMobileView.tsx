import React, { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { FcGallery } from "react-icons/fc";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
//Custom
import "./mavbarmobileview.css";

const NavbarMobileView = () => {
  const [open, setOpen] = useState(false);

  const handleNavbaropen = () => {
    setOpen(!open);
  };

  return (
    <div className="responsive-mobile-view">
      <div className="container-fluid mobile-view-header">
        <p>
          <GiHamburgerMenu size={25} onClick={handleNavbaropen} />
        </p>
      </div>

      {open && (
        <div className="mobile-nav">
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
                <IoIosImages size={25} color="yellow" /> Thumbnail
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/upload-image"}
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
                <BsFillCloudUploadFill size={25} color="yellow" /> Upload Image
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/create-thumbnail"}
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
                <FcGallery size={25} /> Create Thumbnail
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarMobileView;
