import type { WeatherDataProps } from "../types";
import { getDateWithShift } from "../utils";

type Props = {
	favourites: WeatherDataProps[];
	weatherData: WeatherDataProps;
	// setFavourites: React.Dispatch<React.SetStateAction<WeatherDataProps[]>>;
	handleSaveFavourites: (data: WeatherDataProps) => void;
};

export const MarkerPopup = ({ favourites, weatherData, handleSaveFavourites }: Props) => {
	const isAlreadyFavourited = favourites?.find(
		(favourite) => favourite.coord.lat === weatherData.coord.lat && favourite.coord.lon === weatherData.coord.lon
	);

	return (
		<div className="weather_insight_popover">
			<div className="weather_insight_popover_top">
				<span>
					{weatherData?.name},&nbsp;{weatherData?.sys?.country}
				</span>
				<span>{getDateWithShift(weatherData?.dt, weatherData?.timezone).toLocaleTimeString()}</span>
			</div>
			<div className="weather_insight_popover_mid">
				<p>{Math.round(weatherData?.main?.temp)}°C</p>
				<span>
					{weatherData?.weather?.[0]?.main},&nbsp;{weatherData?.weather?.[0]?.description}
				</span>
			</div>
			<div className="weather_insight_popover_btm">
				<div className="weather_insight_popover_btm__conditions">
					<span title="Humidity">💧&nbsp;{weatherData?.main?.humidity}%</span>
					<span title="Pressure">🌡️&nbsp;{weatherData?.main?.pressure}&nbsp;hpa</span>
					<span title="Wind speed">💨&nbsp;{weatherData?.wind?.speed}&nbsp;m/s</span>
				</div>
				<div>
					{weatherData?.weather?.[0]?.icon ? (
						<img
							src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}.png`}
							width={40}
							height={40}
						/>
					) : null}
				</div>
			</div>
			<div className="favourite_cta">
				<button className="favourite_cta_button" onClick={() => handleSaveFavourites(weatherData)}>
					{isAlreadyFavourited ? "Remove from favourites" : "Save as favourites"}
				</button>
			</div>
		</div>
	);
};
