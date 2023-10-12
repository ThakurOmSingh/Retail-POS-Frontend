//HOMEPAGE
import React,{useEffect, useState} from 'react'
import DefaultLayout from '../components/defaultLayout';
import Item from '../components/item';
import { Layout,Row , Col } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios'
const HomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [itemsData , setItemsData] = useState([])
  const [selectedCategory , setSelectedCategory ]=useState('Fruits')
  const categories =[
    { 
      name : "Fruits",
      imageURL : 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4',
    },
    { 
      name : "Vegetables",
      imageURL : 'https://iamherbalifenutrition.com/wp-content/uploads/2017/01/Vegan_Hero.jpg'
    },
    { 
      name : "Snacks",
      imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbuFuwTQZ3zqaWHAvXp1giEqjLrt_suo60kg&usqp=CAU'
    },
    { 
      name : "Edible oil",
      imageURL : 'https://www.vilina.in/wp-content/uploads/2022/06/home-page_1.png'
    },
    { 
      name : "Dry fruits",
      imageURL : 'https://5.imimg.com/data5/SELLER/Default/2022/5/ST/QT/GY/38768188/dry-fruits-mix-250g-pkt.jpeg'
    },
  ]
  const dispatch = useDispatch()  

  const getAllItems=()=>{
    dispatch({type:"showLoading"})
    axios.get(`${apiUrl}/api/items/get-all-items`)
    .then((response)=>{
      dispatch({type:"hideLoading"})
      // console.log(response.data)
       setItemsData(response.data)
    }).catch((error)=>{
      dispatch({type:"hideLoading"})
      console.log(error)
    })
  }
  useEffect(() =>{
    getAllItems()
  },[])
  return (<>
    <DefaultLayout>
    <div className='d-flex category-main'>
  {categories.map((category) => {
    return (<div
        onClick={() => setSelectedCategory(category.name)} // Removed 'on' before 'onClick'
        className={`d-flex category ${selectedCategory === category.name && 'selected-category'}`}
        key={category.name} // Add a unique key to each mapped element
      >
        <h4>{category.name}</h4>
        <img src={category.imageURL} height='60' width='80' alt={category.name} />
      </div>
    ); })}
</div>
        <Row gutter={20}>
          {itemsData.filter((i)=>i.category===selectedCategory).map((item)=>{
            return <Col  xs={24} lg={6} md={6} sm={6}>
              <Item key={item._id} item={item}/>
            </Col>
          })}
        </Row></DefaultLayout></>
  );
}
export default HomePage