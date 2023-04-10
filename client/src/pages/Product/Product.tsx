import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
//Custom
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import {
  getAllProducts,
  getAllFeaturedProducts,
  createProduct,
  CreateProductProps,
} from "../../API";
import ProductCard from "./ProductCard";
import Modal from "../../components/Modal/Modal";
import WMStyle from "../WM.module.css";
import productCardStyle from "./ProductCard.module.css";
import { Colors } from "../../Dataprovider";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allFeaturedProducts, setAllFeaturedProducts] = useState([]);

  //////////////////////////////////////////////////////
  ///////////////// create products      ///////////////
  //////////////////////////////////////////////////////

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [doors, setDoors] = useState<string>("");
  const [brands, setBrands] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(true);
  const [deliveryType, setDeliveryType] = useState<string>("Free");

  const handeSelectFeaturedCheckBox = () => {
    setFeatured(!featured);
  };

  const onSubmitCreateProduct = async () => {
    try {
      const payload: CreateProductProps = {
        title: title,
        price: parseInt(price),
        city: city,
        doors: parseInt(doors),
        brands: brands,
        color: color,
        deliverytype: deliveryType,
        featured: featured,
      };

      const res = await createProduct(payload);

      if (res) {
        toast.success("Product created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllProducts();
        loadAllFeturedProducts();
        resetInputField();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const resetInputField = () => {
    setTitle("");
    setPrice("");
    setCity("");
    setDoors("");
    setBrands("");
    setColor("");
    setFeatured(false);
    setDeliveryType("Free");
  };

  //////////////////////////////////////////////////////
  /////////////////    Radio button start ///////////////
  //////////////////////////////////////////////////////

  const onChangeRadioButtonValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryType(event.target.value);
  };

  //////////////////////////////////////////////////////
  ///////////////// to control checkbox   ///////////////
  //////////////////////////////////////////////////////

  const [checkedFeatured, setCheckedFeatured] = useState<boolean>(false);

  const [checkedAllProduct, setCheckedAllProduct] = useState<boolean>(true);

  const handleCheckBoxFeaturedValueChange = () => {
    setCheckedFeatured(!checkedFeatured);
  };

  const handleCheckBoxAllProductValueChange = () => {
    setCheckedAllProduct(!checkedAllProduct);
  };

  //////////////////////////////////////////////////////
  ///////////////// to show modal box   ///////////////
  //////////////////////////////////////////////////////

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setOpenModal(false);
  };

  //////////////////////////////////////////////////////
  ///////////////// to load all products ///////////////
  //////////////////////////////////////////////////////

  const loadAllProducts = async () => {
    try {
      const res = await getAllProducts();

      if (res) {
        setAllProducts(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ///////// to load all Featured products //////////////
  //////////////////////////////////////////////////////

  const loadAllFeturedProducts = async () => {
    try {
      const res = await getAllFeaturedProducts();
      if (res) {
        setAllFeaturedProducts(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ///////////////// Search Filter products//////////////
  //////////////////////////////////////////////////////

  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("900000");
  const [limit, setLimit] = useState("60");
  const [featuredProducts, setFeaturedProducts] = useState(false);
  const [searchByColor, setSearchByColor] = useState("Red");

  // to show search field in tag option
  const [productColor, setProductColor] = useState("");

  const handleSearchFeaturedProductCheckBox = () => {
    setFeaturedProducts(!featuredProducts);
  };
  // to choose color filter
  // const [redColorProduct, setRedColorProduct] = useState("Red");
  // const [selectRedColor, setSelectRedColor] = useState(true);

  // const [greenColorProduct, setGreenColorProduct] = useState("Green");
  // const [selectGreenColor, setSelectGreenColor] = useState(true);

  // const handleColorTextChange = () => {
  //   setSelectRedColor(!selectRedColor);

  //   if (selectRedColor === true) {
  //     setRedColorProduct("Red");

  //   } else {
  //     setRedColorProduct("");
  //   }
  // };

  // const handleGreenColorProductSearch = () => {
  //   setSelectGreenColor(!selectGreenColor);

  //   if (selectGreenColor === true) {
  //     setGreenColorProduct("Green");

  //   } else {
  //     setGreenColorProduct("");
  //   }
  // };

  //////////////////////////////////////////////////////
  ///////// Search Product               //////////////
  //////////////////////////////////////////////////////

  const searchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/filter?featuredproduct=${featuredProducts}&color=${searchByColor}&limit=${parseInt(
          limit
        )}&min=${parseInt(min)}&max=${parseInt(max)}`
      );
      if (res) {
        setAllProducts(res.data);
        setProductColor(searchByColor);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  //////////////////////////////////////////////////////
  ///////// Reset Filter Input Field      //////////////
  //////////////////////////////////////////////////////

  const resetFilter = () => {
    setMin("1");
    setMax("900000");
    setLimit("60");
    setFeaturedProducts(false);
    loadAllProducts();
  };

  useEffect(() => {
    loadAllProducts();
    loadAllFeturedProducts();
    // searchProducts();
  }, []);

  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <h6>Filter products</h6>

              <div className={WMStyle.wm_form}>
                <label>Min Price:</label>

                <input
                  type="text"
                  className="form-control"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />

                <label>Max Price:</label>
                <input
                  type="text"
                  className="form-control"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />

                <div className="selected-dropdownlist">
                  <select
                    className={productCardStyle.custom_select}
                    value={searchByColor}
                    onChange={(e) => setSearchByColor(e.target.value)}
                  >
                    {Object.keys(Colors).map((i, index) => (
                      <option value={i}>{i}</option>
                    ))}

                    {/* <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option> */}
                  </select>
                </div>

                <label>Number of products you want to see:</label>
                <input
                  type="text"
                  className="form-control"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>

              {/* <div style={{ display: "flex", marginTop: "20px" }}>
                <label>
                  <input type="checkbox" onChange={handleColorTextChange} />
                  Red color products
                </label>
                {redColorProduct}
              </div>


              <div style={{ display: "flex", marginTop: "20px" }}>
                <label>
                  <input type="checkbox" onChange={handleGreenColorProductSearch} />
                  Green color products
                </label>
                {greenColorProduct}
              </div> */}

              <div style={{ display: "flex", marginTop: "20px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={featuredProducts}
                    onChange={handleSearchFeaturedProductCheckBox}
                  />
                  Featured products
                </label>
              </div>

              <div style={{ marginTop: "40px" }}>
                <button className="btn btn-success" onClick={searchProducts}>
                  Search
                </button>

                <button className="btn btn-info" onClick={resetFilter}>
                  Clear Filter
                </button>
              </div>
            </CardLayout>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <div style={{ display: "flex", marginLeft: "10px" }}>
                {/* <input
                  type="checkbox"
                  checked={checkedAllProduct}
                  onChange={handleCheckBoxAllProductValueChange}
                />
                <h6 style={{ marginLeft: "10px" }}>All Products</h6> */}
                <input
                  type="checkbox"
                  checked={checkedFeatured}
                  onChange={handleCheckBoxFeaturedValueChange}
                  style={{ marginLeft: "10px" }}
                />
                <h6 style={{ marginLeft: "20px" }}>Featured Products</h6>
              </div>
              <div>
                <p
                  style={{
                    background: "black",
                    width: "fit-content",
                    padding: "10px",
                    color: "white",
                  }}
                >
                  {productColor}
                </p>
              </div>
              <div className={WMStyle.wm_header}>
                <h6>Create Work Management</h6>
                <p>
                  <IoAddCircleSharp
                    size={25}
                    onClick={() => setOpenModal(true)}
                  />
                </p>
              </div>
              {/* {checkedAllProduct &&
                allProducts &&
                allProducts.map((product, index) => (
                  <ProductCard
                    product={product}
                    loadAllProducts={loadAllProducts}
                    loadAllFeaturedProducts={loadAllFeturedProducts}
                  />
                ))}
              {checkedFeatured &&
                allFeaturedProducts &&
                allFeaturedProducts.map((product, index) => (
                  <ProductCard
                    product={product}
                    loadAllProducts={loadAllProducts}
                    loadAllFeaturedProducts={loadAllFeturedProducts}
                  />
                ))} */}
              {/* To filter product after selecting one checkbox */}

              {checkedFeatured
                ? allFeaturedProducts &&
                  allFeaturedProducts.map((product, index) => (
                    <ProductCard
                      product={product}
                      loadAllProducts={loadAllProducts}
                      loadAllFeaturedProducts={loadAllFeturedProducts}
                    />
                  ))
                : allProducts &&
                  allProducts.map((product, index) => (
                    <ProductCard
                      product={product}
                      loadAllProducts={loadAllProducts}
                      loadAllFeaturedProducts={loadAllFeturedProducts}
                    />
                  ))}
              <Modal
                open={openModal}
                onClose={handleOnClose}
                title="Create New Work Management"
                onSaveButton={onSubmitCreateProduct}
                onResetButton={resetInputField}
                showActionButton={true}
              >
                <div className={WMStyle.wm_form}>
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label>City:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <label>Brand:</label>
                  <div className="selected-dropdownlist">
                    <select
                      className={productCardStyle.custom_select}
                      value={brands}
                      onChange={(e) => setBrands(e.target.value)}
                    >
                      <option>--Select brand--</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                      <option value="Mini Copper">Mini Copper</option>
                      <option value="Volvo">Volvo</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Opel">Opel</option>
                    </select>
                  </div>
                  <label>Color:</label>
                  <div className="selected-dropdownlist">
                    <select
                      className={productCardStyle.custom_select}
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option>--Select color--</option>
                      {Object.keys(Colors).map((i, index) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <label>Number of doors:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={doors}
                    onChange={(e) => setDoors(e.target.value)}
                  />
                  <label>Delivery type:</label>

                  {/* Radio button */}
                  <div
                    onChange={onChangeRadioButtonValue}
                    className={productCardStyle.radio_buttons}
                  >
                    <div className={productCardStyle.featuredCheckBox}>
                      <label>
                        <input
                          type="radio"
                          value="Free"
                          name="delivery"
                          checked={deliveryType === "Free"}
                        />
                        <div className={productCardStyle.checkBoxText}>
                          <p>Free</p>
                        </div>
                      </label>
                    </div>
                    <div className={productCardStyle.featuredCheckBox}>
                      <label>
                        <input
                          type="radio"
                          value="Paid"
                          name="delivery"
                          checked={deliveryType === "Paid"}
                        />
                        <div className={productCardStyle.checkBoxText}>
                          <p>Paid</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className={productCardStyle.featuredCheckBox}>
                    <label>
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={handeSelectFeaturedCheckBox}
                      />
                      {featured.toString()}
                      <div className={productCardStyle.checkBoxText}>
                        <p>Featured</p>
                      </div>
                    </label>
                  </div>
                </div>
              </Modal>
            </CardLayout>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default Product;
