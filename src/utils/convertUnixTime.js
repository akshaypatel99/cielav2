export const formatTime = (unixTime, timezoneOffset) => {
	return new Date(unixTime * 1e3).toTimeString().slice(0, 5);
};

export const formatDate = (unixTime, timezoneOffset) => {
	return new Date(unixTime * 1e3).toDateString();
};

export const formatDayDate = (unixTime, timezoneOffset) => {
	const day = new Date(unixTime * 1e3).toLocaleString('en-gb', {
		weekday: 'short',
	});
	let date = new Date(unixTime * 1e3).getDate();
	const newDate = dateOrdinalSuffix(date);
	return `${day} ${newDate}`;
};

export const dateOrdinalSuffix = (dt) => {
	return (
		dt +
		(dt % 10 === 1 && dt !== 11
			? 'st'
			: dt % 10 === 2 && dt !== 12
			? 'nd'
			: dt % 10 === 3 && dt !== 13
			? 'rd'
			: 'th')
	);
};
