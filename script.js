document.addEventListener('DOMContentLoaded',()=>{
    const products=[
        {id:1, name:'Laptop',price:10000},
        {id:2, name:'Mobile',price:5000},
        {id:3, name:'headphones',price:1000}
    ]

    const cart=[]
    const productList = document.getElementById('product-list')
    const cartItem = document.getElementById('cart-item')
    const empyCartMessage = document.getElementById('empty-cart')
    const cartTotalMessage = document.getElementById('cart-total')
    const totalPriceDisplay = document.getElementById('total-price')
    const checkButton = document.getElementById('checkout-btn')

    products.forEach(p =>{
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')

        productDiv.innerHTML = `
            <span>${p.name} - ${p.price.toFixed(2)}</span>
            <button data-id="${p.id}">Add to cart</button>
        `
        productList.appendChild(productDiv);
    })

    productList.addEventListener('click',(e) =>{
        if(e.target.tagName ==='BUTTON'){
           const  productID = parseInt(e.target.getAttribute('data-id'))
           const product = products.find    (p => p.id === productID)
           addCart(product);
        }
    })

    function addCart(product){
        cart.push(product)
        renderCart()
    }

    function renderCart(){
        cartItem.innerHTML=''
        let totalPrice=0
        
        if(cart.length > 0){
            empyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')

            cart.forEach((item,index) => {
               totalPrice += item.price
               const itemDiv = document.createElement('div')
               
               // FIX: Changed single quotes to backticks for multi-line evaluation
               itemDiv.innerHTML = `
                <span>${item.name} - ${item.price.toFixed(2)}</span>
               `  
               cartItem.appendChild(itemDiv)
            })
            totalPriceDisplay.textContent = totalPrice.toFixed(2)
        } else {
            // FIX: Added fallbacks to reset your UI elements when the cart is empty
            empyCartMessage.classList.remove('hidden')
            cartTotalMessage.classList.add('hidden')
            totalPriceDisplay.textContent = (0).toFixed(2)
        }
    }

    checkButton.addEventListener('click',()=>{
        cart.length=0; // Clears the array reference safely
        alert('Thank you! Your order has been placed.')
        renderCart() // This handles updating the UI elements completely now
    })
})