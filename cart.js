let container=document.getElementById('cartContainer');
let logOut=document.getElementById('Logout')

logOut.addEventListener('click',()=>{
    console.log('logout')
    localStorage.removeItem('loggedinUser')
    window.location.replace('login.html')
})
// this is the function that leads to home page once again
document.getElementById('home').addEventListener('click',()=>{
    window.location.href='index.html'
})

// this is a function that removes movies from cart 
async function deleteFromCart(id){
     try{
     let response=await  fetch(`http://localhost:3000/cart/${id}`,{
        method:'DELETE'
     })
     if (response.ok){
        alert('data deleted sucessfully')
     }
     else{
        console.log('data deleted sucessfully')
     }
    
    }
    catch(err){
        console.log('errror'+err)
    }
}

// this is a function which displays movies fetched from server
async function cartMovies(){

    // document.getElementById('Logout').style.display='none'
        let User = JSON.parse(localStorage.getItem('loggedinUser'))

    if(User){
          document.getElementById('username').textContent="Welcome "+User.name
    } else {
        window.location.href = 'login.html'
        return
    }
    
    
    try{
        let response= await fetch('http://localhost:3000/cart')
        let data=await response.json()

        // this shows a message if there is not movie available presently at cart
        if(data.length<1){
            let p=document.createElement('h1')
            p.textContent='there are no movies available in cart  at the moment'
            container.appendChild(p)
        }
        // so i will create element and append them to the container using foreach
        data.forEach(element => {
            // console.log(element)
            // card to display movie
            let card=document.createElement('div')
            card.classList.add('movieCard')

            // image contianer
            let image=document.createElement('img')
            image.src=element.poster
            image.alt='loading'

            // title of the movie
            let movieName=document.createElement('h3')
            movieName.textContent=element.title


            // adding remove button to movie card
            let removeFromCart=document.createElement('button')
            removeFromCart.textContent='remove'
            removeFromCart.addEventListener('click',()=>{
                deleteFromCart(element.id)
            })
            
            card.appendChild(image)
            card.appendChild(movieName)
            card.appendChild(removeFromCart)
            container.appendChild(card)
        });

    }catch(err){
        console.log(err)
    }
}

cartMovies()