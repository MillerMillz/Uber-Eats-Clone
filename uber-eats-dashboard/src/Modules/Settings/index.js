import { Form, Input,Card,Button, InputNumber, Result } from "antd";
import { useState,useEffect } from "react";
import GooglePlacesAutocomplete, {getLatLng,geocodeByAddress,geocodeByLatLng} from "react-google-places-autocomplete";
import { useAuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import apiRoutes from "../../apiRoutes";
import default_logo from "../../data/assets/logo/default_logo.png"
import {Image} from 'antd';
import PopUp from "../../Components/Popup";
import check from "../../data/assets/check.png"
import * as signalR from "@microsoft/signalr"


import {useNavigate} from "react-router-dom";

const Settings =() =>{
    var hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.168.0.151:7088/ChatHub").withAutomaticReconnect().build();
    const navigate = useNavigate();
    const {Restaurant,authUser,setRestaurant} = useAuthContext();
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
const [dispAddress,setDispAddress] =  useState(Restaurant?.address);
const [deliveryFee,setDeliveryFee] =  useState(Restaurant?.deliveryFee);
 //  const [address, setAddress] = useState(null);
    const [coordinates,setCoordinates] = useState(null);
 
   
    const onSubmit = async ({}) =>{
        setLat(coordinates.lat);
        setLng(coordinates.lng);
        
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
            await axios.post(apiRoutes.EditRestuarant,formData).then((Result)=>{ 
                setResponse(Result.data);
                setRestaurant(Result.data.response); });
            
            
         }
        else
        { 
            formData.append("image",restuImage);
            await axios.post(apiRoutes.AddRestuarant,formData).then((Result)=>{ 
                setResponse(Result.data);
                setRestaurant(Result.data.response);});
            
        }
        try{
            await hubConnection.start();
            await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Restaurant"}));
            await hubConnection.invoke("SendMessageAsync","Restaurant Update");
            await hubConnection.stop()
        }
        catch(e)
        {
            console.log(e);
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
                setTrigger(true);
               
            }
    },[response])
    
    useEffect(()=>{
        getAddressLatLng()
    },[dispAddress])
    const getAddressLatLng = async () => {
        console.log(dispAddress)
        setAddress(dispAddress.label);
        const geocodedByAddress = await geocodeByAddress(dispAddress.label);
        const latlng =  await getLatLng(geocodedByAddress[0]);
        console.log(latlng);
        setCoordinates(latlng)
    }

    return(
        <div>
    <Card title="Restaurant Details" style={{margin:20}}>
        <Form layout="vertical" wrapperCol={{span:8}} onFinish={onSubmit}>
            <div style={{width:'50%',float:"left"}}>
            <Form.Item label="Restaurant Name" required>
                <Input placeholder="Enter Restaurant name here" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </Form.Item>
            <Form.Item label="Restaurant Address" required> 
            <GooglePlacesAutocomplete apiKey="AIzaSyAfjdWuBgeCIzS1aOu3qQpvovbn3Sep008" 
            selectProps={{
                value:dispAddress,
                onChange:setDispAddress,
            }}/>
            </Form.Item> 
            {/* <Form.Item label="Latitude"  required>
                <InputNumber  precision={2}
     step={0.01} onChange={(e)=>{setLat(e)}} value={lat} />
            </Form.Item>
            <Form.Item label="Longitude "  required>
                <InputNumber  precision={2}
     step={0.01} onChange={(e)=>{setLng(e)}} value={lng}/>
            </Form.Item> */}
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
           
            
            </div>
          
            <div style={{width:'100%',float:"left"}}>
            <Form.Item >
                <Button type='primary'htmlType='submit' >Submit</Button>
            </Form.Item>
            </div>
        </Form>
        <span>{coordinates?.lat} - {coordinates?.lng}</span>
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