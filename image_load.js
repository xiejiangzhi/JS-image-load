
// email: xiejiangzhi@gmail.com

$(document).ready(function(){
  var Config = {
    images_selector: "img[load_path]",
    path_attr: "load_path"
  };

  var $images = $(Config.images_selector);

  $(window).resize(onLoadImage)
  .scroll(onLoadImage);

  //init load
  onLoadImage();

  function onLoadImage(event){
    for (var i = $images.length; i >= 0; i--){
      var $img = $($images[i]);
      if ( try_load($img) ){ $images.splice(i, 1); }
    }
  }

  // ================================ private ==========================

  function try_load(img){
    var $img = $(img);
    var load_path = $img.attr(Config.path_attr);

    if ($img.attr("src") != load_path && is_display($img)){
      $img.attr("src", load_path);
      return true;
    } else {
      return false;
    }    
  }

  function is_display($img){
    var $win = $(window);
    var win_top = $win.scrollTop();
    var win_bottom = win_top + (window.innerHeight || document.body.clientHeight);

    var img_top = $img.offset().top;
    var img_bottom = img_top + $img.height();

    return val_in_range(img_top, win_top, win_bottom) ||
      val_in_range(img_bottom, win_top, win_bottom);
  }

  function val_in_range(val, min, max){
    return val > min && val < max;
  }
  
});

