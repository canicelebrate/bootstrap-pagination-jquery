(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function($) {
    /*
    $(".my-pagination").pagination();
    
    $(".my-pagination").pagination({total_pages: 3, current_page: 1});
    
    $(".my-pagination").pagination({
      total_pages: 3,
      current_page: 1,
      callback: function(event, page) {
        alert("Clicked: " + page);
      }
    });
    */

    var PaginationView;

    $.fn.pagination = function(options) {
        return this.each(function () {
            return new PaginationView($(this), options).render();
      });
    };
    return PaginationView = (function() {
      function PaginationView(el, options) {
        var defaults;

        this.el = el;
        this.change = __bind(this.change, this);
        this.clicked = __bind(this.clicked, this);
        this.isValidPage = __bind(this.isValidPage, this);
        this.render = __bind(this.render, this);
        this.pages = __bind(this.pages, this);
        this.buildLink = __bind(this.buildLink, this);
        this.buildLi = __bind(this.buildLi, this);
        this.buildLinks = __bind(this.buildLinks, this);
        defaults = {
          current_page: 1,
          total_pages: 1,
          next: "&gt;",
          prev: "&lt;",
          first: false,
          last: false,
          display_max: 8,
          ignore_single_page: true,
          no_turbolink: false
        };
        this.settings = $.extend(defaults, options);

        $("a", this.el).unbind("click");
        if ($(document).on) {
          $(this.el).on("click", "a", this.clicked);
        } else {
          $("a", this.el).live("click", this.clicked);
        }
        this.el.data("paginationView", this);
      }

      PaginationView.prototype.buildLinks = function() {
        var current_page, links, page, _i, _len, _ref;

        current_page = this.settings.current_page;
        links = [];
        if (this.settings.first) {
          links.push(this.buildLi(1, this.settings.first));
        }
        if (this.settings.prev) {
          links.push(this.buildLi(current_page - 1, this.settings.prev));
        }
        _ref = this.pages();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          page = _ref[_i];
          links.push(this.buildLi(page, page));
        }
        if (this.settings.next) {
          links.push(this.buildLi(current_page + 1, this.settings.next));
        }
        if (this.settings.last) {
          links.push(this.buildLi(this.settings.total_pages, this.settings.last));
        }
        return links;
      };

      PaginationView.prototype.buildLi = function(page, text) {
        if (text == null) {
          text = page;
        }
        return "<li>" + (this.buildLink(page, text)) + "</li>";
      };

      PaginationView.prototype.buildLink = function(page, text) {
        var data_attr;

        if (text == null) {
          text = page;
        }
        if (this.settings.no_turbolink) {
          data_attr = " data-no-turbolink='1'";
        } else {
          data_attr = "";
        }
        return "<a href='#' data-page='" + page + "'" + data_attr + ">" + text + "</a>";
      };

      PaginationView.prototype.pages = function() {
        var buf_pre, buf_suf,current_page, max, page, pages, total_pages, _i, _j, _k, _l, _m, _ref, _ref1, _ref2, _ref3;

        total_pages = this.settings.total_pages;
        current_page = this.settings.current_page;
        pages = [];
        max = this.settings.display_max;
        if (total_pages > max) {
            pages.push(1);
            //当前页大于或者等于最大显示页数
          if (current_page > max - 1) {
            pages.push("..");
          }

          //当前页是最后一页
          if (current_page === total_pages) {
              //页码从（总数-最大显示数+第一项
              for (page = total_pages - max+1+1; page <= total_pages; ++page) {
              pages.push(page);
              }
              return pages;
          }

            //当前页后面的页数少于最大显示页数
          if (total_pages - current_page < max - 1) {
              if (pages.indexOf("..") === -1) {
                  pages.push("..");
              }
            for (page = total_pages - max+2; page <= total_pages; ++page) {
              pages.push(page);
            }
          } else if (current_page > max - 1) {//当前页大于或等于最大显示页数且后面的页数大于最大显示页数
              buf_pre = Math.ceil(max / 2);
              buf_suf = max - buf_pre;
              if (max > 3) {
                  _ref2 = current_page - buf_pre + 1;
                  _ref3 = current_page + buf_suf - 1;
                  //当最大显示数为偶数时，确保总页数不超出最大显示数量
                  if (buf_suf === buf_pre) {
                      --_ref3;
                  }

                  for (page = _k = _ref2; _ref2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; page = _ref2 <= _ref3 ? ++_k : --_k) {
                      pages.push(page);
                  }
              }
              else if (max === 3) {
                  pages.push(current_page);
              }
              else {
                  //Is it possible that max value is less than 3 ?!!
              }
            
          } else if (current_page <= max - 1) {//当前页小于最大显示页数
            for (page = _l = 2; 2 <= max ? _l <= max-1 : _l >= max-1; page = 2 <= max ? ++_l : --_l) {
              pages.push(page);
            }
          }

            //确保页码唯一
          pages = $.grep(pages, function(v, k) {
            return $.inArray(v, pages) === k;
          });


          if (__indexOf.call(pages, total_pages) < 0) {//当前页码中不包含最后一页的话
              //当前页后面的页数大于最大显示的页数
            if (!((total_pages - current_page) < max - 1)) {
              pages.push("..");
            }
              //将最后一页的页码添加进来
            pages.push(total_pages);
          }
        } else {
          for (page = _m = 1; 1 <= total_pages ? _m <= total_pages : _m >= total_pages; page = 1 <= total_pages ? ++_m : --_m) {
            pages.push(page);
          }
        }
        return pages;
      };

      PaginationView.prototype.render = function() {
        var html, link, _i, _len, _ref;

        this.el.html("");
        if (this.settings.total_pages === 1 && this.settings.ignore_single_page) {
          return;
        }
        html = ["<div class='jquery-bootstrap-pagination'>"];
        html.push("<ul class='pagination'>");
        _ref = this.buildLinks();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          html.push(link);
        }
        html.push("</ul>");
        html.push("</div>");
        this.el.html(html.join("\n"));
        $("[data-page=" + this.settings.current_page + "]", this.el).closest("li").addClass("active");
        $("[data-page='..']", this.el).closest("li").addClass("disabled");
        $("[data-page='0']", this.el).closest("li").addClass("disabled");
        $("[data-page='" + (this.settings.total_pages + 1) + "']", this.el).closest("li").addClass("disabled");
        if (this.settings.current_page === 1 && this.settings.first) {
          $("li:first", this.el).removeClass("active").addClass("disabled");
        }
        if (this.settings.current_page === this.settings.total_pages && this.settings.last) {
          return $("li:last", this.el).removeClass("active").addClass("disabled");
        }
      };

      PaginationView.prototype.isValidPage = function(page) {
        return page > 0 && page !== this.settings.current_page && page <= this.settings.total_pages;
      };

      PaginationView.prototype.clicked = function(event) {
        var page;

        page = parseInt($(event.target).attr("data-page"));
        if (!this.isValidPage(page)) {
          return;
        }
        if (this.settings.callback != null) {
          this.settings.callback(event, page);
        }
        return this.change(page);
      };

      PaginationView.prototype.change = function(page) {
        page = parseInt(page);
        if (!this.isValidPage(page)) {
          return;
        }
        this.settings.current_page = page;
        return this.render();
      };

      return PaginationView;

    })();
  })(jQuery);

}).call(this);
