let container=document.getElementById('moviesContainer');
let logOut=document.getElementById('Logout')

logOut.addEventListener('click',()=>{
    console.log('logout')
    localStorage.removeItem('loggedinUser')
    window.location.replace('login.html')
})

// this is the function that leads to cart page
document.getElementById('cart').addEventListener('click',()=>{window.location.href='cart.html'})

// async function that adds movies to  cart 
async function handleCart(params) {
    try{
    let response=await fetch('http://localhost:3000/cart',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
                ...params,
                movieId: params.id   
            }
        )
    })
    if(response.ok){
        alert('the movie is added to cart')
    }else{
        alert('Error occured')
    }}
    catch(err){
        alert(err)
    }
}

// function that adds movies to favourite
async function handleFavourite(params){
   try{
   let response= await fetch('http://localhost:3000/favourites',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(params)
   })
   if (response.ok){
     alert('movie is added to favourite')
   }
   else{
     alert ('movie not added')
   }
   }catch(err){
    console.log(err)
   }
}

// this function checks if the movie is already in cart or not
async function checkingInCart(element) {
    try{
        let response=await fetch('http://localhost:3000/cart')
        let data=await response.json()
        
        // console.log(data)
        let MovieInCart=data.find(e=>e.movieId==element.id)

        
         if (!MovieInCart){
             handleCart(element)
            console.log(MovieInCart)
        }
    }catch(err){
        alert(err)
    }
}

// this is a function which displays movies fetched from server
async function fetchingMovies(){

    // document.getElementById('Logout').style.display='none'
        let User = JSON.parse(localStorage.getItem('loggedinUser'))

    if(User){
          document.getElementById('username').textContent="Welcome "+User.name
    } else {
        window.location.href = 'login.html'
        return
    }

    
    try{
        let response= await fetch('http://localhost:3000/movies')
        let data=await response.json()
        
        
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

            // movie release date
            let releaseDate=document.createElement('p')
            releaseDate.textContent="Released date :"+element.year

            // category of the movie
            let movieCategory=document.createElement('p')
            movieCategory.textContent="category :"+element.Category

            // adding movies to the cart
            let cart=document.createElement('button')
            cart.textContent='🛒 Add to cart'
            cart.addEventListener('click',()=>{
                checkingInCart(element)
                
            })

            // adding favourite button to movie card
            let favouriteButton=document.createElement('button')
            favouriteButton.textContent='❤️ Add to favourite'

            // event that adds movie to favourite
            favouriteButton.addEventListener('click',()=>{
                handleFavourite(element)
            })



            card.appendChild(image)
            card.appendChild(movieName)
            card.appendChild(movieCategory)
            card.appendChild(releaseDate)
            card.appendChild(favouriteButton)
            card.appendChild(cart)
            container.appendChild(card)
        });

    }catch(err){
        console.log(err)
    }
}

fetchingMovies()