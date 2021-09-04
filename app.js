
(function($){

    $('input.round').wrap('<div class="round" />').each(function() {
        var $input = $(this);
        var $div = $input.parent();
        var min = $input.data('min');
        var max = $input.data('max');
        var ratio = ($input.val() - min) / (max - min);
        var color = $input.data('color') ? $input.data('color') : "#91c2ff";

        var $circle = $('<canvas width="200px" heigth="200px"/>');
        var $color = $('<canvas width="200px" heigth="200px"/>');
            $div.append($circle);
            $div.append($color);
        var ctx = $circle[0].getContext('2d');

            ctx.beginPath();
            ctx.arc(100, 100, 85, 0, 2*Math.PI);
            ctx.lineWidth = 20;
            ctx.strokeStyle = "#FFF";
            ctx.shadowOffsetX = 2;
            ctx.shadowBlur = 5;
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.stroke();


        var ctx = $color[0].getContext('2d');
        ctx.beginPath();
            ctx.arc(100, 100, 85, -1/2*Math.PI, ratio*2*Math.PI - 1/2*Math.PI);
            ctx.lineWidth = 20;
            ctx.strokeStyle = color;
            ctx.stroke();


            $div.mousedown(function(event){
                event.preventDefault();
                $div.bind('mousemove', function(event){
                    var x = event.pageX - $div.offset().left - $div.width()/2;
                    var y = event.pageY - $div.offset().top - $div.height()/2;
                    var a = Math.atan2(x,-y) / (2*Math.PI);
                    if(a < 0){ a+=1; }
                    ctx.clearRect(0,0,200,200);
                    ctx.beginPath();
                    ctx.arc(100, 100, 85, -1/2*Math.PI, a*2*Math.PI - 1/2*Math.PI);
                    ctx.lineWidth = 20;
                    ctx.strokeStyle = color;
                    ctx.stroke();
                    $input.val(Math.round(a* (max - min) + min));
                })
            }).mouseup(function(event){
                event.preventDefault();
                $div.unbind('mousemove');
            })

    })

})(jQuery);




//ctx.fillStyle = "#FF0000"       RECTANGLE
//ctx.fillRect(0,0,100,50);


/* 
ctx.moveTo(0,0);                   TRACER LIGNE
ctx.lineTo(50,50);
ctx.lineTo(0,150);
ctx.lineTo(200,150);
ctx.closePath();
ctx.stroke(); 
*/