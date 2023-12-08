export type WeatherDataProps = {
	base: string;
	clouds: {
		all: number;
	};
	dt: number;
	coord: {
		lon: number;
		lat: number;
	};
	main: {
		feels_like: number;
		humidity: number;
		pressure: number;
		temp: number;
		temp_max: number;
		temp_min: number;
	};
	name: string;
	sys: {
		country: string;
		id: number;
		sunrise: number;
		sunset: number;
		type: number;
	};
	timezone: number;
	visibility: number;
	weather: {
		description: string;
		icon: string;
		main: string;
		id: string;
	}[];
	wind: {
		deg: number;
		speed: number;
	};
};

export type ClickedLocationProps = {
	lat: number;
	lng: number;
};

export type UserLocationType = {
	location: ClickedLocationProps;
	zoom: number;
};
