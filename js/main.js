const formStock = document.getElementById('formStock');
const selectedProduct = document.getElementById('product');
const itemRecieved = document.getElementById('items');
const itemPrice = document.getElementById('itemPrice');

const formStockRemove = document.getElementById('formStockRemove');
const productRemoved = document.getElementById('productRemove');
const buyerEmail = document.getElementById('email');
const itemsBought = document.getElementById('itemsBought');


var stocks = [];

formStock.addEventListener('submit', (e) => {
    e.preventDefault();
    let stock = {
        productQuantity: 0,
        productPrice: 0  
    };
    stock.productCode = selectedProduct.value;
    stock.productPrice = parseFloat(itemPrice.value);
    stock.productQuantity = parseInt(itemRecieved.value);
    // check product code if it exist update if not then push into array
    
    let found = -1;
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].productCode == stock.productCode) {
            console.log(stocks[i].productPrice);
            found = i;
            // quantity
            stocks[i].productQuantity = parseInt(stocks[i].productQuantity) + parseInt(stock.productQuantity);
            // average price
            stocks[i].productPrice = (stocks[i].productPrice + stock.productPrice) / 2;
            console.log(stocks[i].productPrice);
            updateStocks();
            break;
        }
    }
    
    console.log(found);
    if (found !== -1) {
        console.log('dont push into array');
        console.log( stocks);
        updateStocks();
        return false;
    } else {
        stocks.push(stock);
        updateStocks();
        
    }
        
    
    // stocks = [...stocks, stock];
    found = -1
    
    
    
    console.log( stocks);

})

var emailArr = [];

formStockRemove.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(stocks);
    let removedStock = {
        productCode: '',
        buyerEmail: '',
        itemsBought: 0
    }
    removedStock.productCode = productRemoved.value;
    removedStock.buyerEmail = buyerEmail.value;
    removedStock.itemsBought = itemsBought.value;
    console.log(removedStock.buyerEmail);
    // check if email is in array if so disaalow transaction else push into the array
    let found = -1;
    for (let i = 0; i < emailArr.length; i++) {
        if (emailArr[i] === removedStock.buyerEmail) {
            console.log('email already exists');
            found = 1;
            alert('The customer has exceeded the buying limit');
            // clear the input fields
            return false;
        }
        
    }
    console.log (found);
    if (found === -1) {
        console.log('we are adding to arraying');
        emailArr.push(removedStock.buyerEmail);
        // find product and subract the quantity
        console.log(removedStock);
        let foundProduct = -1;
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].productCode === removedStock.productCode) {
                foundProduct = 1;
                if (stocks[i].productQuantity >= removedStock.itemsBought) {
                    stocks[i].productQuantity = parseInt(stocks[i].productQuantity) - parseInt(removedStock.itemsBought);
                } else {
                    alert('There are less products in inventory than the requested sale');
                    return false;
                }   
                //check if we still have them in stock
            }
        }
    }

    console.log(emailArr);
    console.log(stocks);
})

updateStocks = function () {
    console.log('stocks to display' , stocks);
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].productCode === 'product1') {
            document.getElementById("quantityProduct1").innerHTML = stocks[i].productQuantity;
            document.getElementById("priceProduct1").innerHTML = stocks[i].productPrice;
        } else if (stocks[i].productCode === 'product2') {
            document.getElementById("quantityProduct2").innerHTML = stocks[i].productQuantity;
            document.getElementById("priceProduct2").innerHTML = stocks[i].productPrice;
        } else {
            document.getElementById("quantityProduct3").innerHTML = stocks[i].productQuantity;
            document.getElementById("priceProduct3").innerHTML = stocks[i].productPrice;
        }
    }
}

onInit = function () {
    updateStocks();
}