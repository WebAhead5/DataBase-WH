var productinput = document.getElementById('productField');
var productquantity = document.getElementById('quantityField');

function postproduct() {
    var xhr = new XMLHttpRequest();
    var url = `/insertitems?description=${productinput.value}&quantity=${productquantity.value}`;
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





// function updatePrice() {
//     var xhr = new XMLHttpRequest();
//     var url = `/updateprice?description=${productinput.value}`;
//     xhr.open('GET', url);
//     xhr.send();

//     xhr.onreadystatechange = function onReadyStateChange() {

//         if (xhr.readyState === 4 && xhr.status === 200) {
//             //request('/items', updateDomPrice);
//         }
//     };

// }





// document.getElementById('insert').addEventListener('input', () => {

//         updatePrice()

//     })
//     //HELLO HADI!