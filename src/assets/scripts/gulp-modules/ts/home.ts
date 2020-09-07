/* eslint-disable */
/// <reference path ='../../../../typings.d.ts'/>



// console.log(sayHello('2'));


import $ =  require('jquery');
import LocomotiveScroll =  require('locomotive-scroll');
// // import * as m from "SomeModule";
// // import * as Locomotive from 'locomotive-scroll'
// // console.log(Locomotive);
console.log($);
console.log(LocomotiveScroll);

;
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".js-scroll-container"),
  smooth: true,
    smoothMobile: false,
    inertia: 1.1
}); 

/* eslint-enable */