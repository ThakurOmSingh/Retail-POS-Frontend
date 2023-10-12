
//LOGIN PAGE
import React, { useEffect } from 'react'
import {  Button,  Col,  Form, Input, Row, message  } from "antd"
import '../resources/authentication.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
// import { Navigate } from 'react-router-dom'
const Login =() => {
  
  const apiUrl = process.env.REACT_APP_API_URL;
  // 
  const dispatch = useDispatch(); 
  const navigate  = useNavigate()
  const onFinish = (values) =>{
  
    dispatch({type:'showLoading'});
      axios.post(`${apiUrl}/api/user/login`, values).then((res)=>{
        message.success("Login Succesfull.")
        localStorage.setItem('pos-user' , JSON.stringify(res.data))
        navigate('/home')
        dispatch({type:'hideLoading'})
      }).catch((error)=>{
        message.error("something went wrong")
      })
  }
  useEffect(() =>{
    if(localStorage.getItem('pos-user')){
      navigate('/home')
    }
  },[])

  return (
    <div className='authentication'>
        <Row>
            <Col lg={8} xs={22}>
            <Form 
        layout='vertical' onFinish={onFinish}
        >
            <h1><b>Retail POS</b></h1><hr/>
            <h3>Login</h3>
          {/* <Form.Item name='name' label="Name" >
            <Input placeholder='Enter your Name'/>
          </Form.Item> */}


          <Form.Item name='userId' label="User Id" >
            <Input placeholder='Enter UserId'/>
          </Form.Item>
          
          <Form.Item name='password' label="Password" >
            <Input placeholder='Enter Password' type='password'/>
          </Form.Item>
          

          <div className="d-flex justify-content-between align-items-center">
            <Link to='/register' className='m-3'>Not Registered Yet? Click here to Register</Link>
            <Button htmlType='submit' type="primary">Login</Button>
          </div>
          </Form>  
            </Col>
        </Row>
    </div>
    )
}
export default Login