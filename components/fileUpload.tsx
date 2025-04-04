'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '../lib/supabaseClient';

// Define the structure of the data we'll be uploading
interface UserData {
  f_name: string;
  l_name: string;
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
        // Insert data into Supabase table 'users'
        const { data: insertedData, error } = await supabase
          .from('users')
          .upsert(data);  // We use upsert in case the records already exist

        if (error) throw error;

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
