
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
