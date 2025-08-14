import { useEffect, useState } from "react";
import { getComentsProduct, getProduct, creatComentsProduct } from "../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatNumber, getImg } from "../../shared/ultils";
import { addToCart } from "../../react-setup/reducers/cart";

const ProductDetails = () => {
    const [products, setProducts] = useState({});
    const [comments, setComment] = useState([]);
    const [data, setData] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const clickAddToCart = (type) => {
        if (products) {
            dispatch(
                addToCart({
                    _id: id,
                    name: products.name,
                    image: products.image,
                    price: products.price,
                    qty: 1,
                })
            );
            if (type === "buy-now") return navigate("/cart");
        }
    };

    const clickSubmit = () => {
        creatComentsProduct(id, data).then(({ data }) => {
            if (data.status === "success") {
                setData({});
                getComments(id);
            }
        });
    };

    const getComments = (id) => {
        getComentsProduct(id)
            .then(({ data }) => setComment(data.data.docs))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProduct(id)
            .then(({ data }) => setProducts(data.data))
            .catch((error) => console.log(error));

        getComments(id);
    }, [id]);

    return (
        <div>
            <div id="product">
                <div id="product-head" className="row">
                    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                        <img src={getImg(products?.image)} alt={products?.name || "Product Image"} />
                    </div>
                    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                        <h1>{products?.name}</h1>
                        <ul>
                            <li><span>Bảo hành:</span> 12 </li>
                            <li><span>Đi kèm:</span> {products?.accessories}</li>
                            <li><span>Tình trạng:</span> {products?.status}</li>
                            <li><span>Khuyến Mại:</span> {products?.promotion}</li><br/>
                            <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                            <li id="price-number">{formatNumber(products?.price)}</li>
                            <li className={products?.is_stock ? "" : "text-danger"} id="status">
                                {products.is_stock ? "Còn Hàng" : "Hết Hàng"}
                            </li>
                        </ul>
                        <button onClick={() => clickAddToCart("buy-now")} className="btn btn-warning mr-2">Mua ngay</button>
                        <button onClick={() => clickAddToCart()} className="btn btn-info">Thêm vào giỏ hàng</button>
                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {products?.name}</h3>
                        {products?.details}
                    </div>
                </div>
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Tên:</label>
                                <input onChange={changeInput} name="name" required type="text" className="form-control" value={data.name || ""} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input onChange={changeInput} name="mail" required type="email" className="form-control" value={data.mail || ""} />
                            </div>
                            <div className="form-group">
                                <label>Nội dung:</label>
                                <textarea onChange={changeInput} name="details" required rows={8} className="form-control" value={data.details || ""} />
                            </div>
                            <button onClick={clickSubmit} type="button" className="btn btn-primary">Gửi</button>
                        </form>
                    </div>
                </div>
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="comment-item">
                            {comments?.map((item, index) => (
                                <ul key={index}>
                                    <li><b>{item.name}</b></li>
                                    <li>{item.createdAt}</li>
                                    <li>
                                        <p>{item.content}</p>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
