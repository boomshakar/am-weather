import { WeatherDataProps } from "../types";
import { getDateWithShift } from "../utils";

type Props = {
	resetFavoritesHandler: () => void;
	favourites: WeatherDataProps[];
};
export const Favourites = ({ favourites, resetFavoritesHandler }: Props) => {
	return (
		<div className="favourites_list">
			{favourites.map((favourite) => (
				<div className="favourites_list_item" key={`${favourite.coord.lon}-${favourite.coord.lat}`}>
					<div className="favourites_list_item_icon">
						<img
							src={`https://openweathermap.org/img/wn/${favourite?.weather?.[0]?.icon}.png`}
							width={40}
							height={40}
							alt="Favourite report icon"
						/>
					</div>
					<div className="favourites_list_item_locale">
						<p>
							{favourite?.name || "Unnamed"},&nbsp;{favourite?.sys?.country || "Unknown"}
						</p>
						<span>{getDateWithShift(favourite?.dt, favourite?.timezone).toLocaleTimeString()}</span>
					</div>
					<div className="favourites_list_item_condition">
						<span>{Math.round(favourite?.main?.temp)}°C</span>
					</div>
				</div>
			))}

			<div className="reset_favourites">
				{favourites.length ? <button onClick={resetFavoritesHandler}>Reset Favourites</button> : null}
			</div>
		</div>
	);
};
