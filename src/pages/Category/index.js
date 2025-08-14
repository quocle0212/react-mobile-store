import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsCategory,  getCategory } from "../../services/Api";
import ProductItem from "../../shared/componenets/Product-item";

const Category = ()=>{
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [total, setTotal] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        getProductsCategory(id, {})
            .then(({ data }) => {

                setProducts(data.data.docs);
                setTotal(data.data.pages.total);
            })
            .catch((error) => console.log(error))

        getCategory(id, {})
            .then(({ data }) => setCategory(data.data.name))
            .catch((error) => console.log(error))
    }, [id]);
    return(
        <>
         <div>
        <div className="products">
            <h3>{category} ({total})</h3>
            <div className="product-list card-deck">
            {
                products.map((products, index) => 
                    <ProductItem key={index} item={products}/>
                  )
            }
            </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
            <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
            </ul> 
        </div>
        </div>

        </>
    )
}

export default Category;