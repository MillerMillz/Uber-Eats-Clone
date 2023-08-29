import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";

const SideMenu = () => {
    const onMenuItemClicked = (menuItem) => {
        if(menuItem.key==="signout")
        {
            localStorage.removeItem('jwt');
            setAuthUser(null);
            setRestaurant(null);
            navigation(0);
        }
        else{
        navigation(menuItem.key)}
    };
    const {Restaurant,setRestaurant,setAuthUser} = useAuthContext();
    const navigation = useNavigate();

const mainMenuItem = [
    {
        key:"orders",
        label:"Orders"
    },
    {
        key:"menu",
        label:"Menu"
    },
    {
        key:"order-history",
        label:"Order History"
    }
];

const menuItems = [
...(Restaurant ? mainMenuItem : []),
{
    key:"settings",
    label:"Settings"
},
{
    key:"signout",
    label:"Sign Out",
    danger:"true"
}
];

return(
    <>
    {Restaurant && <h4 style={{backgroundColor:"black",color:"white"}}>{Restaurant.name}</h4> }
    <Menu items={menuItems} onClick={onMenuItemClicked}/>
    </>
)
}
export default SideMenu;