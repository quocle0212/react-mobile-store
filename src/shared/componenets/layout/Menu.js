import { useEffect, useState } from "react";
import { getCategories } from "../../../services/Api";
import { Link } from "react-router-dom";

const Menu = ()=>{
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        getCategories()
            .then(({data}) => setCategories(data.data.docs))
            .catch((error) => console.log(error));
    }, [])
    return(
        <>
        <div id="menu" className="collapse navbar-collapse">
            <ul>
            {
                categories.map((item, index)=>
                    <li key={index} className="menu-item">
                        <Link to={`/Category-${item._id}`}>{item.name}</Link>
                    </li>
                )
            }
            </ul>
        </div>
        </>
    )
}

export default Menu;