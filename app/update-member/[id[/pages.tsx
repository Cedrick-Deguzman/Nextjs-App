'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header'; // Adjust the import path as necessary
import { FaPlus } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const UpdateMemberPage = () => {
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
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');  // Get the member ID from the query params

    // Fetch member details when the page loads
    useEffect(() => {
        if (!id) return;  // Ensure id is available before fetching

        const fetchMemberDetails = async () => {
            const { data, error } = await supabase
                .from('members')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError('Error fetching member details');
            } else if (data) {
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setCity(data.city);
                setBarangay(data.barangay);
                setContactNumber(data.number);
                setEmail(data.email);
                setWork(data.work);
                setMedicalCondition(data.medical_condition);
                setCivilStatus(data.civil_status);
                setSelectedGroup(data.group_id);
                setSelectedCategoryId(data.category_id);
                // Set non-member and member relative if needed
                // setSelectedNonMemberRelative(data.non_member_relative);
                // setSelectedMemberRelative(data.member_relative);
            }
        };

        fetchMemberDetails();
        console.log('Member ID:', id);
    }, [id]);

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
            
            if (error) {
                console.error('Error fetching categories:', error.message);
            } else {
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

        // Prepare data to be updated
        const updatedMemberData = {
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
            // non_member_relative: selectedNonMemberRelative,
            // member_relative: selectedMemberRelative,
        };

        // Update data in Supabase
        const { data, error } = await supabase
            .from('members') // Assuming 'members' is your table name
            .update(updatedMemberData)
            .eq('id', id);

        if (error) {
            setError(error.message);
        } else {
            setMessage('Member updated successfully!');
            // Optionally redirect to another page after successful update
            router.push(`/`);
        }
    };

    return (
        <>
            <Header />
            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                {/* Form fields as before */}
                {/* All your form fields go here */}
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
            </div>
        </>
    );
};

export default UpdateMemberPage;
