let signup=document.getElementById('container')

signup.addEventListener('submit',async (e)=>{
    e.preventDefault()
    let userData={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }   
    try{
       fetch('http://localhost:3000/users',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
       })
       .then(res=>res.json())
       .then(data => {
        console.log("Success:", data);
        alert("User registered successfully!");
    })
    }catch (err){
        console.log("Error:", err);
    }
})