
// * GET PROMISE FUNC FOR AJAX REQUEST START
// async function getPromise(data, url, parse) {
// 	let promise = new Promise(function (resolve, reject) {
// 		$.ajax({
// 			url: url,
// 			data: data,
// 			type: 'POST',
// 			global: false,
// 			async: true,
// 			success: function (res) {
// 				let data = (!parse) ? JSON.parse(res) : res
// 				resolve(data);
// 			},
// 			error: function (jqXHR, status, errorThrown) {
// 				reject(jqXHR);
// 			},
// 			beforeSend: function () {},
// 		});
// 	});

// 	return await promise;
// }


const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".js-scroll-container"),
  smooth: true,
	smoothMobile: false,
	inertia: 1.1
});


/*
* circle start
*/

const circleTL = function() {
	const circle = '.sec-circle';
	const img = '.section__0 .section__img img';
	const title = '.section__text h2';
	const text = '.section__text p';
	gsap.set([circle], {	scale: 55});
	gsap.set([title, text], { autoAlpha: 0 });
	const obj = {
		// paused: true,
	}
	const tl = gsap.timeline(obj);
		tl.fromTo(circle, 3, { autoAlpha: 1, scale: 55, }, { autoAlpha: 1, scale: 0, ease: "expo.Out" })
		tl.fromTo([title, text], 1.5, {x: 100, autoAlpha: 0}, {x: 0, autoAlpha: 1, stagger: 0.1}, '<')
		tl.fromTo(img, 3, {
			rotation: 20,
			scale: 1.5
		}, {
			rotation: 0,
			transformOrigin: "50% 50%",
			scale: 1
		}, '<')
	return tl;
};
// circleTL().play()
// createAnimationTool(circleTL)
/*
* circle end
*/


locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".js-scroll-container", {
scrollTop(value) {
	return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
	return {
		top: 0,
		left: 0,
		width: window.innerWidth,
		height: window.innerHeight
	};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector(".js-scroll-container").style.transform ? "transform" : "fixed"
});

ScrollTrigger.create({
	trigger: ".section.section__0",
	start: "50% 50%",
	end: "+=1200",
	scroller: ".js-scroll-container",
	animation: circleTL(),
	scrub: true,
	pin: true
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();