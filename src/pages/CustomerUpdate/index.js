import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateCustomer } from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { updateInformation } from "../../react-setup/reducers/userInformation";

const CustomerUpdate = () => {
    const dispatch = useDispatch();
    const userFromStore = useSelector(({ userInformation }) => userInformation.user);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: ""
    });

    const changeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hàm kiểm tra các trường dữ liệu có rỗng hay không
    const validateForm = () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin!', 'error');
            return false;
        }
        return true;
    };

    const clickLogin = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        Swal.fire({
            title: 'Bạn có chắc chắn muốn cập nhập thông tin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateCustomer(userFromStore?.customer?._id, formData)
                    .then(({ data }) => {
                        console.log(data);
                        dispatch(updateInformation(formData));
                        Swal.fire('Thành Công!', 'Cập nhập thành công', 'success');
                    })
                    .catch((error) => {
                        if (error.response && error.response.data) {
                            let setErrorMessage = "";
                            const errorMassage = error.response.data;
                            if (errorMassage === "phone exists") {
                                setErrorMessage = "Số điện thoại đã tồn tại";
                            }
                            Swal.fire('Thất bại!', setErrorMessage, 'error');
                        } else {
                            Swal.fire('Thất bại!', 'Cập nhập thất bại.', 'error');
                            console.log(error);
                        }
                    });
            }
        });
    };

    useEffect(() => {
        setFormData({
            fullName: userFromStore?.customer?.fullName,
            phone: userFromStore?.customer?.phone,
            address: userFromStore?.customer?.address
        });
    }, [userFromStore]);

    return (
        <>
            <div id="customer">
                <h3 className="text-center">Thông tin tài khoản</h3>
                <form method="post">
                    <div className="row">
                        <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                            <input onChange={changeInput} placeholder="Họ và tên (bắt buộc)" type="text" name="fullName" className="form-control" value={formData?.fullname || ""} required />
                        </div>
                        <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                            <input disabled placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" value={userFromStore?.customer?.email} required />
                        </div>
                        <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                            <input onChange={changeInput} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" value={formData?.phone || ""} required />
                        </div>
                        <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                            <input disabled placeholder="Mật khẩu (bắt buộc)" type="password" name="password" className="form-control" defaultValue={123456} required />
                        </div>
                        <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                            <textarea onChange={changeInput} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" value={formData?.address || ""} required />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <Link onClick={(e) => clickLogin(e)} to={"/profile"}>
                            <b>Cập nhật ngay</b>
                        </Link>
                    </div>
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <Link to={"/"}>
                            <b>Quay về trang chủ</b>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerUpdate;
