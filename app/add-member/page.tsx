'use client';

import React from 'react';
import Header from '@/components/header'; // Adjust the import path as necessary
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const addMemberPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [work, setWork] = useState('');
    const [medicalCondition, setMedicalCondition] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedNonMemberRelative, setSelectedNonMemberRelative] = useState('');
    const [selectedMemberRelative, setSelectedMemberRelative] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchGroups = async () => {
          const { data, error } = await supabase.from('groups').select('group_id, group_name');
          if (error) {
            console.error('Error fetching groups:', error.message);
          } else {
            setGroups((data || []).map(group => ({ id: group.group_id, name: group.group_name })));
          }
        };
    
        fetchGroups();
      }, []);
    
    
    useEffect(() => {
        if (!selectedGroup) {
        setCategories([]);
        setSelectedCategoryId('');
        return;
        }

        const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('category_id, category_name')
            .eq('group_id', selectedGroup);
            
            console.log('Supabase response:', { data, error });
        if (error) {
            console.error('Error fetching categories:', error.message);
        } else {
            console.log('Fetched categories for group', selectedGroup, data);
            setCategories((data || []).map(category => ({ id: category.category_id, name: category.category_name })));
        }
        };

        fetchCategories();
    }, [selectedGroup]);
    
    const handleSubmit = async () => {
        // Check required fields
        if (!firstName || !lastName || !email || !contactNumber) {
          setError('First Name, Last Name, Email, and Contact Number are required.');
          return;
        }
    
        // Clear previous error
        setError('');
    
        // Prepare data to be inserted
        const memberData = {
          first_name: firstName,
          last_name: lastName,
          city: city,
          barangay: barangay,
          number: contactNumber,
          email: email,
          work: work,
          medical_condition: medicalCondition,
          civil_status: civilStatus,
          group_id: selectedGroup,
          category_id: selectedCategoryId,
        //   non_member_relative: selectedNonMemberRelative,
        //   member_relative: selectedMemberRelative,
        };
    
        // Insert data into Supabase
        const { data, error } = await supabase
          .from('members') // Assuming 'members' is your table name
          .insert([memberData]);
    
        if (error) {
          setError(error.message);
        } else {
          setMessage('Member added successfully!');
          // Reset form after submission
          setFirstName('');
          setLastName('');
          setCity('');
          setBarangay('');
          setContactNumber('');
          setEmail('');
          setWork('');
          setMedicalCondition('');
          setCivilStatus('');
          setSelectedGroup('');
          setSelectedCategoryId('');
          setSelectedNonMemberRelative('');
          setSelectedMemberRelative('');
        }
      };
      
    return (
        <>
            <Header/>
            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">First Name</p>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter member's First Name"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Last Name</p>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter member's Last Name"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">City</p>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter member's City"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Barangay</p>
                        <input
                            type="text"
                            value={barangay}
                            onChange={(e) => setBarangay(e.target.value)}
                            placeholder="Enter member's Barangay"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Contact Number</p>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="Enter member's Contact Number"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Email</p>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter member's Email"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Work</p>
                        <input
                            type="text"
                            value={work}
                            onChange={(e) => setWork(e.target.value)}
                            placeholder="Enter member's Work"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Medical Condition</p>
                        <input
                            type="text"
                            value={medicalCondition}
                            onChange={(e) => setMedicalCondition(e.target.value)}
                            placeholder="Enter member's Medical Condition"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Civil Status</p>
                        <input
                            type="text"
                            value={civilStatus}
                            onChange={(e) => setCivilStatus(e.target.value)}
                            placeholder="Enter member's Civil Status"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Group</p>
                        <select
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a group</option>
                            {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">Category</p>
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!selectedGroup}
                            >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                {category.name}
                                </option>
                            ))}
                        </select>
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
                        <button
                            onClick={handleSubmit}
                            className="w-full sm:w-auto bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Save Member
                        </button>
                        <button className="w-full sm:w-auto bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => router.push(`/`)}>
                            Go to Home Page
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
            </div>
        </>
    );
}

export default addMemberPage;