var productField = document.getElementById('productField');

var fullArray = []
var xhr = new XMLHttpRequest();
var url = '/alldescriptions';
// var url = '/products.txt'
xhr.open('GET', url);
xhr.send();
let arrayofdescrips = []

xhr.onreadystatechange = function onReadyStateChange() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("xhr.responseText: ", JSON.parse(xhr.responseText));
        JSON.parse(xhr.responseText).forEach(x => {
            arrayofdescrips.push(x.name)
        })
    }
};

function clearSearchList() {
    const list = document.getElementById('autocompleteresults')

    Array.from(list.childNodes).forEach(node => {
        list.removeChild(node);
    });
}

function setDataList(inputtedtext) {
    console.log("setDatalist firing!", inputtedtext)
    const list = document.getElementById('autocompleteresults')
    if (productField.value == '') {
        return
    }

    var regex = new RegExp(`^${inputtedtext}`, 'gi');
    let matchedWords = arrayofdescrips.filter(word => {
        return word.match(regex);
    }).slice(0, 10);


    matchedWords.forEach(word => {
        const optionNode = document.createElement('option')
        optionNode.text = word;
        list.appendChild(optionNode)
        optionNode.addEventListener('click', () => {

            productField.value = optionNode.text;


        })
    })
}

productField.addEventListener('input', () => {
    console.log("eventlistenerfunction firing!")
    clearSearchList();
    setDataList(productField.value)
})

