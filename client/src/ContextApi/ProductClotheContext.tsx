import {
  useState,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useContext,
} from "react";

import { ProductClotheItem } from "../Dataprovider";

interface ProductClotheContextProps {
  addProduct: (newproductincart: ProductClotheItem) => void;
  product: ProductClotheItem[];
  removeProduct: (productId: number) => void;
}

export const ProductClotheContext = createContext<ProductClotheContextProps>({
  addProduct: () => {},
  removeProduct: () => {},
  product: [],
});

export const useProductClotheContext = () => useContext(ProductClotheContext);

interface ProductClotheProviderProps {
  children: ReactNode;
}

export const ProductClotheProvider: FC<ProductClotheProviderProps> = ({
  children,
}) => {

  const [product, setProduct] = useState<ProductClotheItem[]>(() => {
    const storedProduct = localStorage.getItem("cartProducts");
    return storedProduct ? JSON.parse(storedProduct) : [];
  });
  
  const addProduct = (newproduct: ProductClotheItem) => {
    const updatedProduct = [...product, newproduct];
    setProduct(updatedProduct);
    localStorage.setItem("cartProducts", JSON.stringify(updatedProduct));
  };

  const removeProduct = (productId: number) => {
    const updatedProduct = product.filter((item) => item.id !== productId);
    setProduct(updatedProduct);
    localStorage.setItem("cartProducts", JSON.stringify(updatedProduct));
  };

  // const addProduct = (newproduct: ProductClotheItem) => {
  //   setProduct([...product, newproduct]);
  // };

  // const removeProduct = (productId: number) => {
  //   const updatedProduct = product.filter((item) => item.id !== productId);
  //   setProduct(updatedProduct);
  // };

  return (
    <ProductClotheContext.Provider
      value={{
        addProduct,
        removeProduct,
        product,
      }}
    >
      {children}
    </ProductClotheContext.Provider>
  );
};
