import type { LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { ClickedLocationProps } from "../types";

/**
 * Custom component to handle click events on the map to set the clicked location.
 * @component
 */
export const LocationMarker = ({ callback }: { callback?: (e: LeafletMouseEvent) => void }) => {
	const [position, setPosition] = useState<ClickedLocationProps | null>(null);
	const map = useMapEvents({
		click(e: LeafletMouseEvent) {
			setPosition(e.latlng);
			if (callback) callback(e);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
};
