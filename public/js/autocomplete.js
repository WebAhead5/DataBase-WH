var productField = document.getElementById('productField');

var fullArray = []
var xhr = new XMLHttpRequest();
var url = '/alldescriptions';
xhr.open('GET', url);
xhr.send();
let arrayofdescrips = []

xhr.onreadystatechange = function onReadyStateChange() {
    if (xhr.readyState === 4 && xhr.status === 200) {
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
            updatePrice();
            clearSearchList()
        })
    })
}

productField.addEventListener('input', () => {
    clearSearchList();
    setDataList(productField.value)
})

document.body.addEventListener('click', (event) => {
    if (document.activeElement === productField) { //if input is selected
        setDataList(productField.value);       // update suggestions with description search input
    } else clearSearchList();
})