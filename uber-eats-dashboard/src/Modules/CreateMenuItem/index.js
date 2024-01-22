import {Form,Input,InputNumber,Button,Card,Image} from 'antd'
import { post } from '../../apiCalls';
import axios from 'axios';
import apiRoutes from '../../apiRoutes';
import { useAuthContext } from '../../Contexts/AuthContext';
import {useEffect,useState} from "react"
import { useNavigate } from 'react-router-dom';
import check from './../../data/assets/check.png';
import PopUp from '../../Components/Popup';
import default_logo from "./../../data/assets/logo/default_logo.png" 


const {TextArea} = Input;
const CreateMenuItem = () => {
    const navigate = useNavigate();
    const {Restaurant} = useAuthContext();
    const restaurantId = Restaurant?.id;
    const [foodimage,setFoodimage] = useState();
    const [response,setResponse] = useState();
    const [displayImage,setDisplayImage]=useState(default_logo);
    const [trigger,setTrigger] = useState(false);
    const [wait,setWait] = useState(false);
    const onSubmit = ({name,description,price,image}) => {
       /*  var data =  await post(apiRoutes.AddDish,{name:name,description:description,price:price,image:foodimage,restuarantId:restaurantId});
        console.log(data); */
        const formData = new FormData()
        formData.append('name',name)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('image',foodimage)
        formData.append('restuarantId',restaurantId)
        axios.post(apiRoutes.AddDish,formData).then((result)=>{setResponse(result.data)});

    }
    const updateImage = e =>{
        const reader = new FileReader();
        reader.onload = x =>{
           setDisplayImage(x.target.result);
        }
        reader.readAsDataURL(e.target.files[0])
        setFoodimage(e.target.files[0]);
    }
   
    useEffect(()=>{
        
        if(response && response.success){
            setTrigger(true);
            }
    },[response]);
    useEffect(()=>{
        if(!trigger && (response && response.success)){
          navigate(-1);}
      },[trigger]);
    return(
        <div>
          
        <Card title="New Menu item" style={{margin:20}}>
            <Form layout='vertical' 
             wrapperCol={{span: 8}} onFinish={onSubmit}>
             <div style={{width:'50%',float:"left"}}>
           
                <Form.Item label="Dish Name" name="name" required>
                    <Input placeholder='Enter Dish Name' ></Input>
                </Form.Item>
                <Form.Item label="Dish Description" name="description" required>
                    <TextArea rows={4} placeholder='Enter Dish Description'  />
                </Form.Item>
               
                <Form.Item label="Price (R)" name="price" required>
                    <InputNumber precision={2}
     step={0.01} />
                </Form.Item>
                </div>
                <div style={{width:'50%',float:"left"}}>
                     <Form.Item label="Dish Image" name="image" required>
                        <Image src={displayImage} preview={true}></Image>
                        <Input type='file' onChange={updateImage} />
                     </Form.Item> 
                </div>
                <div style={{width:'100%',float:"left"}}>
                <Form.Item >
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
                </div>
            </Form>
        </Card>
         <PopUp trigger={trigger} setTrigger={setTrigger} >
         <div style={{width:'65%',float:"left"}} >
         <h3>Notification</h3>
          <p style={{position:"relative", paddingTop:"10%",fontWeight:'bold',fontSize:25}}>succesfully added</p>
         </div>
         <div style={{width:'35%',float:'right'}}>
             <Image src={check} preview={false}></Image>
         </div>
     </PopUp></div>
    )
};
export default CreateMenuItem;