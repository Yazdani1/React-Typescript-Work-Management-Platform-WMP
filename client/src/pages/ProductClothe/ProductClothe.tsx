import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import style from "./ProductClothe.module.scss";
import { getAllProductsClothe } from "../../API";
import { ProductClotheItem } from "../../Dataprovider";
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import ProductClotheCard from "./ProductClotheCard";
import { useProductClotheContext } from "../../ContextApi/ProductClotheContext";

const ProductClothe = () => {
  let navigate = useNavigate();

  const { addProduct, product } = useProductClotheContext();

  const [productList, setProductList] = useState<ProductClotheItem[]>([]);

  const loadProductClotheLists = async () => {
    try {
      const res = await getAllProductsClothe();

      if (res) {
        setProductList(res);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadProductClotheLists();
  }, []);

  return (
    <PageLayout>
      <CardLayout backgroun_color="white">
        <h6>Cart {product.length}</h6>
        <div className="row">
          {productList &&
            productList.map((product) => (
              <div className="col-lg-3">
                <ProductClotheCard product_items={product} key={product.id} />
              </div>
            ))}
        </div>
      </CardLayout>
    </PageLayout>
  );
};

export default ProductClothe;
