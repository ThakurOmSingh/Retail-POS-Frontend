

import React, { useEffect, useState, useRef } from 'react'
import DefaultLayout from '../components/defaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { Button, Table, Modal, Form, Input, Select, message } from "antd"
import { EyeOutlined, SmileOutlined } from "@ant-design/icons"
import { useReactToPrint } from 'react-to-print';

const Bills = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
// 


  const [billsData, setBillsData] = useState([])
  const componentRef = useRef();
  const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null)
  const dispatch = useDispatch()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log("handlePrint:", handlePrint);


  const getAllBills = () => {
    dispatch({ type: "showLoading" })
    axios.get(`${apiUrl}/api/bills/get-bills`)
      .then((response) => {
        dispatch({ type: "hideLoading" })
        // console.log(response.data)
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
      title: "ID",
      dataIndex: "_id"
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (values) => <span>{values.toString().substring(0, 10)}</span>
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Sub Amount",
      dataIndex: "subtotal"
    },
    {
      title: "Tax",
      dataIndex: "tax"
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount"
    },

    {
      title: "Actions",
      dataIndex: '_id',
      render: (_id, record) => <div className='d-flex'>
        <EyeOutlined className='mx-2' onClick={() => {
          setSelectedBill(record)
          setPrintBillModalVisibility(true)
        }} />
      </div>

    },


  ]


  const billcolumns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Price",
      dataIndex: "price"
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => <div>
        <b>{record.quantity}</b>
      </div>
    },
    {
      title: "Total Price",
      dataIndex: "_id",
      render: (id, record) => <div>
        <b>{record.quantity * record.price} Rs/-</b>
      </div>
    },




  ]





  return (
    <>
      <DefaultLayout>
        <div className='d-flex justify content-between'>
          <h3>Bills</h3>
        </div>

        <Table columns={columns} dataSource={billsData} />

        <Modal onCancel={() => { setPrintBillModalVisibility(false) }} visible={printBillModalVisibility}
          title={"BILL"} footer={false} width={800}>

          {selectedBill && (<>
            <div className='bill-model p-3' ref={componentRef}>

              <div className='d-flex justify-content-between bill-header'>
                <div>
                  <h1><b>ABC Store</b></h1>
                </div>
                <div>
                  <p>Chiranjeev Vihar, Ghaziabad </p>
                  <p>Uttar Pradesh, 201001</p>
                  <p>8744929960</p>
                </div>
              </div>
              <div className='bill-customer-details mt-3'>
                <p><b>Name</b> : {selectedBill.customerName}</p>
                <p><b>Phone Number</b> : {selectedBill.customerPhoneNumber}</p>
                <p><b>Email</b> : {selectedBill.customerEmail}</p>
                <p><b>Date</b> : {selectedBill.createdAt.toString().substring(0, 10)}</p>
              </div>
              <Table dataSource={selectedBill.cartItems} columns={billcolumns} pagination={false} ></Table>


              <div className='dotted-border mt-2 pb-2'>
                <p><b>Sub Total</b> : {selectedBill.subtotal} Rs/-</p>
                <p><b>Tax</b> : {selectedBill.tax} Rs/-</p>
              </div>

              <div className='mt-2'>
                <h2><b>Grand Total : {selectedBill.totalAmount} Rs/-</b></h2>
              </div>

              <div className='dotted-border mt-2 pb-2'></div>

              <div className='text-center'>
                <p>Thankyou! Have a nice day</p>
                <p>Visit Again</p>
                <p><SmileOutlined /> <SmileOutlined /> <SmileOutlined /> <SmileOutlined /></p>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <Button type='primary' onClick={handlePrint}>Print</Button>

            </div>

          </>
          )}


        </Modal>


      </DefaultLayout>
    </>
  )
}

export default Bills