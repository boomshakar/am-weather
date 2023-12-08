// Generate random string with the length of 5
export const uuid = () => Math.random().toString(36).slice(2, 7);

/**
 * Get the date and time adjusted with a specified shift from UTC based on a Unix timestamp.
 * @param {number} unixTimestamp - The Unix timestamp (in seconds).
 * @param {number} shiftInSeconds - The shift in seconds from UTC.
 * @returns {Date} - The adjusted date and time.
 */
export const getDateWithShift = (unixTimestamp: number, shiftInSeconds: number): Date => {
	// Convert the shift to milliseconds
	const offsetMilliseconds = shiftInSeconds * 1000;

	// Convert the Unix timestamp to milliseconds and apply the offset
	const adjustedTimestamp = unixTimestamp * 1000 + offsetMilliseconds;

	// Create a new Date object with the adjusted timestamp
	const adjustedDate = new Date(adjustedTimestamp);

	return adjustedDate;
};

/**
 * Gets the current longitude and latitude of the user's browser using the Geolocation API.
 * @returns A Promise that resolves to an object containing the latitude and longitude.
 *          Example: { latitude: 37.7749, longitude: -122.4194 }
 */
export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
	return new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					resolve({ latitude, longitude });
				},
				(error) => {
					reject(error.message);
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
				}
			);
		} else {
			reject("Geolocation is not supported in this browser");
		}
	});
};
