function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    //console.log(xhr.response)
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
      //console.log(xhr.response);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function request1(type,url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      request('/items', updateDom)
    } else {
      cb('error' + xhr.responseType);
    }
  };
  xhr.open(type, url, true);
  xhr.send();
}

function updateDom(err, data) {
  if (err) {
    console.error(err);
  } else {
    //console.log("This is the else", data)
    var items = JSON.parse(data);
    var table = document.getElementById('dataTable');
    Array.from(table.childNodes).forEach(node => {
      if (node.nodeName == 'TR') table.removeChild(node);
      else return
    });
    /* create a row in table for each user returned from DB */
    items.forEach(function (item) {
      var row = document.createElement('tr');
      var id = document.createElement('td');
      id.innerHTML = item.id;
      row.appendChild(id);
      var product = document.createElement('td');
      product.innerHTML = item.name;
      row.appendChild(product);
      var quantity = document.createElement('td');
      quantity.innerHTML = item.quantity;
      row.appendChild(quantity);
      var price = document.createElement('td');
      price.innerHTML = item.price;
      row.appendChild(price);

      var deletecell = document.createElement('td');
      deletecell.setAttribute('id', 'deletecell')
      deletecell.innerHTML = '<img id="deleteimage" src="../public/img/criss-cross.png">'
      deletecell.addEventListener('click', ()=>{
        console.log("event listener firing app.js")
        request1('DELETE',`/deleteitem?itemid=${item.id}`)
      })
      row.appendChild(deletecell);
      table.appendChild(row);
    });
  }
};


request('/items', updateDom);
