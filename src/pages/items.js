
//ITEMS PAGE
import React,{useEffect, useState} from 'react'
import DefaultLayout from '../components/defaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { Button, Table ,Modal, Form, Input, Select, message } from "antd"
import {DeleteOutlined,
  EditOutlined 
} from "@ant-design/icons"
import FormItem from 'antd/es/form/FormItem';
import ButtonGroup from 'antd/es/button/button-group';

const Items = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // 
  const [itemsData , setItemsData] = useState([])
  const [addEditModalVisibility , setAddEditModalVisibility]=useState(false);
  const [editingItem, setEditingItem]=useState(null)
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

  const deleteItem=(record)=>{
    dispatch({type:"showLoading"})
    axios.post('http://localhost:5000/api/items/delete-item',{itemId: record._id})
    .then((response)=>{
      dispatch({type:"hideLoading"})
      message.success('Item deleted succesfully')
      getAllItems()
    }).catch((error)=>{
      dispatch({type:"hideLoading"})
      console.log(error)
    })
  }

  useEffect(() =>{
    getAllItems()
  },[])

  const  columns = [
    {
        title : "Name",
        dataIndex : "name"
    },
    {
        title : "Image",
        dataIndex : "image",
        render : (image,record) => <img src={image} alt="" height="60"  width="60" />,
    },
    {
        title : "Price",
        dataIndex : "price"
    },
    {
      title : "Category",
      dataIndex : "category"
  },
    {
        title : "Actions",
        dataIndex : '_id',
        render : (_id,record) => <div className='d-flex'>
          <EditOutlined className='mx-2' onClick={()=>{
          setEditingItem(record)
          setAddEditModalVisibility(true)
        }}/>
          <DeleteOutlined   className='mx-2' onClick={()=>deleteItem(record)}/>
          </div>
        
    },


]

const onFinish =(values) =>{
  dispatch({type:"showLoading"})
  if(editingItem===null){
    axios.post('http://localhost:5000/api/items/add-item', values)
    .then((response)=>{
      dispatch({type:"hideLoading"})
      message.success('Item added successfully')
      setAddEditModalVisibility(false)
      getAllItems()
    }).catch((error)=>{
      dispatch({type:"hideLoading"})
      console.log(error)
    })
  }else{
    axios.post('http://localhost:5000/api/items/edit-item', { ...values, itemId: editingItem._id })
        .then((response) => {
            dispatch({ type: "hideLoading" });
            message.success('Item edited successfully');
            console.log(response);
            setEditingItem(null);
            setAddEditModalVisibility(false);
            getAllItems();
        })
        .catch((error) => {
            dispatch({ type: "hideLoading" });
            console.log(error);
        });
  }

}



  return (
    <>
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
      <h3>Items</h3>
      <Button type='primary' onClick={()=> setAddEditModalVisibility(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData}/>
    
      {addEditModalVisibility && (<Modal onCancel={()=>{setAddEditModalVisibility(false) ; setEditingItem(null)}} visible={addEditModalVisibility} 
      title={`${editingItem !==null ? 'Edit Item' : 'Add New Item'}`} footer={false}>
        
        
        <Form 
        initialValues={editingItem}
        layout='vertical' onFinish={onFinish}>
        
          <Form.Item name='name' label="Name" >
            <Input placeholder='Enter product name'/>
          </Form.Item>
          
          <Form.Item name='category' label="Product Category" >
            <Select>
              <Select.Option value='Fruits'>Fruits</Select.Option>
              <Select.Option value='Vegetables'>Vegetables</Select.Option>
              <Select.Option value='Snacks'>Snacks</Select.Option>
              <Select.Option value='Edible oil'>Edible oil</Select.Option>
              <Select.Option value='Dry fruits'>Dry Fruits</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name='price' label="Price" >
            <Input placeholder='Enter the price per Kg or per Unit'/>
          </Form.Item>
          
          <Form.Item name='image' label="Image Url" >
            <Input placeholder='Paste image url'/>
          </Form.Item>
          

          <div className="d-flex justify-content-end">
            <Button htmlType='submit' type="primary">Save</Button>
          </div>
          </Form>  


      </Modal>)} 

    </DefaultLayout>
    </>
  )
}
export default Items