$(".site-menu li").click(function() {
    $(".site-menu li.active").removeClass("active");
    $(this).addClass("active");
    console.log("hello");
});