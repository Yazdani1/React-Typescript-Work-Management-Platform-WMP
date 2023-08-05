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
}

export const ProductClotheContext = createContext<ProductClotheContextProps>({
  addProduct: () => {},
  product: [],
});

export const useProductClotheContext = () => useContext(ProductClotheContext);

interface ProductClotheProviderProps {
  children: ReactNode;
}

export const ProductClotheProvider: FC<ProductClotheProviderProps> = ({
  children,
}) => {
    
  const [product, setProduct] = useState<ProductClotheItem[]>([]);

  const addProduct = (newproduct: ProductClotheItem) => {
    setProduct([...product, newproduct]);
  };

  return (
    <ProductClotheContext.Provider
      value={{
        addProduct,
        product,
      }}
    >
      {children}
    </ProductClotheContext.Provider>
  );
};
