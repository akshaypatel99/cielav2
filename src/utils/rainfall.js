export const rainfall = (amount) => {
	if (amount > 0.01 && amount <= 0.5) {
		return '#0055de';
	} else if (amount > 0.5 && amount <= 1) {
		return '#007add';
	} else if (amount > 1 && amount <= 2) {
		return '#00b320';
	} else if (amount > 2 && amount <= 4) {
		return '#fecb00';
	} else if (amount > 4 && amount <= 8) {
		return '#fe9800';
	} else if (amount > 8 && amount <= 16) {
		return '#de2316';
	} else if (amount > 16 && amount <= 32) {
		return '#fd4fbb';
	} else if (amount > 32) {
		return '#a358ff';
	}
};

export const rainfallKey = [
	{
		color: '#d8f6fc',
		amount: '< 0.01',
		description: 'No rain',
	},
	{
		color: '#0055de',
		amount: '0.01-0.5',
		description: 'Drizzle',
	},
	{
		color: '#007add',
		amount: '0.5-1',
		description: 'Light rain',
	},
	{
		color: '#00b320',
		amount: '1-2',
		description: 'Light-Moderate rain',
	},
	{
		color: '#fecb00',
		amount: '2-4',
		description: 'Moderate rain',
	},
	{
		color: '#fe9800',
		amount: '4-8',
		description: 'Moderate-Heavy rain',
	},
	{
		color: '#de2316',
		amount: '8-16',
		description: 'Heavy rain',
	},
	{
		color: '#fd4fbb',
		amount: '16-32',
		description: 'Very Heavy rain',
	},
	{
		color: '#a358ff',
		amount: '> 32',
		description: 'Torrential rain',
	},
];
