import './index.css'
import {Component } from 'react'
import  { ThreeDots } from 'react-loader-spinner'
import ProductItem from '../ProductItem'

const loadingConstants = {
    start: 'Start',
    pass: 'Pass',
    fail: 'FAIL',
    loading: 'Loading',
    }

class Products extends Component{
    state={products:[],apiStatus:loadingConstants.start}
    
    componentDidMount(){
        this.getProducts()
    }
    
    getProducts=async ()=>{
    this.setState({apiStatus:loadingConstants.loading})
    const apiUrl = "https://fakestoreapi.com/products"
    const apiResponse = await fetch(apiUrl)
    if(apiResponse.ok){
        const apiData = await apiResponse.json()
        
        const caseChangedData = apiData.map(eachProduct=>({
            id:eachProduct.id,
            title:eachProduct.title,
            price:eachProduct.price,
            description:eachProduct.description,
            category:eachProduct.category,
            image:eachProduct.image,
            rating:{rate:eachProduct.rating.rate,count:eachProduct.rating.count}
        }))
        
        this.setState({products:caseChangedData,apiStatus:loadingConstants.pass})
    }
    else{
        this.setState({apiStatus:loadingConstants.fail})
    }
    }
    
    renderPassView=()=>{
        const{products} =this.state
        return(
            <>
            
        <div className='app-background'>
            <h1 className='main-head'>Products</h1>

            <ul className='products-list'>
                {products.map(each => (
                    <ProductItem details={each} key={each.id}/>
                ))}
            </ul>
                
        </div>
            </>
        )
    }

    renderFailView=()=>(
        <>
        <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="not-found"
            className="fail-img"
    />
    <h1>Cannot Find What you are Looking For!</h1>
    </>
    )

    renderLoadingView=()=>(
        <div className="loader-container">
            <ThreeDots type="ThreeDots"  height="100" width="100" />
        </div>
    )

    

    render(){
        const {apiStatus}=this.state
        switch(apiStatus){
            case (loadingConstants.pass):
                return this.renderPassView()
                
            case (loadingConstants.fail):
                return this.renderFailView()
            case (loadingConstants.loading):
                return this.renderLoadingView()
            default:
                return null
            }
            
    }
    

}
export default Products
