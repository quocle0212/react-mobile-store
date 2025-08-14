import { useSelector } from "react-redux";
import { formatNumber, getImg } from "../../shared/ultils";
import { useDispatch } from "react-redux";
import { deleteItemCart, resetCart, updateItemCart } from "../../react-setup/reducers/cart";
import { useEffect, useState } from "react";
import { createOrders } from "../../services/Api";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = ()=>{
    const items = useSelector(({cart})=>cart.items);
    const user = useSelector(({userInformation})=>userInformation.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({});
    const newItems = items?.map((item)=>({
        prd_id: item._id,
        price: item.price,
        qty: item.qty
    }))
    console.log(customer);
    
    const changeInputCustomer = (e)=>{
        const{name, value} = e.target
        return setCustomer({...customer, [name]: value})
    }
    const changeQty = (e, id)=>{
        const value = Number(e.target.value);
        if (value === 0) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xoá sản phẩm này',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
            }).then((result)=>{
                if (result.isConfirmed) { 
                    dispatch(deleteItemCart(
                        {
                            _id: id,
                        }
                    ))
                }else{
                    console.log("ngu");
                    
                    return;
                }
            })
        }else{
            dispatch(updateItemCart(
                {
                    _id: id,
                    qty: value,
                }
            ))
        }
    }

    console.log(
        {
            ...customer,
            items: newItems,
        }
    ); 
    console.log(newItems);
        
    const clickOrder = (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire('Chưa Đăng Nhập!', 'Bạn cần đăng nhập để mua hàng', 'error');
        } else {
            const requiredFields = ["fullName", "email", "phone", "address"];
            const isComplete = requiredFields.every(field => !!customer[field]);
    
            if (isComplete) {
                const isCompleteCart = 
                    Array.isArray(newItems) && 
                    newItems.length > 0 && 
                    newItems.every(item => item.prd_id && item.price > 0 && item.qty > 0);
    
                if (isCompleteCart) {
                    createOrders({
                        ...customer,
                        items: newItems,
                    })
                    .then(({ data }) => {
                        if (data.status === "success") {
                            dispatch(resetCart());
                            navigate("/Success");
                        }
                    })
                    .catch((error) => console.log(error));
                } else {
                    Swal.fire('Chưa có sản phẩm', 'Bạn chưa có sản phẩm nào trong giỏ hàng', 'error');
                }
            } else {
                Swal.fire('Thiếu thông tin', 'Vui lòng nhập đủ thông tin', 'error');
            }
        }
    };
    
    
    const clickDeteleItems = (e, id)=>{
        e.preventDefault();
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xoá sản phẩm này',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result)=>{
            if (result.isConfirmed) {
                dispatch(deleteItemCart(
                    {
                        _id: id,
                    }
                ))
            }
        })
    }

    useEffect(()=>{
        setCustomer(
            {
                customer_id: user?.customer?._id,
                fullName: user?.customer?.fullName,
                email: user?.customer?.email,
                phone: user?.customer?.phone,
                address: user?.customer?.address,
                totalPrice: items.reduce((total, item)=> total+item.qty*item.price ,0)
            }
        )
    },[])

    return(
        <>
        <div>
        <div id="my-cart">
            <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div> 
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div> 
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>    
            </div>  
            <form method="post">
                {
                    items?.map((item, index)=>
                        <div className="cart-item row">
                        <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <img src={getImg(item.image)} />
                        <h4>{item.name}</h4>
                        </div> 
                        <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                        <input onChange={(e)=>changeQty(e, item._id)} 
                        type="number" 
                        id="quantity" 
                        className="form-control form-blue quantity" 
                        value={item.qty}
                        max={10}/>
                        </div> 
                        <div onClick={(e)=>clickDeteleItems(e, item._id)} className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{formatNumber(item.price)}</b><a href="#">Xóa</a></div>
                    </div> 
                    )
                }
            <div className="row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" /> 
                <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div> 
                <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>
                    {
                        formatNumber(items.reduce((total, item)=> total+item.qty*item.price ,0))
                    }
                </b></div>
            </div>
            </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
            <form method="post">
            <div className="row">
                <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                value={customer?.fullName}
                onChange={changeInputCustomer} 
                placeholder="Họ và tên (bắt buộc)" 
                type="text" name="fullName" 
                className="form-control" required />
                </div>
                <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                value={customer?.phone}
                onChange={changeInputCustomer} 
                placeholder="Số điện thoại (bắt buộc)" 
                type="text" name="phone" 
                className="form-control" 
                required />
                </div>
                <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input 
                value={customer?.email}
                onChange={changeInputCustomer} 
                placeholder="Email (bắt buộc)" 
                type="text" 
                name="email" 
                className="form-control" 
                required />
                </div>
                <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <textarea 
                value={customer?.address}
                onChange={changeInputCustomer} 
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" 
                type="text" 
                name="address" 
                className="form-control" 
                required />
                </div>
            </div>
            </form>
            <div className="row">
            <div onClick={(e)=>clickOrder(e)} className="by-now col-lg-6 col-md-6 col-sm-12">
                <a href="#">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
                </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
                <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
                </a>
            </div>
            </div>
        </div>
        {/*	End Customer Info	*/}
        </div>

        </>
    )
}

export default Cart;