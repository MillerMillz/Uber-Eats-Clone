import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const LoginSideMenu = () => {
    const onMenuItemClicked = (menuItem) => {
        console.log(menuItem)
        navigation(menuItem.key)
    };
    const navigation = useNavigate();

const menuItems = [
{
    key:"/",
    label:"Sign In"
},
{
    key:"signUp",
    label:"Sign Up"
}
];

return(
    <Menu items={menuItems} onClick={onMenuItemClicked} style={{background:"green"}}/>
)
}
export default LoginSideMenu;