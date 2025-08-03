// src/Components/GoogleMapPicker.jsx
import React, { useEffect, useRef, useState } from "react";

const GoogleMapPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 27.7172, lng: 85.3240 });
  const inputRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 14,
      });

      const input = inputRef.current;
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert("No details available for the selected place.");
          return;
        }

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setCoordinates(location);
        onLocationSelect(location);

        map.setCenter(place.geometry.location);
        map.setZoom(15);

        if (markerRef.current) {
          markerRef.current.setPosition(location);
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: location,
            map: map,
          });
        }
      });

      map.addListener("click", (e) => {
        const clickedLocation = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };

        setCoordinates(clickedLocation);
        onLocationSelect(clickedLocation);

        if (markerRef.current) {
          markerRef.current.setPosition(clickedLocation);
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: clickedLocation,
            map: map,
          });
        }
      });
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDMSluINr9jR8qr4hBrzTelkc6eRyM3E1M&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      initMap();
    } else {
      loadScript();
    }
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Pick Location</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search place"
        className="mb-3 w-full px-3 py-2 border border-gray-300 rounded"
      />
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-gray-300 shadow"
      ></div>
      <div className="mt-2 text-sm text-gray-700">
        Selected: Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
      </div>
    </div>
  );
};

export default GoogleMapPicker;
