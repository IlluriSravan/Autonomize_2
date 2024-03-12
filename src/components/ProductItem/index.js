import './index.css'
import {Link} from 'react-router-dom'
import { FaIndianRupeeSign } from "react-icons/fa6";

const ProductItem = props=>{
    const{details} =props
    
    const{id,title,price,image}=details
    
    return(
        <Link to={`/${id}`}>
        <li className='product-item'>
            
            <img src={image} alt={title} className='product-img'/>
            <h1 className='head'>{title}</h1>
            <div className='price'>
                <FaIndianRupeeSign className='product-rupee'/>
                <p className='para'>{price}</p>
            </div>
            
        </li>
        </Link>
    )
}
export default ProductItem