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
            .limit(1);  // Ensures we get a maximum of 1 result
            // console.log(user);
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

        setMessage('Data successfully uploaded to Supabase!');
      } catch (error) {
        console.error('Error uploading data:', error);
        setMessage('Failed to upload data.');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
