$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      loop: true, // Enables infinite loop
      autoplay: true, // Auto play the slides
      autoplayTimeout:5000, // Time between slides (5 seconds)
      autoplayHoverPause: true, // Pause on hover
      margin: 10, // Space between items
      nav: true, // Show navigation arrows
      dots: true, // Show dots below slider
      responsive: {
        0: { items: 1 }, // 1 item for mobile
        600: { items: 2 }, // 2 items for tablets
        1000: { items: 3 }, // 3 items for desktop
      },
    });

  
  

  // Pause on hover
  $('.testimonial-card').hover(
    function () {
      owl.trigger('stop.owl.autoplay'); // Pause autoplay
    },
    function () {
      owl.trigger('play.owl.autoplay', [2000]); // Resume autoplay after 3 seconds
    }
  );
});
