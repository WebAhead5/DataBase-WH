var productinput = document.getElementById('productField');
var productquantity = document.getElementById('quantityField');

function postproduct() {
    var xhr = new XMLHttpRequest();
    var url = `/insertitems?description=${productinput.value}&quantity=${productquantity.value}`;
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log("xhr.responseText: ", (xhr.response));
        }
    };

}


document.getElementById('insert').addEventListener('click', () => {

    postproduct()
    request('/items', updateDom);
})



