// // components/MainComponent.jsx
"use client"
import { useState } from 'react';
import HomeScreen from './HomeScreen';
import BookingDetails from './BookingDetails';
import Map from './Map';
import useStore from '@/store/store';

const MainComponent = () => {
    const [component, setComponent] = useState(1);
    const state = useStore((state) => state);
console.log('state', state)
  const pointsSelected = {
    start: { longitude: 115.8613, latitude: -31.9523 },
    stop: { longitude: 0, latitude: 0 },
    end: { longitude: 115.8575, latitude: -31.9505 },
  };

  return (
    <div className="relative h-screen mt-10">
      <Map {...pointsSelected} />
      <div className="absolute top-20 left-0 w-[400px] h-[500px]  overflow-auto ">
        <div className="  ">
          {component === 1 && <HomeScreen setComponent={setComponent} />}
          {component === 2 && <BookingDetails setComponent={setComponent} />}
          {/* Add more components as needed */}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
