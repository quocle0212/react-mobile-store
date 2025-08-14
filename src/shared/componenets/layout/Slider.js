import { useEffect, useState } from "react";
import { getSliders } from "../../../services/Api";
import { getImgSliders } from "../../ultils";


const Slider = ()=>{
    const [sliders, setSliders] = useState([]);
    const config = {
        params: {
            limit: 10,
            sort: -1
        }
    }
    useEffect(()=>{
        getSliders(config)
            .then(({data})=> setSliders(data.data.docs))
            .catch((error)=>console.log(error))
    },[])
    return(
        <>
        <div id="slide" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators">
            {
                sliders?.map((item, index)=>
                    <li key={index} data-target="#slide" data-slide-to={index} className={`${index === 0 ? `active` : ''}`}/>
                )
            }
        </ul>
        <div className="carousel-inner">
            {
                sliders?.map((item, index)=>
                    <div key={index} className={`carousel-item ${index === 0 ? `active` : ''}`}>
                        <img src={getImgSliders(item?.image)} alt="Vietpro Academy" />
                    </div>
                )
            }
        </div>
        <a className="carousel-control-prev" href="#slide" data-slide="prev">
            <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#slide" data-slide="next">
            <span className="carousel-control-next-icon" />
        </a>
        </div>

        </>
    )
}

export default Slider;
