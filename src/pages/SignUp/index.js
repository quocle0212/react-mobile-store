import { useState } from "react";
import Swal from "sweetalert2";
import { register } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });
    const navigate = useNavigate();
    const changeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const clickCreateAccount = (e) => {
        e.preventDefault();
        if (
            Object.values(formData).some(value => !value)
        ) {
            Swal.fire('Thất bại!', 'Vui lòng nhập đủ thông tin.', 'error');
            return;
        }else if (formData.password !== formData.confirmPassword) {
            Swal.fire('Thất bại!', 'Mật khẩu không trùng nhau.', 'error');
            return;
        }else {
            const data = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address
            };
            console.log(data);
            
            register(data)
                .then(({ data }) => {
                    console.log(data);
                    Swal.fire('Thành Công!', 'Tạo Tài Khoản thành công', 'success');
                    navigate("/signIn");
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        let setErrorMessage = "";
                        const errorMessage = error.response.data;
                        if (errorMessage === "phone exists") {
                            setErrorMessage = "Số Điện Thoại đã tồn tại";
                        } else if (errorMessage === "email exists") {
                            setErrorMessage = "Email đã tồn tại";
                        }
                        Swal.fire('Thất bại!', setErrorMessage, 'error'); 
                        console.log("Thông báo: ", setErrorMessage);
                    } else {
                        Swal.fire('Thất bại!', 'Tạo Tài Khoản thất bại.', 'error');
                        console.log("Thông báo lỗi không xác định: ", error);
                    }
                });
        }
    };

    return (
        <>
        <div id="customer">
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
            <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Họ và tên (bắt buộc)" type="text" name="fullName" className="form-control" required />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required />
            </div>  
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Mật khẩu (bắt buộc)" type="password" name="password" className="form-control" required />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Nhập Lại Mật khẩu (bắt buộc)" type="password" name="confirmPassword" className="form-control" required />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required />
            </div>
            <div id="customer-add" className="col-lg-6 col-md-6 col-sm-12">
                <textarea onChange={changeInput} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" required />
            </div>
            </div>
        </form>
        <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link onClick={(e)=>clickCreateAccount(e)}>
                <b>Đăng ký ngay</b>
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
}

export default SignUp;
