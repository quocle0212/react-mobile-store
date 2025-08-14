import { useState } from "react";
import Swal from "sweetalert2";
import { signIn } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addInformation } from "../../react-setup/reducers/userInformation";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const clickLogin= (e) => {
        e.preventDefault();
        if (
            Object.values(formData).some(value => !value)
        ) {
            Swal.fire('Thất bại!', 'Vui lòng nhập đủ thông tin.', 'error');
            return;
        }else {
            const loginData = {
                email: formData.email,
                password: formData.password,
            };
            console.log(loginData);
            signIn(loginData)
                .then(({data})=>{
                    console.log(data)
                    dispatch(addInformation(
                        {
                            customer: {
                              _id: data.customer._id,
                              fullName: data.customer.fullName,
                              email: data.customer.email,
                              phone: data.customer.phone,
                              address: data.customer.address,
                              __v: data.customer.__v
                            },
                            accessToken: data.accessToken
                        }
                    ))            
                    Swal.fire('Thành Công!', 'Đăng nhập thành Công', 'success');
                    navigate("/")
                })
                .catch((error)=> {
                    Swal.fire('Thất bại!', 'Đăng nhập thất bại.', 'error');
                    console.log(error)
                })
        }
    };

    return (

        <>
        <div id="customer">
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
            <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                <input onChange={changeInput} placeholder="Mật khẩu (bắt buộc)" type="password" name="password" className="form-control" required />
            </div> 
            </div>
        </form>
        <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link onClick={(e)=>clickLogin(e)}>
                <b>Đăng nhập ngay</b>
            </Link>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={'/'}>
                <b>Quay về trang chủ</b>
            </Link>
            </div>
        </div>
        </div>
        </>
    );
}

export default SignUp;
