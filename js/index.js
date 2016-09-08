(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

function videoControl(callback) {

    var $video = document.getElementById('J_Video');
    var $canvas = document.getElementById('J_Canvas');
    var $touch = document.getElementById('J_Touch');
    var $meida = document.getElementById('J_Media');

    var videoWidth = 1334;
    var videoHeight = 750;

    $video.play();

    setTimeout(function () {
        $video.pause();
    }, 1000);

    function draw() {
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;

        var ctx = $canvas.getContext('2d');
        $canvas.width = width;
        $canvas.height = height;
        $meida.classList.add('show');

        var ww = width;
        var wh = ww / videoWidth * videoHeight;

        var hh = height;
        var hw = hh * videoWidth / videoHeight;

        var ctxWidth = Math.min(ww, hw);
        var ctxHeight = Math.min(hh, wh);

        ctx.drawImage($video, (ctxWidth - width) / -2, (ctxHeight - height) / -2, ctxWidth, ctxHeight);

        window.requestAnimationFrame(draw);
    }

    draw();

    function absorbEvent(event) {
        var e = event || window.event;
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }

    document.body.addEventListener('touchstart', absorbEvent);

    $touch.addEventListener('touchstart', function (e) {
        absorbEvent(e);

        $touch.classList.add('on');
        $touch.classList.remove('pause');
        $video.play();

        callback('play');
    });

    $touch.addEventListener('touchend', function (e) {
        $touch.classList.remove('on');
        $touch.classList.add('pause');
        $video.pause();

        callback('pause');
    });

    $video.addEventListener('ended', function () {
        callback('end');

        $meida.classList.add('hide');

        setTimeout(function () {
            $meida.remove();
        }, 500);
    });
}

window.videoControl = videoControl;

},{}]},{},[1]);
