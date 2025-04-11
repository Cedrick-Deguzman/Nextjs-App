'use client';

import React from 'react';
import Header from '@/components/header'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
const AddGroupPage = () => {
  const router = useRouter();
  return (
    <>
    <Header/>
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">Group Name</p>
            <input
            type="text"
            placeholder="Enter group name"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="mb-7 flex flex-row gap-4 justify-between">
            <button className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => router.push(`/add-member`)}>
            <FaPlus className="mr-2" />
            Add New Member
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            onClick={() => router.push(`/members-list`)}>
            Upload Member's List
            </button>
        </div>
        <div className="mb-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">Group Leader</p>
            <input
            type="text"
            placeholder="Enter group name"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mb-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">Member's Category 1</p>
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mb-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">Member's Category 2</p>
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mb-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">Member's Category 3</p>
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Member's Name"
            className="w-full mb-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    </div>

    </>
  );
};

export default AddGroupPage;
