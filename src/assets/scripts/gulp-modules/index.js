
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

const secFoto2 = function() {
	const img = '.section__2 .section__img img';
	const text = '.section__2 h2';
	const obj = {
		// paused: true,
	}
	const tl = gsap.timeline(obj);
		tl.fromTo(img, 5, {
			css: {
				transform: 'rotateY(0) rotateX(50deg) rotateZ(20deg)'
			}
		}, {
				css: {
					transform: ' rotateY(0) rotateX(50deg) rotateZ(-20deg)'
				}
		})
		tl.fromTo(text, 5, {xPercent: -50}, {xPercent: 0}, '<')
	return tl;
};
// circleTL().play()
// createAnimationTool(circleTL)
/*
* circle end
*/
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
			scale: 2
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
ScrollTrigger.create({
	trigger: ".section.section__2",
	start: "top center",
	// end: "+=1000",
	// markers: true,
	scroller: ".js-scroll-container",
	animation: secFoto2(),
	scrub: true,
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();







let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 



ScrollTrigger.create({
	trigger: ".section__3",
	start: "top bottom",
	end: "+=1200",
	scroller: ".js-scroll-container",
	onUpdate: (self) => {
		let skew = clamp(self.getVelocity() / -250);
		// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
		if (Math.abs(skew) > Math.abs(proxy.skew)) {
					console.log(self.getVelocity() / -300)
	
			proxy.skew = skew;
			gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
		}
	}
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", {transformOrigin: "center", force3D: true});
