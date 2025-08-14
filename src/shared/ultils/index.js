import { BASE_URL } from "../constants/app"

export const getImg = (imgName)=>{
    return `${BASE_URL}/assets/uploads/products/${imgName}`
}

export const getImgSliders = (imgName)=>{
    return `${BASE_URL}/assets/uploads/sliders/${imgName}`
}

export const getImgBanners = (imgName)=>{
    return `${BASE_URL}/assets/uploads/banners/${imgName}`
}

export const formatNumber = (number)=>{
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}