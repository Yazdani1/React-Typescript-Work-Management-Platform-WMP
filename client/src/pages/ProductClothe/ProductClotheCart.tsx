import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import style from "./ProductClothe.module.scss";
import { getAllProductsClothe } from "../../API";
import { ProductClotheItem } from "../../Dataprovider";
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import ProductClotheCartItem from "./ProductClotheCartItem";
import { useProductClotheContext } from "../../ContextApi/ProductClotheContext";

const ProductClotheCart = () => {
  const { addProduct, product } = useProductClotheContext();

  return (
    <PageLayout>
      <CardLayout backgroun_color="white">
        <div className="row">
          {product &&
            product.map((product) => (
              <div className="col-lg-3">
                <ProductClotheCartItem product_Cart_item={product} key={product.id} />
              </div>
            ))}
        </div>
      </CardLayout>
    </PageLayout>
  );
};

export default ProductClotheCart;
