// products
let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 80
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 85
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 100
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 80
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 90
    }
];

// Variables
let openCart = document.querySelector('.shopping');
let closeCart = document.querySelector('.closeCart');
let body = document.querySelector('body');
let productList = document.querySelector('.product-list');
let cartList = document.querySelector('.cartList');
let cartContainer = document.querySelector('.cartContainer');

// toggle cart. open and close
openCart.addEventListener('click', () => {
    cartContainer.classList.toggle('opened');
    toggleDisplay();
})
closeCart.addEventListener('click', () => {
    cartContainer.classList.add('opened');
})


// products to html
let productsHTML = () => {
    products.forEach((value) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        <img src="images/${value.image}" alt="${value.name}">
                <div class="item-name">${value.name}</div>
                <div class="price">R${value.price}</div>
                <button type="button" class="addToCart">
                    Add to cart
                </button>
        `;
        productList.appendChild(newDiv);
    })
}
productsHTML();

// add to cart
let addToCart = ()=>{  
    let addToCartBtns = document.querySelectorAll('.addToCart');   
    for(let i=0; i<addToCartBtns.length; i++){
        addToCartBtns[i].addEventListener('click', (event)=>{
        let addBtnClicked = event.target;
        let itemRow = addBtnClicked.parentElement;
        let itemImg = itemRow.querySelector('img').src;
        let itemName = itemRow.querySelector('.item-name').innerText;
        let itemPrice = itemRow.querySelector('.price').innerText;
        let itemQty = 1;
        let cartItemNames = cartList.querySelectorAll('.cart-item-name');

        // create new element
        let newLi = document.createElement('li');
        newLi.classList.add('cart-item');
        newLi.innerHTML = `
        <div class="cart-item-header">
          <img src="${itemImg}" alt="${itemName}">
            <div class="cart-item-name">${itemName}</div>
                </div>
                    <div class="cart-item-details">
                        <div class="cart-item-price">${itemPrice}</div>
                        <div class="qty-wrapper">
                            <input type="number" value="1" class="qty"/>
                        </div>
                        <div class="delete-btn-div">
                            <button class="deleteBtn">x</button>
                        </div>
                    </div>          
    `;
        cartList.appendChild(newLi);
                
        for(let i=0; i<cartItemNames.length; i++){
            if(cartItemNames[i].innerText == itemName){
                alert("item is already in cart");
                cartList.removeChild(newLi);
            }
       }

       deleteRow();
       updateCart();
       updateQty();
       toggleDisplay();
    });
}          
}
addToCart();

let toggleDisplay = ()=>{
    let emptyCart = document.querySelector('.empty-cart');
    let loadedCart = document.querySelector('.loaded-cart');
    let rows = document.querySelectorAll('.cart-item');
    rows.forEach((row)=>{
        if(cartList.innerHTML === row){
            emptyCart.style.display="block";
            loadedCart.style.display="none";  
        } else{
            emptyCart.style.display="none";
            loadedCart.style.display="initial";
        }
    })
    
}
   
// update prices and quantities
let updateCart = ()=>{
    let allCartRows = document.querySelectorAll('.cart-item');
    let grandTotal = document.querySelector('.total');
    let mainQty = document.querySelector('.main-quantity');
    let count =  1;
    let total = 0;
    let totalQty = 0;

    // get all the cart rows
    for(let i=0; i<allCartRows.length; i++){
        let cartRow = allCartRows[i];
        let price = cartRow.querySelector('.cart-item-price').innerText.replace('R', '');
        const quantity = cartRow.querySelector('.qty').value;
        total = total + (price * quantity);
        totalQty = totalQty + Number(quantity);
}
// display total
grandTotal.innerText = `Total: R${total}`;
mainQty.innerText = totalQty;
}

// update quantity
let updateQty =()=>{
    let rows = document.querySelectorAll('.cart-item');
    rows.forEach((row)=>{
        let qtyInput = row.querySelector('.qty');
        qtyInput.addEventListener('change', (event)=>{
            updateCart();
            if(qtyInput.value <= 0){
                qtyInput.value = 1;
            };
        })
    })
}
//delete from cart
let deleteRow = ()=>{
    let deleteBtns = document.querySelectorAll('.deleteBtn');
    for(let i=0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', (event)=>{
            let clickedBtn = event.target;
            let clickedRow = clickedBtn.parentElement.parentElement.parentElement;
            let clickedRowParent = clickedRow.parentElement;
            clickedRowParent.removeChild(clickedRow);
            updateCart();
            toggleDisplay();
        })
    }
}