import type { UserLocationType } from "../types";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const OW_API_KEY = import.meta.env.VITE_APP_API_KEY;

export const initialWeatherLocation = { lng: -1, lat: 54 };

// User default location
export const userDefault: UserLocationType = {
	location: initialWeatherLocation,
	zoom: 13,
};
