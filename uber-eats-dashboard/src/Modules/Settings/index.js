import { Form, Input,Card,Button, InputNumber, Result } from "antd";
import { useState,useEffect } from "react";
import GooglePlacesAutocomplete, {getLatLng,geocodeByAddress} from "react-google-places-autocomplete";
import { useAuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import apiRoutes from "../../apiRoutes";
import default_logo from "../../data/assets/logo/default_logo.png"
import {Image} from 'antd';

import {useNavigate} from "react-router-dom";

const Settings =() =>{
    const navigate = useNavigate();
    const {Restaurant,authUser} = useAuthContext();
    const [restuImage,setRestuImage] =  useState();
    const [response,setResponse] =  useState();
    const [displayImage,setDisplayImage] =  useState(default_logo);
    console.log(Restaurant);
    //
  
//restu attributes
const [name,setName] =  useState();
const [lat,setLat] =  useState();
const [lng,setLng] =  useState();
const [minDeliveryTime,setMinDeliveryTime] =  useState();
const [maxDeliveryTime,setMaxDeliveryTime] =  useState();
const [address,setAddress] =  useState();
const [deliveryFee,setDeliveryFee] =  useState();
   /*  const [address, setAddress] = useState(null);
    const [coordinates,setCoordinates] = useState(null);
 
    const getAddressLatLng = async (address) => {
        setAddress(address);
        const geocodedByAddress = await geocodeByAddress(address.label);
        const latlng =  await getLatLng(geocodedByAddress[0]);
        console.log(latlng);
        setCoordinates(latlng)
    } */
    const onSubmit = ({}) =>{

        const formData = new FormData();
        formData.append("name",name);
        formData.append("lat",lat);
        formData.append("lng",lng);
        formData.append("image",restuImage);
        formData.append("minDeliveryTime",minDeliveryTime); 
        formData.append("maxDeliveryTime",maxDeliveryTime);
        formData.append("deliveryFee",deliveryFee);
        formData.append("address",address);
        formData.append("rating",0);
        formData.append("adminID",authUser.id);
        console.log(Restaurant);
        console.log(formData);
        if(Restaurant)
        {
            formData.append("id",Restaurant.id);
            axios.post(apiRoutes.EditRestuarant,formData).then((Result)=>{ setResponse(Result.data);});
        }
        else
        {
             axios.post(apiRoutes.AddRestuarant,formData).then((Result)=>{ setResponse(Result.data);});
        }
        
       
    }
    const updateImage = e =>{
        const reader = new FileReader();
        reader.onload = x =>{
           setDisplayImage(x.target.result);
        }
        reader.readAsDataURL(e.target.files[0])
        setRestuImage(e.target.files[0]);
    }

    useEffect(()=>{
        if(Restaurant)
        {
            setDisplayImage(Restaurant.imageSource)
        }
    },[]);
    useEffect(()=>{
    if(response==="Success")
            {
                console.log("successsss!!!")
                navigate(0);
            }
    },[response])


    return(<Card title="Restaurant Details" style={{margin:20}}>
        <Form layout="vertical" wrapperCol={{span:8}} onFinish={onSubmit}>
            <div style={{width:'50%',float:"left"}}>
            <Form.Item label="Restaurant Name" required>
                <Input placeholder="Enter Restaurant name here" onChange={(e)=>{setName(e.target.value)}} value={Restaurant?.name}/>
            </Form.Item>
           
            <Form.Item label="Latitude"  required>
                <InputNumber onChange={(e)=>{setLat(e.target.value)}} value={Restaurant?.lat}/>
            </Form.Item>
            <Form.Item label="Longitude "  required>
                <InputNumber onChange={(e)=>{setLng(e.target.value)}} value={Restaurant?.lng}/>
            </Form.Item>
            <Form.Item label="Delivery fee " required>
                <InputNumber onChange={(e)=>{setDeliveryFee(e.target.value)}} value={Restaurant?.deliveryFee}/>
            </Form.Item> 
            <Form.Item label="Max Delivery Time"  required>
                <InputNumber onChange={(e)=>{setMaxDeliveryTime(e.target.value)}} value={Restaurant?.maxDeliveryTime}/>
            </Form.Item>
             <Form.Item label="Min Delivery Time"  required>
                <InputNumber onChange={setMinDeliveryTime} value={Restaurant?.minDeliveryTime}/>
            </Form.Item>
            </div>
            <div style={{width:'50%',float:"left"}}>
                <Image style={{height: "250px"}} src={displayImage}  preview={false}/>
            <Form.Item label="Select Restuarant Image" name="image" required>
                <Input type="file" onChange={updateImage}  />
            </Form.Item>
           
            <Form.Item label="Address " required>
                <Input placeholder="Enter address here" onChange={(e)=>{setAddress(e.target.value)}} value={Restaurant?.address}/>
            </Form.Item>
            </div>
           {/*  <Form.Item label="Restaurant Address" required> 
            <GooglePlacesAutocomplete apiKey="*******" 
            selectProps={{
                value:address,
                onChange:setAddress,
            }}/>
            </Form.Item> */}
            <div style={{width:'100%',float:"left"}}>
            <Form.Item >
                <Button type='primary'htmlType='submit' >Submit</Button>
            </Form.Item>
            </div>
        </Form>
    </Card>)
};
export default Settings;