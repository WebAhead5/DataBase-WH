document.getElementById('hidefilter').addEventListener('click', () => {
    document.getElementById('filter').classList.toggle('hidden')
})


var filteredproduct = document.getElementById('productFieldFilter');
var filteredquantity = document.getElementById('quantityFieldFilter');
var filteredprice = document.getElementById('PriceFieldFilter');


function filterproduct() {
    var xhr = new XMLHttpRequest();
    var url = `/filteritems?product=${filteredproduct.value}&quantity=${filteredquantity.value}&price=${filteredprice.value}`;
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === 4 && xhr.status === 200) {
           updateDom(null,xhr.response)
        }
    };

}

    document.getElementById('search').addEventListener('click', () => {

        filterproduct()
        
    });

