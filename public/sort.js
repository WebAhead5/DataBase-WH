var productquantity = document.getElementById('quantityField');
var productprice = document.getElementById('PriceField');

function sortproductsbyprice() {
    var xhr = new XMLHttpRequest();
    var url = '/sortitemsbyprice';
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            updateDom(null, xhr.response)
        }
    };

}


function sortproductsbyquantity() {
    var xhr = new XMLHttpRequest();
    var url = '/sortitemsbyquantity';
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            updateDom(null,xhr.response)
        }
    };

}

document.getElementById('SortQuantity').addEventListener('click', () => {

    sortproductsbyquantity()


});



document.getElementById('SortPrice').addEventListener('click', () => {


    sortproductsbyprice()

});
