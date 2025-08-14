import Http from "./Http";


//Display
export const getSliders = (config)=>Http.get(`/sliders`, config);
export const getBanners = (config)=>Http.get(`/banners`, config);
export const getProducts = (config)=>Http.get(`/products`, config);
export const getCategories = (config)=>Http.get(`/categories`, config);
export const getProductsCategory = (id, config)=>Http.get(`/categories/${id}/products`, config);
export const getCategory = (id, config)=>Http.get(`/categories/${id}`, config);
export const getProduct = (id, config)=>Http.get(`/products/${id}`, config);
export const getComentsProduct = (id, config)=>Http.get(`/products/${id}/comments`, config);
export const creatComentsProduct = (id, data)=>Http.post(`/products/${id}/comments`, data);
//Orders
export const createOrders = (config)=>Http.post("/order", config);
export const getOrders = (id, config)=>Http.get(`/customers/${id}/orders`, config);
export const canceledOrder = (id, config)=>Http.get(`/customer/orders/${id}/canceled`, config);
export const getOrderDetails = (id, config)=>Http.get(`/customer/orders/${id}`, config);

//Customers
export const register = (data)=>Http.post("/customers/register", data);
export const UpdateCustomer = (id, data)=>Http.post(`/customers/${id}/update`, data);
export const signIn = (data)=>Http.post("/customers/login", data);
export const getNewToken = (config)=>Http.get(`/customer/refreshtoken`)
