import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";

import style from "./ProductClothe.module.scss";
import { ProductClotheItem } from "../../Dataprovider";
import CardLayout from "../../components/CardLayout";
import { useProductClotheContext } from "../../ContextApi/ProductClotheContext";

interface ProductClotheCartItemProps {
  product_Cart_item: ProductClotheItem;
}

const ProductClotheCartItem: FC<ProductClotheCartItemProps> = ({
  product_Cart_item,
}) => {
    
  const { addProduct, product,removeProduct } = useProductClotheContext();

  const handleRemoveProduct = (productId:number) => {
    removeProduct(productId);
  };

  return (
    <CardLayout>
      <img src={product_Cart_item.image} height={200} width={200} />
      <h6>{product_Cart_item.title.substring(0, 30)}</h6>
      <p>{product_Cart_item.price}.Euro</p>
      <h6>{product_Cart_item.category}</h6>
      <p>
        {product_Cart_item.rating?.rate}/{product_Cart_item.rating?.count}
      </p>

      <button
        className="btn btn-danger"
          onClick={() => handleRemoveProduct(product_Cart_item.id)}
      >
        Remove Product
      </button>
    </CardLayout>
  );
};

export default ProductClotheCartItem;
