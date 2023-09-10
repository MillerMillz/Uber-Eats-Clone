import { Form, Input,Card,Button, InputNumber, Result } from "antd";
import { useState,useEffect } from "react";
import GooglePlacesAutocomplete, {getLatLng,geocodeByAddress} from "react-google-places-autocomplete";
import { useAuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import apiRoutes from "../../apiRoutes";
import default_logo from "../../data/assets/logo/default_logo.png"
import {Image} from 'antd';
import PopUp from "../../Components/Popup";
import check from "../../data/assets/check.png"


import {useNavigate} from "react-router-dom";

const Settings =() =>{
    const navigate = useNavigate();
    const {Restaurant,authUser} = useAuthContext();
    const [restuImage,setRestuImage] =  useState();
    const [response,setResponse] =  useState();
    const [displayImage,setDisplayImage] =  useState(default_logo);
    const [trigger,setTrigger] = useState(false);
    console.log(Restaurant);
    //
  
//restu attributes
const [name,setName] =  useState(Restaurant?.name);
const [lat,setLat] =  useState(Restaurant?.lat);
const [lng,setLng] =  useState(Restaurant?.lng);
const [minDeliveryTime,setMinDeliveryTime] =  useState(Restaurant?.minDeliveryTime);
const [maxDeliveryTime,setMaxDeliveryTime] =  useState(Restaurant?.maxDeliveryTime);
const [address,setAddress] =  useState(Restaurant?.address);
const [deliveryFee,setDeliveryFee] =  useState(Restaurant?.deliveryFee);
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
        // console.log(name);
        // console.log(lat);
        // console.log(lng);
        // console.log(deliveryFee);
        // console.log(maxDeliveryTime);
        // console.log(minDeliveryTime);
        // console.log(address);
        const formData = new FormData();
        formData.append("name",name);
        formData.append("lat",lat);
        formData.append("lng",lng);
        formData.append("minDeliveryTime",minDeliveryTime); 
        formData.append("maxDeliveryTime",maxDeliveryTime);
        formData.append("deliveryFee",deliveryFee);
        formData.append("address",address);
        formData.append("rating",0);
        formData.append("adminID",authUser.id);
        if(Restaurant)
          
        {
        
            formData.append("image",restuImage);
            formData.append("id",Restaurant.id);
             console.log(formData);
            axios.post(apiRoutes.EditRestuarant,formData).then((Result)=>{ setResponse(Result.data);});
            
         }
        else
        { 
            formData.append("image",restuImage);
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
            if(Restaurant.imageSource!=="Temp")
            {
              setDisplayImage(Restaurant.imageSource)
            }
        }
    },[]);
    useEffect(()=>{
    if(response && response.success)
            {
                console.log("successsss!!!")
                setTrigger(true);
               
            }
    },[response])


    return(
        <div>
    <Card title="Restaurant Details" style={{margin:20}}>
        <Form layout="vertical" wrapperCol={{span:8}} onFinish={onSubmit}>
            <div style={{width:'50%',float:"left"}}>
            <Form.Item label="Restaurant Name" required>
                <Input placeholder="Enter Restaurant name here" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </Form.Item>
           
            <Form.Item label="Latitude"  required>
                <InputNumber  precision={2}
     step={0.01} onChange={(e)=>{setLat(e)}} value={lat} />
            </Form.Item>
            <Form.Item label="Longitude "  required>
                <InputNumber  precision={2}
     step={0.01} onChange={(e)=>{setLng(e)}} value={lng}/>
            </Form.Item>
            <Form.Item label="Delivery fee " required>
                <InputNumber  precision={2}
     step={0.01} onChange={(e)=>{setDeliveryFee(e)}} value={deliveryFee}/>
            </Form.Item> 
            <Form.Item label="Max Delivery Time"  required>
                <InputNumber   step={1} onChange={(e)=>{setMaxDeliveryTime(e)}} value={maxDeliveryTime}/>
            </Form.Item>
             <Form.Item label="Min Delivery Time"  required>
                <InputNumber step={1} onChange={(e)=>{setMinDeliveryTime(e)}} value={minDeliveryTime}/>
            </Form.Item>
            </div>
            <div style={{width:'50%',float:"left"}}>
                <Image style={{height: "250px"}} src={displayImage}  preview={false}/>
            <Form.Item label="Select Restuarant Image" name="image" required>
                <Input type="file" onChange={updateImage}  />
            </Form.Item>
           
            <Form.Item label="Address " required>
                <Input placeholder="Enter address here" onChange={(e)=>{setAddress(e.target.value)}} value={address}/>
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
    </Card>
    <PopUp trigger={trigger} setTrigger={setTrigger}>
        <div style={{width:'65%',float:"left"}} >
        <h3>Notification</h3>
         <p style={{position:"relative", paddingTop:"10%",fontWeight:'bold',fontSize:25}}>succesfully added</p>
        </div>
        <div style={{width:'35%',float:'right'}}>
            <Image src={check} preview={false}></Image>
        </div>
    </PopUp>
    </div>
    )
};
export default Settings;