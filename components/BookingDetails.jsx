// components/BookingDetails.jsx

import useStore from '../store/store';

const BookingDetails = ({ setComponent }) => {
  const setOccasion = useStore((state) => state.setOccasion);
  const setPassengers = useStore((state) => state.setPassengers);
  const setContact = useStore((state) => state.setContact);
  const setDriverNote = useStore((state) => state.setDriverNote);

  const occasion = useStore((state) => state.occasion);
  const passengers = useStore((state) => state.passengers);
  const contact = useStore((state) => state.contact);
  const driverNote = useStore((state) => state.driverNote);

  const handleContactChange = (field, value) => {
    setContact({ ...contact, [field]: value });
  };

  return (
    <div className=" bg-white w-[400px] rounded-lg shadow-lg p-6">
      <h1 className="text-2xl mb-4">Booking Details</h1>
      <div className="mb-4">
        <label className="block mb-2">Occasion Type</label>
        <select 
          value={occasion} 
          onChange={(e) => setOccasion(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Occasion</option>
          <option value="airport-transfer">Airport Transfer</option>
          <option value="wedding">Wedding</option>
          <option value="party">Party</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Passengers</label>
        <input 
          type="number" 
          value={passengers} 
          onChange={(e) => setPassengers(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Contact Details</label>
        <input 
          type="text" 
          placeholder="Name" 
          value={contact.name} 
          onChange={(e) => handleContactChange('name', e.target.value)} 
          className="w-full p-2 mb-2 border border-gray-300 rounded" 
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={contact.phone} 
          onChange={(e) => handleContactChange('phone', e.target.value)} 
          className="w-full p-2 mb-2 border border-gray-300 rounded" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={contact.email} 
          onChange={(e) => handleContactChange('email', e.target.value)} 
          className="w-full p-2 mb-2 border border-gray-300 rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Note for Driver</label>
        <textarea 
          value={driverNote} 
          onChange={(e) => setDriverNote(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setComponent(3)}
        >
          Next
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={() => setComponent(1)}
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default BookingDetails;
