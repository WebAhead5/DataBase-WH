function request(url, cb) {
<<<<<<< HEAD
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb('error' + xhr.responseType);
=======
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(null, xhr.responseText);
            //console.log(xhr.response);
        } else {
            cb('error' + xhr.responseType);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function updateDom(err, data) {
// console.log(data)
    if (err) {
        console.error(err);
    } else {
      //console.log("This is the else", data)
        var items = JSON.parse(data);
        var table = document.getElementById('dataTable');
        Array.from(table.childNodes).forEach(node => {
          if(node.nodeName == 'TR') table.removeChild(node);
          else return
        });
        /* create a row in table for each user returned from DB */
        items.forEach(function(item) {
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
            table.appendChild(row);
        });
>>>>>>> 6ee1637b740254384bc0f76dc7571edd016ff277
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function updateDom(err,data) {
  if (err) {
    console.error(err);
  } else {
    var items = JSON.parse(data);
    var table = document.getElementById('dataTable');
    Array.from(table.childNodes).forEach(node => {
      
      table.removeChild(node);
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
      table.appendChild(row);
    });
  }
}


request('/items', updateDom);
