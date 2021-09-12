const formStock = document.getElementById('formStock'); // add stock form
const selectedProduct = document.getElementById('product');
const itemRecieved = document.getElementById('items');
const itemPrice = document.getElementById('itemPrice');

const formStockRemove = document.getElementById('formStockRemove'); //remove stock form
const productRemoved = document.getElementById('productRemove');
const buyerEmail = document.getElementById('email');
const itemsBought = document.getElementById('itemsBought');


var stocks = [];            // container for stocks
var emailArr = [];          // container for buyer email addressess

onInit = function () {
    // run when body iniitialises, we are checking stock inventory and updating the display
    updateStocks();
}

formStock.addEventListener('submit', (e) => {
    e.preventDefault();
    // initialise stock object
    let stock = {
        productCode: '',
        productQuantity: 0,
        productPrice: 0  
    };
    // assign stock object
    stock.productCode = selectedProduct.value;
    stock.productPrice = parseFloat(itemPrice.value);
    stock.productQuantity = parseInt(itemRecieved.value);
    if (stock.productCode && stock.productPrice && stock.productQuantity) {
        findAndUpdateStock(stock);
        formStock.reset();
    } else {
        alert('Please ensure all fields have been filled before adding stock');
        return false;
    }
    // check product code if it exist update if not then push into array
    

})

formStockRemove.addEventListener('submit', (e) => {
    e.preventDefault();
    // initialise stock object to be removed
    let removedStock = {
        productCode: '',
        buyerEmail: '',
        itemsBought: 0
    }
    // assign stock object to be removed
    removedStock.productCode = productRemoved.value;
    removedStock.buyerEmail = buyerEmail.value;
    removedStock.itemsBought = itemsBought.value;
    // check if email is in array if so disallow transaction else push into the array
    findEmailandUpdate(removedStock);
    formStockRemove.reset();

})

updateStocks = function () {
    // update the stocks container and display inventory
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


removeStock = function (removedStock) {
    // check if the stock to be removed is in inventory
    if (stocks.length === 0) {
            alert(`${removedStock.productCode} does not exist in inventory`);
            return false;
     }
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
            updateStocks();
            alert(`${removedStock.productCode} has been succesfully shipped`);
            return true;
        } 
    } 

    if (found === -1) {
            alert(`${removedStock.productCode} does not exist in inventory`);
            return false;
    }

}

findEmailandUpdate = function (removedStock) {
    // here we check if this is a 1st time buyer if so we then update inventory after buy
    let foundEmail = -1;
    for (let i = 0; i < emailArr.length; i++) {
        if (emailArr[i] === removedStock.buyerEmail) {
            foundEmail = 1;
            alert('The customer has exceeded the buying limit');
            // clear the input fields
            return false;
        }       
    }

    if (foundEmail === -1) {
        // find product and subract the quantity
        
        if(removeStock(removedStock)) {
            //update email container
            emailArr.push(removedStock.buyerEmail);
        } else {
            return false;
        }

        
            
    }
}

findAndUpdateStock = function (stock) {
    let found = -1;
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].productCode == stock.productCode) {
            found = 1;
            // quantity
            stocks[i].productQuantity = parseInt(stocks[i].productQuantity) + parseInt(stock.productQuantity);
            // average price
            stocks[i].productPrice = (stocks[i].productPrice + stock.productPrice) / 2;
            updateStocks();
            break;
        }
    }
    
    if (found !== -1) {
        updateStocks();
        alert(`${stock.productCode} has been updated in the inventory`);
        return false;
    } else {
        stocks.push(stock);
        updateStocks();
        alert(`${stock.productCode} has been added to inventory`);
        
    }

    found = -1
}