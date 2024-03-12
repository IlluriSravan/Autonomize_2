import './index.css'
import { useEffect,useState } from 'react'
import  { ThreeDots } from 'react-loader-spinner'

import { FaRegStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useParams } from 'react-router-dom';

const loadingConstants = {
    start: 'Start',
    pass: 'Pass',
    fail: 'FAIL',
    loading: 'Loading',
    }

const SelectedItem =props=>{
    
    const{id}=useParams()
    const [product,setProduct]=useState([])
    const [apiStatus,setApiStatus]=useState(loadingConstants.start)
    
    useEffect(()=>{
        const getProducts=async ()=>{
        setApiStatus(loadingConstants.loading)
        const apiUrl = `https://fakestoreapi.com/products/${id}`
        const apiResponse = await fetch(apiUrl)
        if(apiResponse.ok){
            const apiData = await apiResponse.json()
            const caseChangedData = {
                id:apiData.id,
                title:apiData.title,
                price:apiData.price,
                description:apiData.description,
                category:apiData.category,
                image:apiData.image,
                rate:apiData.rating.rate,
                count:apiData.rating.count}
            setProduct(caseChangedData)
            setApiStatus(loadingConstants.pass)
        }
        else{
            setApiStatus(loadingConstants.fail)
        }
        }
        getProducts()
    },[id])

    const renderPassView=()=>(
        <>
        <div className='product'>
            <img src={product.image}  alt={product.title} className='prod-img'/>
            <div className='prod-data'>
                <h1 className='selected-head'>{product.title}</h1>
                <div className='price'>
                    <FaIndianRupeeSign className='rupee'/>
                    <h1>{product.price}</h1>
                </div>
                <div className='rating'>
                    <p>{product.rate}</p>
                    <FaRegStar className='star'/>
                </div>
                <p>{product.count} ratings</p>
                <p className='description'>{product.description}</p>
            </div>
            
        </div>
        </>
    )

    const renderFailView=()=>(
        <div>
        <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="not-found"
            className="fail-img"
    />
    </div>
    )

    const renderLoadingView=()=>(
        <div className="loader-container">
            <ThreeDots type="ThreeDots"  height="100" width="100" />
        </div>
    )

    const renderConditions=()=>{
        switch(apiStatus){
            case (loadingConstants.pass):
                return renderPassView()
                
            case (loadingConstants.fail):
                return renderFailView()
            case (loadingConstants.loading):
                return renderLoadingView()
            default:
                return null
            }
    }

    return(
        renderConditions()
    )
}
export default SelectedItem