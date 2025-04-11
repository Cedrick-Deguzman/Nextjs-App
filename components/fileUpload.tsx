'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '../lib/supabaseClient';

// Define the structure of the data we'll be uploading
interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  // Parse Excel file and insert data into Supabase
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please upload an Excel file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const binaryString = reader.result as string;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Assuming the data is in the first sheet
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: UserData[] = XLSX.utils.sheet_to_json(sheet);

      try {
        const usersToInsert = [];
        // Check if any of the users already exist in the database by f_name and l_name
        for (const user of data) {
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .eq('first_name', user.first_name) 
            .eq('last_name', user.last_name)  
            .limit(1); 
            console.log(user);
          if (fetchError) {
            throw fetchError;
          }

          // Check if there's any user already matching the f_name and l_name
          if (existingUser && existingUser.length > 0) {
            window.alert(`User ${user.first_name} ${user.last_name} already exists in the database!`);
          } else {
            // Add non-duplicate user to the list
            usersToInsert.push(user);
          }
        }


        // If no duplicates, proceed with the upsert
        if (usersToInsert.length > 0) {
          const { data: insertedData, error } = await supabase
            .from('users')
            .upsert(usersToInsert);
      
          if (error) throw error;
      
          setMessage('Data successfully uploaded to Supabase!');
        } else {
          setMessage('No new users to upload.');
        }

      } catch (error) {
        console.error('Error uploading data:', error);
        setMessage('Failed to upload data.');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Upload Excel File</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
      >
        Upload
      </button>
      {message && <p className="text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default FileUpload;
