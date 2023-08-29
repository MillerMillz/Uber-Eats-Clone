import {Form,Input,InputNumber,Button,Card} from 'antd'
import { post } from '../../apiCalls';
import axios from 'axios';
import apiRoutes from '../../apiRoutes';
import { useAuthContext } from '../../Contexts/AuthContext';
import {useEffect,useState} from "react"
import { useNavigate } from 'react-router-dom';

const {TextArea} = Input;
const CreateMenuItem = () => {
    const navigate = useNavigate();
    const {Restaurant} = useAuthContext();
    const restaurantId = Restaurant?.id;
    const [foodimage,setFoodimage] = useState();
    const [submitted,setSubmitted] = useState('unsubmitted');
    const onSubmit = ({name,description,price,image}) => {
       /*  var data =  await post(apiRoutes.AddDish,{name:name,description:description,price:price,image:foodimage,restuarantId:restaurantId});
        console.log(data); */
        const formData = new FormData()
        formData.append('name',name)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('image',foodimage)
        formData.append('restuarantId',restaurantId)
       console.log(formData);
        axios.post(apiRoutes.AddDish,formData).then(console.log('ok'));

        setSubmitted('Submitted')
    }
    const updateImage = e =>{
        setFoodimage(e.target.files[0]);
    }
    useEffect(()=>{
        if(submitted==="Submitted"){
        navigate(-1);}
    },[submitted]);
    return(
        <Card title="New Menu item" style={{margin:20}}>
            <Form layout='vertical' 
             wrapperCol={{span: 8}} onFinish={onSubmit}>
           
           
                <Form.Item label="Dish Name" name="name" required>
                    <Input placeholder='Enter Dish Name' ></Input>
                </Form.Item>
                <Form.Item label="Dish Description" name="description" required>
                    <TextArea rows={4} placeholder='Enter Dish Description'  />
                </Form.Item>
                <Form.Item label="Dish Image" name="image" required>
                    <Input type='file' onChange={updateImage} />
                </Form.Item> 
                <Form.Item label="Price (R)" name="price" required>
                    <InputNumber />
                </Form.Item>
                <Form.Item >
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
};
export default CreateMenuItem;