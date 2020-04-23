# Products Collector

Shopping is always hard,so we're here to make this progress much more easier and fun.

:arrow_forward:  **Check our [Website](https://murmuring-sands-11805.herokuapp.com/)** :arrow_backward: 

## Introduction 

The concept was to create a website where the user can add him products with specifed quantity and prices where he can add that a list on the screen.Also, the website has some features to filter the product by it's name,quantity and price beside the ability to delete the product from the list as well.

### Adding items

![](https://i.imgur.com/SpiHSg2.gif)

As in the above, we can add new descriptions, prices and quantities. These will then feature in the updated table below the input.

### Autocompletion

We also added an autocomplete feature, which provides suggestions retrieved from the database. The price also automatically fills a suggestion, also from the database.

![Almond existing demo](https://i.imgur.com/jnuuYZj.gif)

### Deletion

We added an option to delete each option:

![](https://i.imgur.com/JRYCs8E.gif)


### Filter

We provided an option to filter.

![](https://i.imgur.com/gBtifhL.gif)

### Sort

And buttons to sort the items by quantity or price.

![](https://i.imgur.com/EMmb7fu.gif)


## Tables of the DataBase

We set out schemas to produce tables as follows:

![](https://i.imgur.com/Dx5VyQb.png)

![](https://i.imgur.com/OTdOijU.png)

If we had more time, we would have developed the database to include a master database and a live database. We would also have added more fields, such as for total quantity per each product type.

## User Story

```gherkin=
# 1st Scenario 
    - User: Entered the website and 
    searched for a product, 
    Result :He'll have an autocomplete from the products in the database.
    
# 2nd Scenario 
    - User: Entered the website and entered a product with price and quantity
    - Result : The product will be added to the database and the table if he's not in the database.
    
# 3rd Scenario

    - User: Entered the website and want to filter the list of the product by either clicking on sorting by quantity or price.
    - Result : On clicking the list of the product will be sorted depending on quantities and prices.
    
# 4th Scenario

    - User: Entered the website, and want to search for a product in the database with specific name,quantitiy and price will 
   -Result : The list will be updated to have only the products which meets the requirements.


```

## Heroku

### Add Heroku to local repo:
In CLI enter:

``` heroku git:remote -a murmuring-sands-11805 ```

* [Heroku Repo](https://dashboard.heroku.com/apps/murmuring-sands-11805)
* [Heroku Clone link](https://git.heroku.com/murmuring-sands-11805.git)
* [Heroku hosted app](https://murmuring-sands-11805.herokuapp.com/)
* [Research guide to set-up Heroku database](https://github.com/WebAhead5/Research/blob/master/Week7/Database%20setup%20and%20maintenance.md)


### References
* [Week 6 MonkeySearch Project](https://hackmd.io/_PY9HJmxSSuJMUWHT5R6TQ)


