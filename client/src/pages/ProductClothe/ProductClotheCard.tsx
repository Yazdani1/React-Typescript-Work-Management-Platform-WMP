import React, { FC } from "react";
import { Link } from "react-router-dom";

import { ProductClotheItem } from "../../Dataprovider";
import CardLayout from "../../components/CardLayout";
import { useProductClotheContext } from "../../ContextApi/ProductClotheContext";

interface ProductClotheCardProps {
  product_items: ProductClotheItem;
}

const ProductClotheCard: FC<ProductClotheCardProps> = ({ product_items }) => {
  const { addProduct, product } = useProductClotheContext();

  const addProducttoCart = (selected_product: ProductClotheItem) => {
    addProduct(selected_product);
  };

  return (
    <CardLayout>
      <img src={product_items.image} height={200} width={200} />
      <h6>{product_items.title.substring(0, 30)}</h6>
      <p>{product_items.price}.Euro</p>
      <h6>{product_items.category}</h6>
      <p>
        {product_items.rating?.rate}/{product_items.rating?.count}
      </p>
      {product.includes(product_items) ? (
        <Link
          to={"/product-clothe-cart"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <button className="btn btn-success">Go to cart</button>
        </Link>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => addProducttoCart(product_items)}
        >
          Add to Cart
        </button>
      )}
    </CardLayout>
  );
};

export default ProductClotheCard;
