import { useEffect, useState } from "react";
import ProductItem from "../../shared/componenets/Product-item";
import { getProducts } from "../../services/Api";

const Home = ()=>{
  const [products, setproducts] = useState([]);
  const [featuredProducts, setfeaturedProducts] = useState([]);
  useEffect(()=>{
    getProducts({
      params:{
        limit: 6,
        is_featured: true,
      }
    })
      .then(({data}) => setfeaturedProducts(data.data.docs))
      .catch((error)=> console.log(error))
  },[]);

  useEffect(()=>{
    getProducts({
      params:{
        limit: 6,
      }
    })
      .then(({data}) => setproducts(data.data.docs))
      .catch((error)=> console.log(error))
  },[]);
    return(
        <>
        {/*	Feature Product	*/}
        <div className="products">
            <h3>Sản phẩm nổi bật</h3>
            <div className="product-list card-deck">
            {
              featuredProducts.map((featuredProducts, index) => 
                <ProductItem key={index} item={featuredProducts}/>
              )
            }
            </div>
          </div>
          {/*	End Feature Product	*/}
          {/*	Latest Product	*/}
          <div className="products">
            <h3>Sản phẩm mới</h3>
            <div className="product-list card-deck">
            {
              products.map((products, index) => 
                <ProductItem key={index} item={products}/>
              )
            }          
            </div>
          </div>
          {/*	End Latest Product	*/}          
        </>
    )
}

export default Home;