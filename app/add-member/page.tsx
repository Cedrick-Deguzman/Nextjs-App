import React from 'react';
import Header from '@/components/header'; // Adjust the import path as necessary
import { FaPlus } from 'react-icons/fa';

const addMemberPage = () => {
    return (
        <>
            <Header/>
            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">First Name</p>
                        <input
                            type="text"
                            placeholder="Enter member's First Name"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Last Name</p>
                        <input
                            type="text"
                            placeholder="Enter member's Last Name"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Address</p>
                        <input
                            type="text"
                            placeholder="Enter member's Address"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Contact Number</p>
                        <input
                            type="text"
                            placeholder="Enter member's Contact Number"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Email</p>
                        <input
                            type="text"
                            placeholder="Enter member's Email"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Work</p>
                        <input
                            type="text"
                            placeholder="Enter member's Work"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Medical Condition</p>
                        <input
                            type="text"
                            placeholder="Enter member's Medical Condition"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Civil Status</p>
                        <input
                            type="text"
                            placeholder="Enter member's Civil Status"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Category</p>
                        <input
                            type="text"
                            placeholder="Enter member's Category"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xl font-semibold text-gray-700">Non-member Relative</p>
                            <button className="flex items-center text-sm text-blue-600 font-medium hover:underline"><FaPlus className="mr-2" />Add Relative</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter member's Non-member Relative"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xl font-semibold text-gray-700">Member Relative</p>
                            <button className="flex items-center text-sm text-blue-600 font-medium hover:underline"><FaPlus className="mr-2" />Add Relative</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter member's Member-Relative"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2">
                        <button className="w-full sm:w-auto bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                            Save Member
                        </button>
                        <button className="w-full sm:w-auto bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                            Set As Group Leader
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default addMemberPage;