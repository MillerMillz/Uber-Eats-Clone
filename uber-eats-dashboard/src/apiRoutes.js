const API_URL = "http://192.168.0.151:7088/";

module.exports={
    register:API_URL + "api/Auth/Register",
    login:API_URL + "api/Auth/JwtLogin",
    signOut:API_URL+"api/Auth/Signout",
    listRestuarants:API_URL+"api/Restuarant/ListRestuarants",
    getRestuarant:API_URL+"api/Restuarant/GetRestuarant/",
    getRestuarantByAdminID:API_URL+"api/Restuarant/GetRestuarantByAdminID/",
    AddRestuarant:API_URL+"api/Restuarant/AddRestuarant",
    EditRestuarant:API_URL+"api/Restuarant/EditRestuarant",
    getRestuDishes:API_URL+"api/Dish/ListRestuDishes/",
    getDish:API_URL+"api/Dish/GetDishbyID/",
    getAuthUser:API_URL+"api/Auth/JwtQueryUser/",
    getDbUser:API_URL+"api/User/QueryUser/",
    getDbUserByID:API_URL+"api/User/QueryUserByID/",
    addDBUser:API_URL+"api/User/AddUser",
    updateDBUser:API_URL+"api/User/UpdateUser",
    getBasketByIDs:API_URL+"api/Basket/GetBasketByIDs/",
    getBasketDishes:API_URL+"api/Basket/GetBasketDishes/",
    addDishToBasket:API_URL+"api/Basket/AddDishToBasket",
    addBasket:API_URL+"api/Basket/AddBasket",
    getUserOrders:API_URL+"api/Order/GetUserOrders/",
    OrderHistory:API_URL+"api/Order/OrderHistory/",
    getCustomerOrderDishes:API_URL+"api/Order/GetCustomerOrderDishes/",
    AddOrder:API_URL+"api/Order/AddOrder",
    AddDish:API_URL+"api/Dish/AddDish",
    RemoveDish:API_URL+"api/Dish/RemoveDish",
    addOrderDish:API_URL+"api/Order/AddOrderDish",
    DeleteBasket:API_URL+"api/Basket/DeleteBasket",
    getOrderbyID:API_URL+"api/Order/GetOrderByID/",
    getRestaurantOrders:API_URL+"api/Order/GetRestaurantOrders/",
    getOrderDishes:API_URL+"api/Order/GetOrderDishes/",
    getDbCourier:API_URL+"api/Courier/GetDbCourierByID/",
    updateOrder:API_URL+"api/Order/UpdateOrder",
    getOrdersByStatus:API_URL+"api/Order/GetOrderByStatus/",
    updateCourier:API_URL+"api/Courier/UpdateCourier",
    AddCourier:API_URL+"api/Courier/AddCourier"





}