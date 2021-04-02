if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // var addToCartButtons = document.getElementsByClassName('shop-item-button')
    // for (var i = 0; i < addToCartButtons.length; i++) {
    //     var button = addToCartButtons[i]
    //     button.addEventListener('click', addToCartClicked)
    // }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    var total = document.getElementsByClassName('cart-total-price')[0].innerText;
    if(orderCount>=3){
        alert('Thank you for your purchase from '+orderItem.manufacturer+'.  Total: '+ total+"\n You have earned "+20*orderCount+" points.");
    }else{
        alert('Thank you for your purchase from '+orderItem.manufacturer+'.  Total: ' + total)
    }
    updateLayalty();
    // clear current item deatails
    orderCount=1
    temp = orderItem;
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    console.log("clicked");
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            // alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total+=getExtraCost();
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs.' + total
}

// ------------------------------------------------------------------------------- //
var orderItem = {
    manufacturer: '',
    products: [],
    size: {
        size: '',
        price: 0
    },
    extras: []
};

var temp = orderItem;

var orderCount = 1;


function SelectManufacturer(name) {
    temp.manufacturer = name;
    updateTempItem();
}

function selectProduct(product) {
    if(temp.manufacturer){
        var isAdded = false;

        temp.products.forEach(item =>{
            if(product.name == item.name){
                isAdded = true;
            }
        });

        if (!isAdded) {
            temp.products.push(product);
            updateTempItem();
        }else{
            alert('Already added!');
        }
    }else{
        alert('Select a manufacturer')
    }
}

function selectSize(size, price) {
    if (temp.manufacturer) {
        if (temp.products.length>0) {
            temp.size.size = size;
            temp.size.price = price;
            updateTempItem();
        }else{
            alert('Select a product!')
        }
    }else{
        alert('Select a manufacturer')
    }
}

function selectExtras(extra) {

    if (temp.manufacturer) {
        if (temp.products.length>0) {
            if(temp.size.size != ''){

            }else{
                alert('Select a size!')
            }
        }else{
            alert('Select a product!')
        }
    }else{
        alert('Select a manufacturer')
    }

    var isAdded = false;

    temp.extras.forEach(item =>{
        if(extra.name == item.name){
            isAdded = true;
        }
    });

    if (!isAdded) {
        temp.extras.push(extra);
        updateTempItem();
    }else{
        alert('Already added!');
    }
}

function updateTempItem() {
    var tA = document.querySelector('#selectedItems');
    tA.value = "Manufacturer: "+temp.manufacturer+"\nProducts: "+getProductsArray()+"\nSize: "+temp.size.size+"\nExtras: "+getExtrasArray()


    function getProductsArray(){
        var text = '';
        temp.products.forEach(i =>{
            text += (i.name+', ');
        });
        return text;
    }
    function getExtrasArray(){
        var text = '';
        temp.extras.forEach(i =>{
            text += (i.name+', ');
        });
        return text;
    }
}
function addToCart() {
    if(temp.size.size!=''){
        temp.products.forEach(product => {
            addItemToCart(product.name, product.price);
        });
    }
    updateCartTotal();
    orderCount=temp.products.length;
    document.querySelector('#selectedItems').value = '';
}

function getExtraCost(){
    var extra = temp.size.price;
    temp.extras.forEach(e => {
        extra += e.price;
    });

    // updating extra
    document.querySelector('#extraPrice').innerHTML = "Rs."+extra;

    return extra;
}

function addToFavourite() {
    var storage = window.localStorage;
    if (temp.products.length>0 && temp.manufacturer!='' && temp.size.size!='') {
        storage.setItem('order', JSON.stringify(temp));
        alert('Added to favourite!');
    } else {
        alert('Invalid order!');
    }
}
function getFavourite() {
    var storage = window.localStorage;
    var savedOrder = JSON.parse(storage.getItem('order'))
    if(savedOrder){
        temp = savedOrder;
        updateTempItem();
    }else{
        alert("No favourite order found!");
    }
}

function getLoyalty(){
    alert("Your current loyalty point value: "+getCurrentLoyaltyPoints());
}
function getCurrentLoyaltyPoints() {
    return window.localStorage.getItem('loyaltyPoints')?window.localStorage.getItem('loyaltyPoints'):0;
}
function updateLayalty() {
    var currentPoints = getCurrentLoyaltyPoints();
    var pointsForThisOrder = orderCount>=3?orderCount*20:0;
    var totalPoints = parseInt(pointsForThisOrder) + parseInt(currentPoints);
    window.localStorage.setItem('loyaltyPoints', totalPoints);
}