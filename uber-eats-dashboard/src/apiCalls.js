

const get = async(apiRoute)=>{
    var res = await fetch(apiRoute);

    var data = res.json();
    return data
}

const post = async(apiRoute,body)=>{
    
    var res = await fetch(apiRoute,{
       method:"post",
       headers : new Headers({
        
        "Content-Type": "application/json"
       }),
       credentials:"include",
       body: JSON.stringify(body)
    });

    var data = res.json();
    return data
}



module.exports={get,post}