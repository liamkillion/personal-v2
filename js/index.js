// sidebar overlay
$('.ui.right.sidebar').sidebar({
  dimPage: false,
  transition: 'overlay',
  exclusive: false,
  closable: true
});


$('.ui.right.sidebar')
  .sidebar('attach events', '.hamburger-sidebar');

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('div.ui.top.fixed.small.menu.nav-down').outerHeight();

$(window).scroll(function(event) {
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('div.ui.top.fixed.small.menu.nav-down').removeClass('nav-down').addClass('nav-up');
    $('img.logo-down').removeClass('logo-down').addClass('logo-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('div.ui.top.fixed.small.menu.nav-up').removeClass('nav-up').addClass('nav-down')
      $('img.logo-up').removeClass('logo-up').addClass('logo-down')
    }
  }

  lastScrollTop = st;
}

$("div.ui.top.fixed.small.menu").hover(function() {
  $(this).removeClass('nav-up').addClass('nav-down')
}, function() {
  $(this).removeClass('nav-down').addClass('nav-up')
});

$("div.ui.top.fixed.small.menu").hover(function() {
  $('img.logo').removeClass('logo-up').addClass('logo-down')
}, function() {
  $('img.logo').removeClass('logo-down').addClass('logo-up')
});

//smooth scrolling
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });