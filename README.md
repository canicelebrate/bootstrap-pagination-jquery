bootstrap-pagination-jquery
===========================
This plugin is migrated from [Another repository@github](https://github.com/markbates/jquery-bootstrap-pagination), Here this plugin just implemnts the display_max option whereas the owner of the original rep looks like he/she does'n want to fix it. Furthermore, the orignal repository is based on CoffeeScript, So I just edit the javascript here and added some comments(Only chinese can understand it). 

jquery plugin to support bootstrap paginiaton component(support display_max) and fixed the issue that apply paginiation on same page container div element multiple times will cause callback function to be invoked many times.

#UI
__Select first page__
![Select first page](http://wwstudiogithub.qiniudn.com/bootstrap-pagination-jquery%2Fbootstrap_pagination1.png)

__Select last page__
![Select last page](http://wwstudiogithub.qiniudn.com/bootstrap-pagination-jquery%2Fbootstrap_pagination2.png)

__Select middle page for many pages scenarios__
![Select middle page for many pages scenarios](http://wwstudiogithub.qiniudn.com/bootstrap-pagination-jquery%2Fbootstrap_pagination3.png)

#Usage
###Javascript
```
// Basic usage:
$("#my-pagination-section").pagination();

// With options:
$("#my-pagination-section").pagination({
  total_pages: 10,
  current_page: 2,
  callback: function(event, page) {
    return alert("Page " + page + " was clicked!");
  }
});

// Retrieve the underlying PaginationView:
$("#my-pagination-section").data("paginationView");
```

###Options and Defaults:
```
# what is the current page:
current_page: 1
# how many pages are there total:
total_pages: 1
# change text of the 'next' link,
# set to false for no next link:
next: "&gt;"
# change text of the 'previous' link,
# set to false for no previous link:
prev: "&lt;"
# change text of the 'first' link,
# set to false for no first link:
first: false
# change text of the 'last' link,
# set to false for no last link:
last: false
# how many links before truncation happens(NOTICE:display_max can ONLY accept value >=3):
display_max: 8
# render nothing if there is only 1 page:
ignore_single_page: true
# disable turbolinks:
no_turbolink: false
```
