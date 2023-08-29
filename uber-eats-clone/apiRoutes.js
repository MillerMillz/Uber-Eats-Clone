const API_URL = "http://192.168.0.151:7088/";

module.exports={
    register:API_URL + "api/Auth/Register",
    login:API_URL + "api/Auth/Login",
    getUserBaskets:API_URL+"api/Basket/GetUserBaskets/",
    signOut:API_URL+"api/Auth/Signout",
    listRestuarants:API_URL+"api/Restuarant/ListRestuarants",
    getRestuarant:API_URL+"api/Restuarant/GetRestuarant/",
    getRestuDishes:API_URL+"api/Dish/ListRestuDishes/",
    getDish:API_URL+"api/Dish/GetDishbyID/",
    getAuthUser:API_URL+"api/Auth/QueryUser",
    getDbUser:API_URL+"api/User/QueryUser/",
    addDBUser:API_URL+"api/User/AddUser",
    updateDBUser:API_URL+"api/User/UpdateUser",
    getBasketByIDs:API_URL+"api/Basket/GetBasketByIDs/",
    getBasket:API_URL+"api/Basket/GetBasket/",
    getBasketDishes:API_URL+"api/Basket/GetBasketDishes/",
    addDishToBasket:API_URL+"api/Basket/AddDishToBasket",
    addBasket:API_URL+"api/Basket/AddBasket",
    getUserOrders:API_URL+"api/Order/GetUserOrders/",
    AddOrder:API_URL+"api/Order/AddOrder",
    addOrderDish:API_URL+"api/Order/AddOrderDish",
    DeleteBasket:API_URL+"api/Basket/DeleteBasket",
    getOrderbyID:API_URL+"api/Order/GetOrderByID/",
    getOrderDishes:API_URL+"api/Order/GetOrderDishes/",
    getDbCourier:API_URL+"api/Courier/GetDbCourier/",



}