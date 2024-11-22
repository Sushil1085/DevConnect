const fetchUsers =async()=>{
    const response =await fetch('http://localhost:7000/user');

    const usersData=await response.json();
    return usersData;
}

const addUser =async(userData)=>{
    const response =await fetch('http://localhost:7000/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userData)
    })
}

export {fetchUsers,addUser};