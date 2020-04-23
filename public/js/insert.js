var productinput = document.getElementById('productField');
var productquantity = document.getElementById('quantityField');
var productprice = document.getElementById('PriceField')

function postproduct() {
    var xhr = new XMLHttpRequest();
    var url = `/insertitems?description=${productinput.value}&quantity=${productquantity.value}&price=${productprice.value}`;
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function onReadyStateChange() {

        if (xhr.readyState === 4 && xhr.status === 200) {
            request('/items', updateDom);
        }
    };
}

document.getElementById('insert').addEventListener('click', () => {

    postproduct()

})


<<<<<<< HEAD
=======

>>>>>>> e915baed6e580edc94cbe2ffde05d76ce2b43ca8
function updatePrice() {
    var xhr = new XMLHttpRequest();
    var url = `/updateprice?description=${productField.value}`;
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function onReadyStateChange() {

        if (xhr.readyState === 4 && xhr.status === 200) {
            var price = JSON.parse(xhr.response)
            if(price.length > 0)
            document.getElementById("PriceField").value = price[0].price;
        }
    };
}

document.getElementById('productField').addEventListener('input', () => {

    updatePrice()

})
