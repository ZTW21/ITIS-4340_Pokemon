const getIdFromUrl = (url) => {
	const idPattern = /pokemon\/(\d+)\//;
	const match = url.match(idPattern);
	return match ? match[1] : "N/A";
};

const getImgUrl = (url) => {
	const id = getIdFromUrl(url);
	return `${process.env.PUBLIC_URL}/sprites/pokemon/${id}.png`;
};

export { getImgUrl };
