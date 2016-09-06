/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';


function videoControl(callback) {

    const $video  = document.getElementById('J_Video');
    const $canvas = document.getElementById('J_Canvas');
    const $touch  = document.getElementById('J_Touch');

    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const ctx = $canvas.getContext('2d');
    $canvas.width = width;
    $canvas.height = height;

    function draw() {
        ctx.drawImage($video, 0, 0, width, height);

        window.requestAnimationFrame(draw)
    }

    draw();

    function absorbEvent(event) {
        const e = event || window.event;
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }

    document.body.addEventListener('touchstart', absorbEvent);

    $touch.addEventListener('touchstart', function(e){
        absorbEvent(e)

        callback('play');
        $touch.classList.add('on');
        $video.play();
    });

    $touch.addEventListener('touchend', function(e){
        $touch.classList.remove('on');
        $video.pause();
        callback('pause');
    });

    $video.addEventListener('ended', function(){
        callback('end');
    });
}

window.videoControl = videoControl;