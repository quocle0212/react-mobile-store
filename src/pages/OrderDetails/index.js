import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../services/Api";
import { formatNumber, getImg } from "../../shared/ultils";

const OrderDetails = ()=>{
    const [orderDetails, setOrderDetails] = useState({})
    const {id}= useParams();

    useEffect(()=>{
        getOrderDetails(id)
            .then(({data})=>{
                console.log(data)
                setOrderDetails(data.data)
            }) 
            .catch((error)=>console.log(error))
    },[id])

    console.log(orderDetails);
    
    return(
        <>
            <div id="my-cart">
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                Thông tin sản phẩm
                </div> 
                <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Số lượng</div> 
                <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>    
            </div>  
            <form method="post">
                {
                    orderDetails?.items?.map((item, index)=>
                        <div key={index} className="cart-item row">
                        <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                            <img src={getImg(item?.image)} />
                            <h4>{item?.name}</h4>
                        </div> 
                        <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                            <p>{item?.qty}</p>
                        </div> 
                        <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{formatNumber(item?.price)}</b></div>    
                        </div>
                    )
                }
                    <div className="row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">	
                    </div> 
                    <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div> 
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{formatNumber(orderDetails?.totalPrice)}</b></div>
                    </div>
            </form>
            </div>

        </>
    )
}
export default OrderDetails;