import { useEffect, useState } from "react";
import { getBanners } from "../../../services/Api";
import { getImgBanners } from "../../ultils";
import { Link } from "react-router-dom";

const Sidebar = ()=>{
    const [banners, setBanners] = useState([]);
    const config = {
        params: {
            limit: 9,
            sort: -1
        }
    }
    useEffect(()=>{
        getBanners(config)
            .then(({data})=> setBanners(data.data.docs))
            .catch((error)=> console.log(error))
    },[])

    return(
        <>
        <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
            {
                banners?.map((item, index)=>
                    <div key={index} className="banner-item">
                        <Link href="#"><img className="img-fluid" src={getImgBanners(item?.image)}/></Link>
                    </div>
                )
            }
        </div>
        </div>

        </>
    )
}

export default Sidebar;
