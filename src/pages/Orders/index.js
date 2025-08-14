import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { canceledOrder, getNewToken, getOrders } from "../../services/Api";
import { formatNumber } from "../../shared/ultils";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

const Orders = ()=>{
    const [orders, setorders] = useState([]);
    const [reload, setReload] = useState(true);
    const user = useSelector(({userInformation})=> userInformation.user);
    const navigate = useNavigate();
    useEffect(()=>{
        getOrders(user?.customer?._id)
            .then(({data})=>setorders(data.data.docs))
            .catch((error)=>console.log(error))
    },[reload])
    console.log(user?.customer?._id);
    
    console.log("thongtinhang",orders);
    
    const onClick =(value, id)=>{
        if (value === 1) {
            return navigate(`/orderDetails-${id}`)
        }else if (value === 0) {
            return(
                Swal.fire({
                    title: 'Bạn có chắc chắn muốn huỷ đơn hàng không ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                }).then((result)=> {
                    if (result.isConfirmed) {
                        console.log(id);
                        canceledOrder(id)
                            .then(({data})=>{
                                console.log(data);
                                Swal.fire('Thành Công!', 'Huỷ đơn hàng thành công', 'success');
                                setReload(!reload);
                            })
                            .catch((error)=>{
                                console.log(error);
                                Swal.fire('Thất bại!', 'Huỷ đơn hàng thất bại', 'error');
                            })
                    }
                })
            );
        }
    } 
    return(
        <>
            <div id="my-cart">
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Đơn hàng của bạn</div>
                <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">Tổng tiền</div>
            </div>
            <form method="post">
            {
                orders?.map((order, index) => (
                    <div
                        key={index}
                        className={`cart-item row ${order?.status === 2 ? 'alert-success' : order?.status === 0 ? 'alert-danger' : ''}`}
                    >
                        <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                            <h4>Đơn hàng đã mua vào ngày: <span className="text-secondary">06-05-2024 hồi 12:30:59</span></h4>
                            <p>Mã Đơn (MĐ): {order?._id}</p>
                        </div>
                        <div className="cart-price col-lg-2 col-md-2 col-sm-12">
                            <b>{formatNumber(order?.totalPrice)}</b>
                        </div>
                        <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                        {
                            order?.status === 2 ? (
                                <>
                                    <button onClick={()=>onClick(1, order?._id)} type="button" className="btn btn-outline-dark mb-1">Chi tiết đơn hàng</button>
                                    <button type="button" className="btn btn-success mb-1">Đơn đã giao</button>
                                </>
                            ) : order?.status === 0 ? (
                                <>
                                    <button onClick={()=>onClick(1, order?._id)} type="button" className="btn btn-outline-dark mb-1">Chi tiết đơn hàng</button>
                                    <button type="button" className="btn btn-danger mb-1">Đơn đã huỷ</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={()=>onClick(1, order?._id)} type="button" className="btn btn-outline-dark mb-1">Chi tiết đơn hàng</button>
                                    <button onClick={()=>onClick(0, order?._id)} type="button" className="btn btn-outline-danger mb-1">Huỷ đơn</button>
                                    <button type="button" className="btn btn-outline-success mb-1">Đơn đang giao</button>
                                </>
                            )
                        }
                        </div>
                    </div>
                ))
            }

                <div className="row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    <Link to={"/"}>
                        <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Quay về trang chủ</button>
                    </Link>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12">
                    <ul className="pagination mt-4">
                    <li className="page-item disabled">
                        <span className="page-link">Trang trước</span>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active" aria-current="page">
                        <span className="page-link">2</span>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#">Trang sau</a>
                    </li>
                    </ul>
                </div>
                </div>
            </form>
            </div>

        </>
    )
}
export default Orders;