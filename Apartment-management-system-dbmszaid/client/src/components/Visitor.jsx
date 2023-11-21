import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Visitor() {
    const [visitorName, setVisitorName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [blockNumber, setBlockNumber] = useState('');
    const navigate = useNavigate(); 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/registerVisitor', {
                visitorName,
                phoneNumber,
                roomNumber,
                blockNumber
            });
            if (response.status === 200) {
                alert('Visitor registered successfully');
                navigate('/'); 
            } else {
                 alert(`Failed to register: ${response.status}`);
            }
        } catch (error) {
            // Handle network or severe server errors
            console.error('Error submitting form', error);
            alert(`Error registering visitor: ${error.message}`);
        }
    };
    

    return (
        <div className="mx-auto w-full max-w-[550px]">
            <h2 className="text-center text-2xl font-bold text-[#07074D] mb-4">Visitor Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="visitorName" className="mb-3 block text-base font-medium text-[#07074D]">Visitor Name</label>
                    <input
                        type="text"
                        id="visitorName"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="Visitor Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                    />
                </div>
    
                <div className="mb-5">
                    <label htmlFor="phoneNumber" className="mb-3 block text-base font-medium text-[#07074D]">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                    />
                </div>
    
                <div className="mb-5">
                    <label htmlFor="roomNumber" className="mb-3 block text-base font-medium text-[#07074D]">Room Number</label>
                    <input
                        type="number"
                        id="roomNumber"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="Room Number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                    />
                </div>
    
                <div className="mb-5">
                    <label htmlFor="blockNumber" className="mb-3 block text-base font-medium text-[#07074D]">Block Number</label>
                    <input
                        type="number"
                        id="blockNumber"
                        value={blockNumber}
                        onChange={(e) => setBlockNumber(e.target.value)}
                        placeholder="Block Number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                    />
                </div>
    
                <div className="flex w-full">
                    <button type="submit" className="mx-auto hover:shadow-form py-3 px-8 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2">
                        Register Visit
                    </button>
                </div>
            </form>
        </div>
    );
    
}

export default Visitor;
