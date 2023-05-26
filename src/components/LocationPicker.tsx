import React, { useState } from "react";
import { FormItem } from "../types/data";
import MapPicker from "react-google-map-picker";

const DefaultLocation = { lat: 0, lng: 0 };
const DefaultZoom = 10;

const getLocations = (value: string) => {
  if (value.length === 0) return null;
  const [lat, lng] = value.split(",");
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
};

export default function LocationPicker(props: {
  field: FormItem;
  getValueCB: (value: string, id: number) => void;
}) {
  const loc = getLocations(props.field.value);
  const [defaultLocation, setDefaultLocation] = useState(
    loc || DefaultLocation
  );

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [selected, setSelected] = useState(loc ? true : false);

  function updateValue() {
    props.getValueCB(`${location.lat},${location.lng}`, props.field.id);
    setSelected(true);
  }

  function handleChangeLocation(lat: number, lng: number) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  return (
    <>
      <button
        className="p-2 bg-cyan-500 rounded text-white"
        onClick={handleResetLocation}
      >
        Reset Location
      </button>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />

      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: "400px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      />
      <button
        className={`${
          selected ? "bg-green-400" : "bg-red-400"
        } p-2 rounded text-white`}
        onClick={updateValue}
      >
        Select Location
      </button>
    </>
  );
}
