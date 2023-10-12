import React from 'react';
import { Button } from 'antd';
import '../resources/items.css'
import { useDispatch } from 'react-redux'
import { rootReducer } from '../redux/rootReducer';

function Item({item}) {
const dispatch = useDispatch()
const addTocart = ()=>{
  
  dispatch({type:'addToCart' , payload : {...item , quantity : 1}})
  
  // console.log("i am clicked")
  // console.log(dispatch({type:'addTocart' , payload : item})
  // )
}

  return (
    <div className='item' key={item.key}>
        <h4 className='name'>{item.name}</h4>
        <p className='item-image'><img  src={item.image} alt="item image" height='100' width='100'/></p>
        <h4 className='price'><b>Price :</b>{item.price} Rs/-</h4>
        <div className="d-flex justify-content-end">
            <Button onClick={() => {addTocart()}}>Add to cart</Button>
        </div>
        </div>
  )
}

export default Item