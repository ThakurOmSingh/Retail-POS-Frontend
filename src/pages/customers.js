
import React, { useEffect, useState, useRef } from 'react'
import DefaultLayout from '../components/defaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { Button, Table, Modal, Form, Input, Select, message } from "antd"
import { EyeOutlined, SmileOutlined } from "@ant-design/icons"


const Customers = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // 
  const [billsData, setBillsData] = useState([])
  const dispatch = useDispatch()

  const getAllBills = () => {
    dispatch({ type: "showLoading" })
    axios.get(`${apiUrl}/api/bills/get-customers`)
      .then((response) => {
        dispatch({ type: "hideLoading" })
        const data = response.data
        data.reverse()
        setBillsData(data)
      }).catch((error) => {
        dispatch({ type: "hideLoading" })
        console.log(error)
      })
  }


  useEffect(() => {
    getAllBills()
  }, [])

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber"
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail"
    },
    {
      title: "Created on",
      dataIndex: "createdAt",
      render: (values) => <span>{values.toString().substring(0, 10)}</span>
    },

  ]







  return (
    <>
      <DefaultLayout>
        <div className='d-flex justify content-between'>
          <h3>Customers</h3>
        </div>
        <Table columns={columns} dataSource={billsData} />



      </DefaultLayout>
    </>
  )
}


export default Customers