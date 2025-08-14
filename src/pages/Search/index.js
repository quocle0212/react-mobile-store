import { useState, useEffect } from "react";
import { getProduct, getProducts } from "../../services/Api";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/componenets/Product-item";
import Pagination from "../../shared/componenets/Pagination ";

const Search = () => {
    const limit = 9;
    const [product, setProduct] = useState([]);
    const [pages, setPages] = useState({
        limit,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const page = Number(searchParams.get("page")) || 1;

    useEffect(()=>{
        getProducts({
            params:{
                name: keyword,
                limit,
                page,
            }
        })
        .then(({data})=>{
            //set products
            setProduct(data.data.docs)
            //set pages
            setPages({...pages, ...data.data.pages})
        })
        .catch((error)=>console.log(error))
    },[keyword, page])
    return (
        <>
            {/*	List Product	*/}
            <div className="products">
                <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                <div className="product-list card-deck">
                    {
                        product?.map((item, index)=>
                        <ProductItem key={index} item={item}/>
                        )
                    }
                </div>
            </div>
            {/*	End List Product	*/}
            <Pagination pages={pages}/>
        </>
    );
}
export default Search;