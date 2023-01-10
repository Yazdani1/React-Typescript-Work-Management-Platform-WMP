import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import WorkManagementOverview from './pages/WorkManagementOverview';
import TPI_Details from './pages/TPI/TPI_Details';
import Product from './pages/Product/Product';
import WM_Targets from './pages/WM_Targets/WM_Targets';
import FavouriteTPI from './pages/FavouriteTPI/FavouriteTPI';
import ECommerce from './pages/ECommerce/ECommerce';
import Expense from './pages/Expense/Expense';
import Form from './pages/Form/Form';
import TestResponsive from './pages/ResponsiveDesign/TestResponsive';
import PhotoLibrary from './pages/PhotoLibrary/PhotoLibrary';
import OnlineStore from './pages/OnlineStore/OnlineStore';

const App = () => {
  return (
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

    </Routes>
    <ToastContainer autoClose={8000} />

  </BrowserRouter>
  )
}

export default App