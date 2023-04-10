import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//Custom
import PageLayout from "../../Pagelayout/PageLayout";
import ecommerceStyle from "./ECommerce.module.css";
import {
  getAllEcommerceCategory,
  getAllEcommerceItem,
  searchEcommerceItem,
} from "../../API";
import ECommerceCategoryCard from "./ECommerceCategoryCard";
import CardLayout from "../../components/CardLayout";
import ECommerceItemCard from "./ECommerceItemCard";

const ECommerce = () => {
  //////////////////////////////////////////////////////
  ////////// Get E-Commerce Category   /////////////////
  //////////////////////////////////////////////////////

  const [loadAllCategory, setAllCategory] = useState([]);

  const loadAllECommerceCategory = async () => {
    try {
      const res = await getAllEcommerceCategory();

      if (res) {
        setAllCategory(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// Get all E-Commerce Item   /////////////////
  //////////////////////////////////////////////////////

  const [allECommerceItem, setAllECommerceItem] = useState([]);

  const loadAllECommerceItem = async () => {
    try {

      const res = await getAllEcommerceItem();
      
      if (res) {
        setAllECommerceItem(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// Search E-Commerce Item   //////////////////
  //////////////////////////////////////////////////////

  const [categoryId, setCategoryId] = useState<string[]>([]);
  // to select and remove category id from check box

  const selectCatId = (catid: string) => {
    const selectedCateogryID = [...categoryId];
    const index = selectedCateogryID.indexOf(catid);
    if (index === -1) {
      selectedCateogryID.push(catid);

    } else {
      selectedCateogryID.splice(index, 1);
    
    }
    setCategoryId(selectedCateogryID);
  };

  const searchECommerceItem = async () => {
    try {
      const res = await searchEcommerceItem(categoryId);

      if (res) {
        setAllECommerceItem(res.data);
      } else {
        loadAllECommerceItem();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to select all the category and then search it through query

  const selectAllCategory = () => {
    const allPostIds = loadAllCategory.map((cat: any) => cat._id);
    setCategoryId(allPostIds);
  };

  // to unselect all the category when user click on the unselect button

  const unselectAllCategory = () => {
    setCategoryId([]);
    loadAllECommerceItem();
  };

  useEffect(() => {
    loadAllECommerceCategory();
    loadAllECommerceItem();
    selectAllCategory();

  }, []);

  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <h5>
                Category List {categoryId.length} {categoryId.toString()}
              </h5>
              {loadAllCategory &&
                loadAllCategory.map((ecat: any, index) => (
                  <>
                    <ECommerceCategoryCard
                      ecategory={ecat}
                      selectCategoryID={selectCatId}
                      ecategoryListId={categoryId}
                    />
                  </>
                ))}
              {categoryId.length > 0 ? (
                <button
                  className="btn btn-primary"
                  onClick={searchECommerceItem}
                >
                  Search
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-primary"
                  onClick={searchECommerceItem}
                >
                  Search
                </button>
              )}

              {/* To render it conditionaly select and unselect button, 
              
              if user select any item then select button will turn to unselct button

              */}

              {categoryId.length >= 1 ? (
                <button className="btn btn-info" onClick={unselectAllCategory}>
                  Unselect All
                </button>
              ) : (
                <button className="btn btn-info" onClick={selectAllCategory}>
                  Select All
                </button>
              )}

            </CardLayout>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <h4>Post List</h4>

              {allECommerceItem &&
                allECommerceItem.map((eitem: any, index) => (
                  <>
                    <ECommerceItemCard eitem={eitem} />
                  </>
                ))}
            </CardLayout>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ECommerce;
