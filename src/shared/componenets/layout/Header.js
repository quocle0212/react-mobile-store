import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetInformation } from "../../../react-setup/reducers/userInformation"
import Swal from "sweetalert2";

const Header = () => {
    const [btnStatus, setBtnStatus] = useState(false);
    const newUser = useSelector(({userInformation})=>userInformation.user);
    const dispatch = useDispatch();
    console.log("thong tin: ", newUser);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    // Hàm xử lý khi thay đổi input
    const changeKetword = (e) => setKeyword(e.target.value);
    const totalCartItems = useSelector(({cart})=>cart.items.reduce((total, item)=>total+item.qty,0))
    const clickSearch = ()=> {
        navigate(`/Search?keyword=${keyword}`)
        console.log(keyword);  // Kiểm tra giá trị của keyword
    };
    const enterSearch = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            clickSearch();
          }
    }

    const logOutClick = (e)=>{
        e.preventDefault();
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(resetInformation());
                setBtnStatus(!btnStatus);
                    }
        });
    }

    useEffect(()=>{

    },[btnStatus])

    return (
        <>
            {/* Header */}
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
                            <h1><Link to="/"><img className="img-fluid" src="images/logo.png" /></Link></h1>
                        </div>
                        <div id="search" className="col-lg-4 col-md-12 col-sm-12">
                            <form className="form-inline">
                                <input
                                    className="form-control mt-3"
                                    type="search"
                                    placeholder="Tìm kiếm"
                                    aria-label="Search"
                                    onChange={changeKetword}
                                    onKeyDown={enterSearch}
                                    value={keyword} />
                                <button onClick={clickSearch} className="btn btn-danger mt-3" type="button">
                                    Tìm kiếm
                                </button>
                            </form>
                        </div>
                        <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
                            <i className="fa-solid fa-user mr-1" />
                            {newUser && Object.keys(newUser).length > 0 ? (
                                <>
                                    <Link className="mr-2" to="/Profile">{newUser?.customer?.fullName}</Link>|
                                    <Link onClick={(e)=>logOutClick(e)} className="mr-2 ml-2" style={{ cursor: 'pointer' }}>Đăng xuất</Link>|
                                </>
                            ) : (
                                <>
                                <Link className="mr-2" to="/SignIn">Đăng nhập</Link>|
                                <Link className="mr-2 ml-2" to="/SignUp">Đăng ký</Link>|
                                </>
                            )}
                            <Link className="mt-4 mr-2 ml-2">giỏ hàng
                                <ul>
                                    <li>
                                        <Link to="/Cart"><i className="fas fa-shopping-cart" /> Giỏ hàng của bạn</Link>                                       
                                    </li>
                                    <li>
                                        <Link to="/Orders"><i className="fas fa-file-alt" /> Đơn hàng đã mua</Link>                                       
                                    </li>
                                </ul>
                            </Link>
                            <span className="mt-3">{totalCartItems}</span>
                        </div>
                    </div>
                </div>
                {/* Toggler/collapsibe Button */}
                <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            {/* End Header */}
        </>
    );
}
export default Header;