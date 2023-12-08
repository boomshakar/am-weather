"use client";

import type { LeafletMouseEvent } from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import favLocationPinIcon from "../assets/icons/fav_pin.png";
import locationPinIcon from "../assets/icons/location-pin.png";
import { OW_API_KEY, initialWeatherLocation, userDefault } from "../constants";
import useQuery from "../hooks/useQuery";
import { ClickedLocationProps, WeatherDataProps } from "../types";
import { Favourites } from "./Favourites";
import { MarkerPopup } from "./MarkerPopup";

// Custom Location Icons
const locationPin = new Icon({
	iconUrl: locationPinIcon,
	iconSize: [38, 38],
});

const favLocationPin = new Icon({
	iconUrl: favLocationPinIcon,
	iconSize: [38, 38],
});

/**
 * Map component to display a Leaflet map with weather data and user interactions.
 * @component
 */
const Map = () => {
	const [favourites, setFavourites] = useState<WeatherDataProps[]>([]);
	const [clickedLocation, setClickedLocation] = useState<ClickedLocationProps | null>(initialWeatherLocation);

	// Weather data query
	const { data: weatherData } = useQuery<WeatherDataProps>(
		`/weather?lat=${clickedLocation?.lat}&lon=${clickedLocation?.lng}&appid=${OW_API_KEY}&units=metric`
	);

	// Load favourites from localStorage on component mount
	useEffect(() => {
		const fav = localStorage.getItem("favorite-data");
		const favArray = fav && JSON.parse(fav);
		if (Array.isArray(favArray)) {
			setFavourites(favArray);
		}
	}, []);

	/**
	 * Handle saving and removing favourite locations.
	 * @function
	 * @param {WeatherDataProps} data - Weather data of the location.
	 */
	const handleSaveFavourites = (data: WeatherDataProps) => {
		const isAlreadyFavourited = favourites?.find(
			(favourite) => favourite.coord.lat === data.coord.lat && favourite.coord.lon === data.coord.lon
		);
		if (!isAlreadyFavourited) {
			setFavourites((prevData) => [...prevData, data]);
			localStorage.setItem("favorite-data", JSON.stringify([...favourites, data]));
		} else {
			const filteredData = favourites?.filter(
				(favourite) => favourite.coord.lat !== data.coord.lat && favourite.coord.lon !== data.coord.lon
			);
			setFavourites([...filteredData]);
			localStorage.setItem("favorite-data", JSON.stringify([...filteredData]));
		}
	};

	/**
	 * Clear all favourites and remove from localStorage.
	 * @function
	 */
	const clearFavourites = () => {
		localStorage.removeItem("favorite-data");
		setFavourites([]);
	};

	//Complete Map API URL Request
	const mapUrl = "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=" + "" + OW_API_KEY;

	/**
	 * Custom component to handle click events on the map to set the clicked location.
	 * @component
	 */
	const LocationMarker = () => {
		const [position, setPosition] = useState<ClickedLocationProps | null>(null);
		const map = useMapEvents({
			click(e: LeafletMouseEvent) {
				setPosition(e.latlng);
				setClickedLocation(e.latlng);
				map.flyTo(e.latlng, map.getZoom());
			},
		});

		return position === null ? null : (
			<Marker position={position}>
				<Popup>You are here</Popup>
			</Marker>
		);
	};

	return (
		<>
			<div className="map-container">
				<MapContainer
					center={{ lat: userDefault.location.lat, lng: userDefault.location.lng }}
					zoom={userDefault.zoom}
					style={{ minHeight: "60rem", maxWidth: "73rem" }}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<LayersControl position="topright" collapsed={false} hideSingleBase={false}>
						<LayersControl.Overlay name="Temperature Map">
							<TileLayer
								attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
								url={mapUrl}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay checked name="Show/Hide Favourite locations">
							<LayerGroup>
								{favourites?.length
									? favourites.map((res) => (
											<Marker
												key={`${res.coord.lon}-${res.coord.lat}`}
												position={{ lat: res.coord.lat, lng: res.coord.lon }}
												icon={favLocationPin}
											>
												<Popup>
													<MarkerPopup
														weatherData={res}
														handleSaveFavourites={handleSaveFavourites}
														favourites={favourites}
													/>
												</Popup>
											</Marker>
									  ))
									: null}
							</LayerGroup>
						</LayersControl.Overlay>

						{clickedLocation && (
							<Marker position={clickedLocation} icon={locationPin}>
								<Popup>
									{weatherData && (
										<MarkerPopup
											weatherData={weatherData}
											handleSaveFavourites={handleSaveFavourites}
											favourites={favourites}
										/>
									)}
								</Popup>
							</Marker>
						)}
						<LocationMarker />
					</LayersControl>
				</MapContainer>
			</div>

			<Favourites favourites={favourites} resetFavoritesHandler={clearFavourites} />
		</>
	);
};

export default Map;
