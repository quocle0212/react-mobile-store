import { Link } from "react-router-dom";
import { formatNumber, getImg } from "../ultils";

const ProductItem = ({item})=>{
    return(
        <>
        <div className="product-item card text-center">
                <Link to={`/ProductDetails-${item._id}`}><img src={getImg(item.image)} /></Link>
                <h4><Link to={`/ProductDetails-${item._id}`} >{item.name}</Link></h4>
                <p>Giá Bán: <span>{formatNumber(item.price)}</span></p>
              </div>
        </>
    )
}
export default ProductItem;