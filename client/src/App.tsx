import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import WorkManagementOverview from "./pages/WorkManagementOverview";
import TPI_Details from "./pages/TPI/TPI_Details";
import Product from "./pages/Product/Product";
import WM_Targets from "./pages/WM_Targets/WM_Targets";
import FavouriteTPI from "./pages/FavouriteTPI/FavouriteTPI";
import ECommerce from "./pages/ECommerce/ECommerce";
import Expense from "./pages/Expense/Expense";
import Form from "./pages/Form/Form";
import TestResponsive from "./pages/ResponsiveDesign/TestResponsive";
import PhotoLibrary from "./pages/PhotoLibrary/PhotoLibrary";
import OnlineStore from "./pages/OnlineStore/OnlineStore";
import TestOne from "./pages/Experiment/TestOne";
import News from "./pages/News/News";
import PostList from "./pages/PostList/PostList";
import Video from "./pages/Video/Video";
import MapMarker from "./pages/MapMarker/MapMarker";
import HomeRental from "./pages/HomeRental/HomeRental";
import HomeRentalDetails from "./pages/HomeRental/HomeRentalDetails";
import MapTest from "./pages/Test/MapTest";
import LinkedinPost from "./pages/LinkedinPost/LinkedinPost";
import UserLocation from "./pages/UserLocation/UserLocation";
import PdfFileReader from "./pages/PdfFileReader/PdfFileReader";
import TpiItems from "./pages/TpiItems/TpiItems";
import PostMark from "./pages/PostMark/PostMark";
import ProductClothe from "./pages/ProductClothe/ProductClothe";
import { ProductClotheProvider } from "./ContextApi/ProductClotheContext";
import ProductClotheCart from "./pages/ProductClothe/ProductClotheCart";

const App = () => {
  return (
    <ProductClotheProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkManagementOverview />} />
          <Route path="/tpi-details/:slug" element={<TPI_Details />} />
          <Route path="/product" element={<Product />} />
          <Route path="/wm-details/:slug" element={<WM_Targets />} />
          <Route path="/favourite-tpi" element={<FavouriteTPI />} />
          <Route path="/ecommerce" element={<ECommerce />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/form" element={<Form />} />
          <Route path="/test-responsive" element={<TestResponsive />} />
          <Route path="/photo-library" element={<PhotoLibrary />} />
          <Route path="/online-store" element={<OnlineStore />} />
          <Route path="/test-one" element={<TestOne />} />
          <Route path="/news" element={<News />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/video" element={<Video />} />
          <Route path="/map-marker" element={<MapMarker />} />
          <Route path="/home-rental" element={<HomeRental />} />
          <Route
            path="/home-rental-details/:id"
            element={<HomeRentalDetails />}
          />
          <Route path="/maptest" element={<MapTest />} />
          <Route path="/linkedinpost" element={<LinkedinPost />} />
          <Route path="/pdffile-reader" element={<PdfFileReader />} />
          <Route path="/tpi-items" element={<TpiItems />} />
          <Route path="/user-location" element={<UserLocation />} />
          <Route path="/post-mark" element={<PostMark />} />
          <Route path="/product-clothe" element={<ProductClothe />} />
          <Route path="/product-clothe-cart" element={<ProductClotheCart />} />

          
        </Routes>
        <TitleUpdater />
        <ToastContainer autoClose={8000} />
      </BrowserRouter>
    </ProductClotheProvider>
  );
};

// This function is showing browser tab title based on the component name. when user move from
//one component to another that particular component name will be shown in the browser tab

const TitleUpdater = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = `wmp | ${location.pathname}`;
  }, [location]);
  return null;
};

export default App;
