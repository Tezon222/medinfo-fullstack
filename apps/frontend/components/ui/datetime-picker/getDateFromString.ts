const DATE_TODAY = new Date();

const getDateFromString = (dateString: string, fallback = DATE_TODAY) => {
	if (dateString === "") {
		// console.info(
		// 	`%cGetDateFromString: Value is an empty string, returning fallback date`,
		// 	"color: yellow; font-weight: 500; font-size: 12px;"
		// );

		return fallback;
	}

	const date = new Date(dateString);

	if (Number.isNaN(date.getTime())) {
		console.info(
			`%cGetDateFromString: Invalid date string '${dateString}', returning fallback date`,
			"color: yellow; font-weight: 500; font-size: 12px;"
		);
		console.trace("Invalid date string");

		return fallback;
	}

	return date;
};

export { getDateFromString };
