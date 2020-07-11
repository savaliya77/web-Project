$('.flip-container .flipper').click(function() {
    $(this).closest('.flip-container').toggleClass('hover');
    $(this).css('transform, rotateY(180deg)');
});