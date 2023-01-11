

$("h1").text("Goodbye")


$("button").html("<em>click</em>")

$("a").attr("href", "https://www.yahoo.com");

// $("button").click(function() {
//     alert("you clicked a button");
// });

$(document).keypress(function(event){
    $("h1").text(event.key);
});


// $("button").click(function() {
//     $("h1").slideToggle();
// });

$("button").click(function() {
    $("h1").slideUp().slideDown().animate({opacity: .5});
});