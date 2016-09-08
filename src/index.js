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
    const $meida  = document.getElementById('J_Media');

    const videoWidth = 1334;
    const videoHeight = 750;

    $video.play();

    setTimeout(function() {
        $video.pause();
    }, 1000);

    function draw() {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;

        const ctx = $canvas.getContext('2d');
        $canvas.width = width;
        $canvas.height = height;
        $meida.classList.add('show');

        const ww = width;
        const wh = ww / videoWidth * videoHeight;

        const hh = height;
        const hw = hh * videoWidth / videoHeight;

        const ctxWidth = Math.min(ww, hw);
        const ctxHeight = Math.min(hh, wh);

        ctx.drawImage($video, ((ctxWidth - width) / -2), ((ctxHeight - height) / -2), ctxWidth, ctxHeight);

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

        $touch.classList.add('on');
        $touch.classList.remove('pause');
        $video.play();

        callback('play');
    });

    $touch.addEventListener('touchend', function(e){
        $touch.classList.remove('on');
        $touch.classList.add('pause');
        $video.pause();

        callback('pause');
    });

    $video.addEventListener('ended', function(){
        callback('end');

        $meida.classList.add('hide');

        setTimeout(function() {
            $meida.remove();
        }, 500);
    });
}

window.videoControl = videoControl;