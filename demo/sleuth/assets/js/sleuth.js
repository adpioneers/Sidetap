// Generated by CoffeeScript 1.3.1
(function() {

  $(document).ready(function() {
    var about, detail, gallery, photo, render_thumbnails, show_image, show_thumbnails, st, thumbnails,
      _this = this;
    st = sidetap();
    gallery = $('#gallery');
    thumbnails = gallery.find('.thumbnails');
    detail = $('#detail');
    photo = detail.find('figure');
    about = $('#about');
    $('header .menu').click(st.toggle_nav);
    $('header .info').click(function() {
      return st.show_section(about, {
        animation: 'upfrombottom'
      });
    });
    $('#about  a.cancel').click(function() {
      return st.show_section(gallery, {
        animation: 'downfromtop'
      });
    });
    $('#detail a.back').click(function() {
      return st.show_section(gallery, {
        animation: 'infromleft'
      });
    });
    show_thumbnails = function(section, images) {
      var i, img, loaded, thumbs, total, _i, _len, _ref, _results;
      thumbnails.empty().addClass('loading');
      gallery.find('h1').text(section + ' Bears');
      thumbs = [];
      total = images[section].length;
      loaded = 0;
      _ref = images[section];
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        img = _ref[i];
        _results.push(thumbs.push($("<img src='" + img.url_s + "' />").load(function() {
          loaded++;
          if (loaded === total) {
            return render_thumbnails(images[section]);
          }
        })));
      }
      return _results;
    };
    render_thumbnails = function(images) {
      var i, img, _i, _len;
      thumbnails.removeClass('loading').hide();
      for (i = _i = 0, _len = images.length; _i < _len; i = ++_i) {
        img = images[i];
        thumbnails.append($("<li" + ((i + 1) % 4 === 0 ? ' class="right"' : '') + ">\n  <a href='#'><img src='" + img.url_s + "' alt='" + i + "' /></a>\n</li>"));
      }
      thumbnails.fadeIn('fast');
      return thumbnails.find('a').click(function() {
        show_image(images[$(this).find('img').prop('alt')]);
        return false;
      });
    };
    show_image = function(img) {
      st.show_section(detail, {
        animation: 'infromright'
      });
      photo.addClass('loading');
      $("<img src='" + img.url_m + "' />").load(function() {
        photo.removeClass('loading').hide();
        photo.find('img').replaceWith(this);
        return photo.fadeIn('fast');
      });
      photo.find('cite').html(img.title);
      return photo.find('[rel="author"]').prop('href', "http://flickr.com/photos/" + img.owner + "/" + img.id).html(img.ownername);
    };
    show_thumbnails(st.stp_nav.find('a.selected').text(), images);
    return st.stp_nav.find('nav a').click(function() {
      $(this).addClass('selected').siblings().removeClass('selected');
      st.toggle_nav();
      show_thumbnails($(this).text(), images);
      return false;
    });
  });

}).call(this);
