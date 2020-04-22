function request(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(null, xhr.responseText);
        console.log(xhr.response);
      } else {
        cb('error' + xhr.responseType);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  
  function updateDom(err, data) {
    if (err) {
      console.error(err);
    } else {
      var items = JSON.parse(data);
      var table = document.getElementById('dataTable');
    //   /* create a row in table for each user returned from DB */
      items.forEach(function(item) {
        var row = document.createElement('tr');
        var id = document.createElement('td');
        id.innerHTML = item.id;
        row.appendChild(id);
        var product = document.createElement('td');
        product.innerHTML=item.name;
        row.appendChild(product);
        var quantity = document.createElement('td');
        quantity.innerHTML = item.quantity;
        row.appendChild(quantity);
        var price= document.createElement('td');
        price.innerHTML = item.price;
        row.appendChild(price);
        table.appendChild(row);
      });
    }
  }


  request('/items', updateDom);
