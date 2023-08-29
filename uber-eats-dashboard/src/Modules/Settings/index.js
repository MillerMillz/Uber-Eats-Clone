import { Form, Input,Card,Button, InputNumber, Result } from "antd";
import { useState,useEffect } from "react";
import GooglePlacesAutocomplete, {getLatLng,geocodeByAddress} from "react-google-places-autocomplete";
import { useAuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import apiRoutes from "../../apiRoutes";

import {useNavigate} from "react-router-dom";

const Settings =() =>{
    const navigate = useNavigate();
    const {Restaurant,authUser} = useAuthContext();
    const [restuImage,setRestuImage] =  useState();
    const [response,setResponse] =  useState();
   /*  const [address, setAddress] = useState(null);
    const [coordinates,setCoordinates] = useState(null);
 
    const getAddressLatLng = async (address) => {
        setAddress(address);
        const geocodedByAddress = await geocodeByAddress(address.label);
        const latlng =  await getLatLng(geocodedByAddress[0]);
        console.log(latlng);
        setCoordinates(latlng)
    } */
    const onSubmit = ({name,lat,lng,minDeliveryTime,maxDeliveryTime,deliveryFee,address}) =>{

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
        axios.post(apiRoutes.AddRestuarant,formData).then((Result)=>{ setResponse(Result.data);});
        
       
    }
    const updateImage = e =>{
        setRestuImage(e.target.files[0]);
    }
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
            <Form.Item label="Restaurant Name" name="name" required>
                <Input placeholder="Enter Restaurant name here" value={Restaurant?.name}/>
            </Form.Item>
            <Form.Item label="Select Restuarant Image" name="image" required>
                <Input type="file" onChange={updateImage} />
            </Form.Item>
            <Form.Item label="Latitude" name="lat" required>
                <InputNumber value={Restaurant?.lat}/>
            </Form.Item>
            <Form.Item label="Longitude " name="lng" required>
                <InputNumber value={Restaurant?.lng}/>
            </Form.Item>
            <Form.Item label="Delivery fee " name="deliveryFee" required>
                <InputNumber value={Restaurant?.deliveryFee}/>
            </Form.Item>
            </div>
            <div style={{width:'50%',float:"left"}}>
            <Form.Item label="Min Delivery Time" name="minDeliveryTime" required>
                <InputNumber value={Restaurant?.minDeliveryTime}/>
            </Form.Item>
            <Form.Item label="Max Delivery Time" name="maxDeliveryTime" required>
                <InputNumber value={Restaurant?.maxDeliveryTime}/>
            </Form.Item>
            <Form.Item label="Address " name="address" required>
                <Input placeholder="Enter address here" value={Restaurant?.address}/>
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