//REGISTER PAGE
import React,{useEffect} from 'react'
import { Button,  Col,  Form, Input, Row, message } from "antd"
import '../resources/authentication.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'


const Register = () =>{
  
  const apiUrl = process.env.REACT_APP_API_URL;
  // 
const dispatch = useDispatch(); 
const navigate = useNavigate();

const onFinish = (values) =>{

  dispatch({type:'showLoading'});
    axios.post(`${apiUrl}/api/user/register`, values).then((res)=>{
      message.success("Registration Succesfull. Please wait for verification")
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
            <h3>Register</h3>
          <Form.Item name='name' label="Name" >
            <Input placeholder='Enter your Name'/>
          </Form.Item>


          <Form.Item name='userId' label="UserId" >
            <Input placeholder='Enter UserId'/>
          </Form.Item>
          
          <Form.Item name='password' label="Password" >
            <Input placeholder='Enter Password' type='password'/>
          </Form.Item>
          

          <div className="d-flex justify-content-between align-items-center">
            <Link to='/login' className='m-3'>Already Registered? Click here to Login</Link>
            <Button htmlType='submit' type="primary">Register</Button>
          </div>
          </Form>  
            </Col>
        </Row>
    </div>
  )
}

export default Register