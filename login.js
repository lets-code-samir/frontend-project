let submit=document.getElementById('submit')

submit.addEventListener('click',async ()=>{
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    try{
       let data= await fetch('http://localhost:3000/users')
       let users=await data.json()
       const userFound=users.find(e=>e.email==email && e.password==password)

       if(userFound){
          localStorage.setItem('loggedinUser',JSON.stringify(userFound))
          window.location.href='index.html'
       }
       else{
        alert('invalid email and password')
       }
    }catch(err){
        console.error(err)
    }
    
})