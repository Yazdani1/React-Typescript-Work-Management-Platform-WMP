import axios from "axios";
import { API_URL } from "./config";
import { WMInfoStatus } from "./Dataprovider";
 
/**
 * To load video URL
 */

const VIDEO_API_URL = "https://video-stream-platform.vercel.app/api";

//////////////////////////////////////////////////////
///////////////// Work Management ////////////////////
//////////////////////////////////////////////////////

export interface CreateWMProps {
  wm_name: string;
}

export const createWM = async (props: CreateWMProps) => {
  const res = await axios.post(API_URL + "/create-work-management", {
    ...props,
  });
  return res;
};

export const getAllWorkManagement = async () => {
  const res = await axios.get(API_URL + "/get-all-work-management");
  return res;
};

export const getSingleWMDetails = async (slug: string) => {
  const res = await axios.get(API_URL + "/single-wm-details/" + slug);
  return res;
};

export const deleteWM = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-wm/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////     TPI         ////////////////////
//////////////////////////////////////////////////////

export interface CreateTPIProps {
  tpi_name: string;
  wm_id: string;
}

export const createTPI = async (props: CreateTPIProps) => {
  const res = await axios.post(API_URL + "/create-tpi", { ...props });
  return res;
};

export const getTPI = async (slug: string) => {
  const res = await axios.get(API_URL + "/wm/" + slug);
  return res;
};

export const deleteTPI = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-tpi/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////     TPI Summary      ///////////////
//////////////////////////////////////////////////////

export const tpiDetails = async (slug: string) => {
  const res = await axios.get(API_URL + "/tpi/" + slug);
  return res;
};

export interface CreateTPISummaryProps {
  tpi_summary: string;
  tpi_id: string;
}

export const createTPISummary = async (props: CreateTPISummaryProps) => {
  const res = await axios.post(API_URL + "/create-tpi-summary", { ...props });
  return res;
};

export const getAllTpiSummary = async (slug: string, limit: number) => {
  const res = await axios.get(API_URL + `/tpi-summary/${slug}?limit=${limit}`);
  return res;
};

export const deleteTPISummary = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-tpi-summary/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////     TPI Info         ///////////////
//////////////////////////////////////////////////////

export interface CreateTPIInfo {
  message: string;
  issues: string;
  responsible: string[];
  tpi_id: string;
}

export const createTPIInfo = async (props: CreateTPIInfo) => {
  const res = await axios.post(API_URL + "/create-tpi-info", { ...props });
  return res;
};
export const getAllTPIInfo = async (slug: string) => {
  const res = await axios.get(API_URL + "/getall-tpi-info/" + slug);
  return res;
};

export interface UpdateTPIInfo {
  message: string;
  issues: string;
  responsible: string[];
}

export const updateTPIInfo = async (id: string, props: UpdateTPIInfo) => {
  const res = await axios.put(API_URL + "/updatetpi-info/" + id, { ...props });
  return res;
};

/**
 *
 * @param id - TPIInfo id need to pass to delete
 * @returns
 */

export const deleteTPIInfo = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-tpi-info/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////     Product          ///////////////
//////////////////////////////////////////////////////

export interface CreateProductProps {
  title: string;
  price: number;
  city: string;
  doors: number;
  brands: string;
  color: string;
  deliverytype: string;
  featured: boolean;
}

export const createProduct = async (props: CreateProductProps) => {
  const res = await axios.post(API_URL + "/create-product", { ...props });
  return res;
};

export const getAllProducts = async () => {
  const res = await axios.get(API_URL + "/get-all-products");
  return res;
};

export const getAllFeaturedProducts = async () => {
  const res = await axios.get(API_URL + "/get-all-featured-products");
  return res;
};

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-prouct/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////  WM Targets          ///////////////
//////////////////////////////////////////////////////
export interface CreateWMTargetsProps {
  target: string;
  status: boolean;
  wm_id: string;
}
export const createWMTargets = async (props: CreateWMTargetsProps) => {
  const res = await axios.post(API_URL + "/create-wm-target", { ...props });
  return res;
};

/**
 * @param slug
 * @returns - it will return all wm targets data from this api end point
 */

export const getAllWMTargets = async (slug: string) => {
  const res = await axios.get(API_URL + "/get-all-wm-targets/" + slug);
  return res;
};

export interface UpdateWMTargetProps {
  target?: string;
  status?: boolean;
}
export const updateWMTargets = async (
  id: string,
  props: UpdateWMTargetProps
) => {
  const res = await axios.put(API_URL + "/update-wm-target/" + id, {
    ...props,
  });
  return res;
};

/**
 *
 * @param id -- based on id this function will delete wm targets
 * @returns - it will return the delete response if the delete operation done successfully.
 */

export const deleteWMTargets = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-wm-target/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////  Favourite TPI       ///////////////
//////////////////////////////////////////////////////

export interface CreateFavouriteTPIProps {
  tpi_id: string;
}
export const createFavouriteTPI = async (props: CreateFavouriteTPIProps) => {
  const res = await axios.post(API_URL + "/save-favourite-tpi", { ...props });
  return res;
};

/**
 *
 * @returns - it returns all the favourite tpi
 */

export const getAllFavouriteTPI = async () => {
  const res = await axios.get(API_URL + "/get-all-favourite-tpi");
  return res;
};

/**
 *
 * @param id - to delete favourite tpi we need to pass id of a particular favourite tpi
 * @returns
 */

export const deleteFavouriteTPI = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-favourite-tpi/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////     WM Info          ///////////////
//////////////////////////////////////////////////////

export interface CreateWMInfoProps {
  wminfo: string;
  wm_id: string;
  status: WMInfoStatus;
}

export const createWMInfo = async (props: CreateWMInfoProps) => {
  const res = await axios.post(API_URL + "/create-wminfo", { ...props });
  return res;
};

export const getAllWMInfo = async (slug: string) => {
  const res = await axios.get(API_URL + "/wm-info/" + slug);
  return res;
};

export interface UpdateWMInfoProps {
  wminfo: string;
  status: WMInfoStatus;
}

export const updateWmInfoDetails = async (
  id: string,
  props: UpdateWMInfoProps
) => {
  const res = await axios.put(API_URL + "/update-wm-info/" + id, { ...props });
  return res;
};

/**
 *
 * @param id - need to pass to delete WMInfo
 * @returns
 */

export const deleteWMInfo = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-wminfo/" + id);
  return res;
};

//////////////////////////////////////////////////////
///////////////// Get ALL Ecommerce Category /////////
//////////////////////////////////////////////////////

export const getAllEcommerceCategory = async () => {
  const res = await axios.get(API_URL + "/getall-ecommerce-category");
  return res;
};

//////////////////////////////////////////////////////
///////////////// Get ALL Ecommerce Item /////////////
//////////////////////////////////////////////////////

export const getAllEcommerceItem = async () => {
  const res = await axios.get(API_URL + "/get-all-ecommerce-item");
  return res;
};

/**
 *
 * @param category - is passing as string[] array cause we will get the search result based on the array of category.
 * it will take multiple category and then query the search result
 * @returns
 */

export const searchEcommerceItem = async (category: string[]) => {
  const res = await axios.get(
    API_URL + `/search-ecommerce-item?category=${category}`
  );
  return res;
};

//////////////////////////////////////////////////////
///////////////// Expense   //////////////////////////
//////////////////////////////////////////////////////

export const getExpenseCount = async () => {
  const res = await axios.get(API_URL + "/count-expenses");
  return res;
};

export const getAllExpenses = async () => {
  const res = await axios.get(API_URL + "/get-Allexpense");
  return res;
};

//////////////////////////////////////////////////////
//////////  Photo Library   //////////////////////////
//////////////////////////////////////////////////////
export interface CreatePhotoLinraryProps {
  imageUrl: string;
}
export const createPhotoLibrary = async (props: CreatePhotoLinraryProps) => {
  const res = await axios.post(API_URL + "/create-photoLibrary", { ...props });
  return res;
};
export const getPhotoLibrary = async () => {
  const res = await axios.get(API_URL + "/get-photos");
  return res;
};
// to get photo library with pagination
export const getPhotoLibraryWithPagination = async (
  page: number,
  limit: number
) => {
  const res = await axios.get(
    API_URL + `/photo-library?page=${page}&limit=${limit}`
  );
  return res;
};

//////////////////////////////////////////////////////
//////////  Online Store    //////////////////////////
//////////////////////////////////////////////////////

export interface CreateOnlineStoreProps {
  title: string;
  des: string;
  price: number;
  photo: [];
}

export const createOnlineStore = async (props: CreateOnlineStoreProps) => {
  const res = await axios.post(API_URL + "/create-online-store", { ...props });
  return res;
};

export const getOnlineStore = async () => {
  const res = await axios.get(API_URL + "/get-all-onlineStore");
  return res;
};

//////////////////////////////////////////////////////
//////////  Video List   /////////////////////////////
//////////////////////////////////////////////////////

export const getVideoList = async () => {
  const res = await axios.get(VIDEO_API_URL + "/get-all-posts");
  return res;
};

//////////////////////////////////////////////////////
////////// Map Marker    /////////////////////////////
//////////////////////////////////////////////////////

const API_MAP_BERLIN = "https://restcountries.com/v3.1/capital/Berlin";

export const getMapMarkerForBerlin = async () => {
  const res = await axios.get(API_MAP_BERLIN);
  return res;
};

const API_MAP_PARIS = "https://restcountries.com/v3.1/capital/Paris";

export const getMapMarkerForParis = async () => {
  const res = await axios.get(API_MAP_PARIS);
  return res;
};

const API_MAP_BRUSSELS = "https://restcountries.com/v3.1/capital/Brussels";

export const getMapMarkerForBrussels = async () => {
  const res = await axios.get(API_MAP_BRUSSELS);
  return res;
};

//////////////////////////////////////////////////////
///////////// Home Rental   //////////////////////////
//////////////////////////////////////////////////////

/**
 * @object - A list of data
 * @returns All home rental data
 */

export const getAllHomeRental = async () => {
  const res = await axios.get(API_URL + "/get-all-home-rental-advertise");
  return res;
};

/**
 *
 * @param id - to delete home rental a id need to be passed through this fuction
 * @returns
 */


export const deleteHomeRental = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-homerental/" + id);
  return res;
};


/**
 *
 * @param id - we will get single home rental information based on the id
 * @returns
 */

export const getSingleHomeRentalDetails = async (id: string) => {
  const res = await axios.get(API_URL + "/get-home-rental-details/" + id);
  return res;
};

//////////////////////////////////////////////////////
/////////////////   Tpi Items          ///////////////
//////////////////////////////////////////////////////

export interface CreateTPIItems {
  title: string;
  value: number;
  details: string;
}

export interface CreateTPIItemsProps {
  tpi_Item_Name: string;
  tpi_item_info: CreateTPIItems[];
}

export const createTPIItems = async (props: CreateTPIItemsProps) => {
  const res = await axios.post(API_URL + "/create-tpi-item", { ...props });
  return res;
};

export const getTpiItems = async () => {
  const res = await axios.get(API_URL + "/all-tpi-item-list");
  return res;
};

export const deleteTpiItemsArrayItem = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-single-item/" + id);
  return res;
};


//////////////////////////////////////////////////////
/////////////////  Post Mark   ///////////////////////
//////////////////////////////////////////////////////

const API_JOSN_URL = "https://jsonplaceholder.typicode.com/posts";
export const getJsonPlaceHolderPostData = async()=>{
  const res = await axios.get(API_JOSN_URL);
  return res;
}



