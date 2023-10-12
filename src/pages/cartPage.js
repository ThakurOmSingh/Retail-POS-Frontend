

import React, { useEffect, useState } from "react"
import DefaultLayout from "../components/defaultLayout"
import { useSelector, useDispatch } from "react-redux"
// import { Button, Modal, Table } from "antd"
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined

} from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd"
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
// 

    const { cartItems } = useSelector(state => state.rootReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [billChargedModel, setBillChargedModel] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const increaseQuantity = (record) => {
        dispatch({
            type: "updateCart",
            payload: { ...record, quantity: record.quantity + 1 },
        })
    }
    const decreaseQuantity = (record) => {
        if (record.quantity !== 1) {
            dispatch({
                type: "updateCart",
                payload: { ...record, quantity: record.quantity + -1 },
            })
        }

    }


    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => <img src={image} alt="" height="60" width="60" />,
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Quantity",
            dataIndex: "_id",
            render: (id, record) => <div>
                <PlusCircleOutlined className="mx-3" onClick={() => increaseQuantity(record)} />
                <b>{record.quantity}</b>
                <MinusCircleOutlined className="mx-3" onClick={() => decreaseQuantity(record)} />
            </div>
        },
        {
            title: "Actions",
            dataIndex: '_id',
            render: (_id, record) => <DeleteOutlined onClick={() => dispatch({ type: 'deleteFromCart', payload: record })} />

        },


    ]

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp = temp + (item.price * item.quantity)

        });
        setSubtotal(temp)

    }, [cartItems])

    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subtotal,
            cartItems,
            tax: Number(((subtotal / 100) * 10).toFixed(2)),
            totalAmount: Number(subtotal + ((subtotal / 100) * 10)),
            userId: JSON.parse(localStorage.getItem('pos-user'))._id,
        }

        console.log(reqObject)

        axios.post(`${apiUrl}/api/bills/charge-bill`, reqObject).then(() => {
            message.success("Billing done successfully")
            setBillChargedModel(false)
            navigate('/bills')
        }).catch((error) => {
            message.error("something went wrong")
            console.log(error)
        })

    }


    return (
        <>
            <DefaultLayout>
                <div className='d-flex justify content-between'>
                    <h3>Cart</h3>
                </div>
                <Table columns={columns} dataSource={cartItems} />
                <div className="d-flex justify-content-end flex-column align-items-end">
                    <div className="subtotal">
                        <h3>SUB TOTAL : <b>{subtotal} Rs/-</b></h3>
                    </div>
                    <Button onClick={() => setBillChargedModel(true)} type="primary">Charge Bill</Button>
                </div>

                <Modal title='Charge Bill' visible={billChargedModel} footer={false} onCancel={() => setBillChargedModel(false)}>
                    <Form
                        // initialValues={editingItem}
                        layout='vertical'
                        onFinish={onFinish}
                    >

                        <Form.Item name='customerName' label="Customer Name" >
                            <Input placeholder='Enter Customer name' />
                        </Form.Item>

                        <Form.Item name='customerEmail' label="Customer Email" >
                            <Input placeholder='Enter Customer Email id' />
                        </Form.Item>

                        <Form.Item name='customerPhoneNumber' label="Phone " >
                            <Input placeholder='Enter customer phone number' />
                        </Form.Item>

                        <Form.Item name='paymentMode' label="Payment Mode" >
                            <Select>
                                <Select.Option value='cash'>Cash</Select.Option>
                                <Select.Option value='card'>Card</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="charge-cill-amount">
                            <h5>SubTotal : <b>{subtotal} Rs/-</b></h5>
                            <h5>tax : <b>{((subtotal / 100) * 10).toFixed(2)} Rs/-</b></h5>
                            <hr />
                            <h2>Grand Total : <b>{subtotal + ((subtotal / 100) * 10)}</b></h2>
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button htmlType='submit' type="primary">Generate Bill</Button>
                        </div>
                    </Form>
                </Modal>
            </DefaultLayout>
        </>
    )
}
export default Cart