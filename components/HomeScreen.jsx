// components/HomeScreen.jsx
"use client"
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Map from './Map';
import useStore from '../store/store';

mapboxgl.accessToken =  "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ";

function HomeScreen({ setComponent }) {
  const setPickup = useStore((state) => state.setPickup);
  const setDestination = useStore((state) => state.setDestination);
  const setStop = useStore((state) => state.setStop);
  const setDate = useStore((state) => state.setDate);
  const setTime = useStore((state) => state.setTime);
  const setVehicle = useStore((state) => state.setVehicle);
  const setNote = useStore((state) => state.setNote);

  const pickup = useStore((state) => state.pickup);
  const destination = useStore((state) => state.destination);
  const stop = useStore((state) => state.stop);
  const date = useStore((state) => state.date);
  const time = useStore((state) => state.time);
  const vehicle = useStore((state) => state.vehicle);
  const note = useStore((state) => state.note);

  const [pointsSelected, setPointsSelected] = useState({
    start: { longitude: 0, latitude: 0 },
    stop: { longitude: 0, latitude: 0 },
    end: { longitude: 0, latitude: 0 },
  });

  const [startPointData, setStartPointData] = useState([]);
  const [endPointData, setEndPointData] = useState([]);
  const [stopPointData, setStopPointData] = useState([]);

  const [startPointClick, setStartPointClick] = useState(false);
  const [startPointAnchorEl, setStartPointAnchorEl] = useState(false);
  const [endPointClick, setEndPointClick] = useState(false);
  const [endPointAnchorEl, setEndPointAnchorEl] = useState(false);
  const [stopPointClick, setStopPointClick] = useState(false);
  const [stopPointAnchorEl, setStopPointAnchorEl] = useState(false);
  const startPointRef = useRef(null);
  const startPointid = startPointClick && startPointAnchorEl ? 'transition-popper' : undefined;
  const endPointRef = useRef(null);
  const endPointid = endPointClick && endPointAnchorEl ? 'transition-popper' : undefined;
  const stopPointRef = useRef(null);
  const stopPointid = stopPointClick && stopPointAnchorEl ? 'transition-popper' : undefined;

  const vehicleTypes = [
    {
      id: 1,
      name: 'Small Van',
      capacity: '5 seats',
      price: '$4.50',
      imageUrl: '/path-to-your-image/small-van.png',
    },
    {
      id: 2,
      name: 'Large Van',
      capacity: '10 seats',
      price: '$4.50',
      imageUrl: '/path-to-your-image/large-van.png',
    },
    {
      id: 3,
      name: 'Bus',
      capacity: '20 seats',
      price: '$4.50',
      imageUrl: '/path-to-your-image/bus.png',
    },
  ];

  const calculateDistance = (coord1, coord2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLng = toRadians(coord2.longitude - coord1.longitude);
    const lat1 = toRadians(coord1.latitude);
    const lat2 = toRadians(coord2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  useEffect(() => {
    if (pointsSelected.start.longitude && pointsSelected.end.longitude) {
      const startEndDistance = calculateDistance(pointsSelected.start, pointsSelected.end);
      console.log(`Distance between start and end: ${startEndDistance.toFixed(2)} km`);
    }

    if (pointsSelected.start.longitude && pointsSelected.stop.longitude) {
      const startStopDistance = calculateDistance(pointsSelected.start, pointsSelected.stop);
      console.log(`Distance between start and stop: ${startStopDistance.toFixed(2)} km`);
    }

    if (pointsSelected.stop.longitude && pointsSelected.end.longitude) {
      const stopEndDistance = calculateDistance(pointsSelected.stop, pointsSelected.end);
      console.log(`Distance between stop and end: ${stopEndDistance.toFixed(2)} km`);
    }
  }, [pointsSelected]);

  const getStartPointData = async (point) => {
    const query = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?country=au&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    setStartPointData(json.features);
  };

  const getEndPointData = async (point) => {
    const query = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?country=au&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    setEndPointData(json.features);
  };

  const getStopPointData = async (point) => {
    const query = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?country=au&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    setStopPointData(json.features);
  };

  const handleStartClick = (event) => {
    const pointText = event.target.id;
    const [address, coordsComplete] = pointText.split(', Coords - ');
    const [longitude, latitude] = coordsComplete.split(',').map(Number);
    setPointsSelected((prev) => ({
      ...prev,
      start: { longitude, latitude },
    }));
    document.getElementById('start').value = address;
    setStartPointClick(false);
  };

  const handleEndClick = (event) => {
    const pointText = event.target.id;
    const [address, coordsComplete] = pointText.split(', Coords - ');
    const [longitude, latitude] = coordsComplete.split(',').map(Number);
    setPointsSelected((prev) => ({
      ...prev,
      end: { longitude, latitude },
    }));
    document.getElementById('end').value = address;
    setEndPointClick(false);
  };

  const handleStopClick = (event) => {
    const pointText = event.target.id;
    const [address, coordsComplete] = pointText.split(', Coords - ');
    const [longitude, latitude] = coordsComplete.split(',').map(Number);
    setPointsSelected((prev) => ({
      ...prev,
      stop: { longitude, latitude },
    }));
    document.getElementById('stop').value = address;
    setStopPointClick(false);
  };

  const handleStartPointPopperClick = (event) => {
    getStartPointData(event.target.value);
    setStartPointAnchorEl(event.currentTarget);
    setStartPointClick(true);
  };

  const handleEndPointPopperClick = (event) => {
    getEndPointData(event.target.value);
    setEndPointAnchorEl(event.currentTarget);
    setEndPointClick(true);
  };

  const handleStopPointPopperClick = (event) => {
    getStopPointData(event.target.value);
    setStopPointAnchorEl(event.currentTarget);
    setStopPointClick(true);
  };

  const handleAddStopOpen = () => setAddStop(true);
  const handleAddStopClose = () => {
    setPointsSelected((prev) => ({
      ...prev,
      stop: { longitude: 0, latitude: 0 },
    }));
    setAddStop(false);
  };

  const [addStop, setAddStop] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="p-4 bg-white">
      <div className="mb-4">
        <label className="block mb-2">Pickup Point</label>
        <div className="w-full p-2 border border-gray-300 rounded">
          <input
            id="start"
            type="text"
            className="py-1 px-2 w-full rounded-3xl bg-white shadow-2xl"
            onChange={handleStartPointPopperClick}
            placeholder="Where From?"
          />
          {startPointClick && (
            <div className="z-30 bg-white mt-2 flex-col w-80 mr-8 popper">
              {startPointData.map((item, index) => (
                <div
                  key={index}
                  id={`${item.place_name}, Coords - ${item.geometry.coordinates[0]}, ${item.geometry.coordinates[1]}`}
                  className="cursor-pointer py-3 px-3 border-b border-gray-200 flex hover:bg-slate-200 hover:shadow-xl"
                  onClick={handleStartClick}
                >
                  <p className="text-black">
                    {item.place_name.length > 40 ? `${item.place_name.slice(0, 40)}...` : item.place_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Destination Point</label>
        <div className="w-full p-2 border border-gray-300 rounded">
          <input
            id="end"
            type="text"
            className="py-1 px-2 w-full rounded-3xl bg-white shadow-2xl"
            onChange={handleEndPointPopperClick}
            placeholder="Where To?"
          />
          {endPointClick && (
            <div className="z-30 bg-white mt-2 flex-col w-80 mr-8 popper">
              {endPointData.map((item, index) => (
                <div
                  key={index}
                  id={`${item.place_name}, Coords - ${item.geometry.coordinates[0]}, ${item.geometry.coordinates[1]}`}
                  className="cursor-pointer py-3 px-3 border-b border-gray-200 flex hover:bg-slate-200 hover:shadow-xl"
                  onClick={handleEndClick}
                >
                  <p className="text-black">
                    {item.place_name.length > 40 ? `${item.place_name.slice(0, 40)}...` : item.place_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {addStop && (
        <div className="mb-4">
          <label className="block mb-2">Stop Point</label>
          <div className="w-full p-2 border border-gray-300 rounded">
            <input
              id="stop"
              type="text"
              className="py-1 px-2 w-full rounded-3xl bg-white shadow-2xl"
              onChange={handleStopPointPopperClick}
              placeholder="Add Stop"
            />
            {stopPointClick && (
              <div className="z-30 bg-white mt-2 flex-col w-80 mr-8 popper">
                {stopPointData.map((item, index) => (
                  <div
                    key={index}
                    id={`${item.place_name}, Coords - ${item.geometry.coordinates[0]}, ${item.geometry.coordinates[1]}`}
                    className="cursor-pointer py-3 px-3 border-b border-gray-200 flex hover:bg-slate-200 hover:shadow-xl"
                    onClick={handleStopClick}
                  >
                    <p className="text-black">
                      {item.place_name.length > 40 ? `${item.place_name.slice(0, 40)}...` : item.place_name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {!addStop && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAddStopOpen}
        >
          Add Stop
        </button>
      )}
      {addStop && (
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleAddStopClose}
        >
          Remove Stop
        </button>
      )}
      <div className="mb-4">
        <label className="block mb-2">Select Date & Time</label>
        <div className="flex space-x-4">
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Vehicle Type</label>
        <div className="flex space-x-4">
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`cursor-pointer p-4 border rounded-lg ${selectedVehicle === vehicle.id ? 'border-yellow-500' : ''}`}
              onClick={() => setSelectedVehicle(vehicle.id)}
            >
              <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-32 object-cover" />
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                <p className="text-sm text-gray-500">{vehicle.capacity}</p>
                <p className="text-sm font-bold">{vehicle.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setComponent(2)}
      >
        Next
      </button>
    </div>
  );
}

export default HomeScreen;
