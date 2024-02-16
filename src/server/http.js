const http = async (url, config) => {
	return await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		...config,
	}).then((res) => res.json());
};

const getData = (url) => {
	return http(url, {});
};

const postData = (url, param) => {
	return http(url, {
		method: "POST",
		body: JSON.stringify(param),
	});
};

export { getData, postData };
