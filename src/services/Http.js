import axios from "axios";
import { BASE_API } from "../shared/constants/app";
import  store  from "../react-setup/store";
import { getNewToken } from "./Api";
import { useDispatch } from "react-redux";
import { updateToken } from "../react-setup/reducers/userInformation";



const Http = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
});

// Interceptor cho request để thêm Authorization header với access token
Http.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.userInformation.user?.accessToken;
        
        console.log("Token hiện tại:", token);

        if (token) {
            config.headers["token"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

Http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // Đánh dấu request để tránh lặp lại vô hạn
            originalRequest._retry = true;

            try {
                // Gọi API làm mới token
                const { data } = await getNewToken();
                const dispatch = useDispatch();
                dispatch(updateToken(
                    {
                        accessToken: data.accessToken,
                    }
                ))
                originalRequest.headers["token"] = `Bearer ${data.accessToken}`;
                return Http(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default Http;
