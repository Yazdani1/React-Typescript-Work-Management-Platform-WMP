import { FC, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

//Custom
import productCardStyle from './ProductCard.module.css';
import { Product } from '../../Dataprovider';
import DropDownCard from '../../components/DropDownCard';
import Modal from '../../components/Modal/Modal';
import { deleteProduct } from '../../API';

interface ProductCardProps {
  product: Product;
  loadAllProducts: () => void;
  loadAllFeaturedProducts: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, loadAllProducts, loadAllFeaturedProducts }) => {
  //////////////////////////////////////////////////////
  /////////  to show update modal         //////////////
  //////////////////////////////////////////////////////

  const [openUpdateModal, setUpdateOpenModal] = useState<boolean>(false);
  const handleUpdateOnClose = () => {
    setUpdateOpenModal(false);
  };

  const handleUpdateOnOpenModal = () => {
    setUpdateOpenModal(true);
  };

  //////////////////////////////////////////////////////
  /////////  To delete product            //////////////
  //////////////////////////////////////////////////////

  const onClickDeleteProduct = async (id: string) => {
    try {
      const res = await deleteProduct(id);
      if (res) {
        toast.success('Product deleted successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllProducts();
        loadAllFeaturedProducts();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className={productCardStyle.product_container}>
      <div className={productCardStyle.titleRow}>
        <h6>{product.title}</h6>
        {product.featured === true && <p className={productCardStyle.featured}>Featured</p>}
      </div>
      <div className={productCardStyle.itemRow}>
        <div>
          <p className={productCardStyle.product_price}>{product.price} EUR</p>
          <h6>{product.city}</h6>
          <label>
            <input type="checkbox" checked={product.featured} />
          </label>
        </div>
        {/* <DropDownCard/> */}
        <DropDownCard handleUpdateOnOpenModal={handleUpdateOnOpenModal} deleteSingleItem={() => onClickDeleteProduct(product._id)} />
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
          <p>{product.brands}</p>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
          <p>{product.color}</p>
        </div>

        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
          <p>{product.doors}</p>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
          <p>{product.deliverytype}</p>
        </div>
      </div>

      {/*//////////////////////////////////////////////////////
  /////////  To show update modal         /////////////////
  ////////////////////////////////////////////////////// */}
      <Modal open={openUpdateModal} onClose={handleUpdateOnClose} title="Update Product" showActionButton={true}>
        <div className="Fdgfdgfd">
          <label>Title:</label>
          <input type="text" className="form-control" />
        </div>
      </Modal>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default ProductCard;
