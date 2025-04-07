'use client'; // Marks the file as a client-side component

import Header from '../components/header';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import FileUpload from '../components/fileUpload';
import DownloadExcelButton from '../components/downloadExcelButton'
import CategoryPieChart from '../components/pieChart';
import { FaPlus } from 'react-icons/fa';

type UserRow = {
  city: string;
  category: string;
  group: string;
};

export default function HomePage() {
  const [cityData, setCityData] = useState<{
    [location: string]: {
      [group: string]: {
        categories: { [key: string]: number };
      };
    };
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [categoryValues, setCategoryValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase
        const { data, error } = await supabase
          .from('users')
          .select('city, category, group');
        
        if (error) {
          throw new Error(error.message);
        }

        const grouped: {
          [city: string]: {
            [group: string]: {
              categories: { [key: string]: number };
            };
          };
        } = {};

        const allCategories = new Set<string>();

        data.forEach((row: UserRow) => {
        const { city, group, category } = row;
        allCategories.add(category);

        if (!grouped[city]) {
          grouped[city] = {};
        }
        if (!grouped[city][group]) {
          grouped[city][group] = {
            categories: {},
          };
        }

        grouped[city][group].categories[category] =
          (grouped[city][group].categories[category] || 0) + 1;
      });

      setCityData(grouped);
      setCategoryValues(Array.from(allCategories).sort());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleGroupClick = (location: string, group: string) => {
    // Here, you can handle what happens when a group is clicked.
    // For example, logging, showing a modal, or redirecting to another page.
    console.log(`Group clicked: ${location} - ${group}`);
  };

  const addGroupButton = () => {
    router.push('/add-group');  // Navigate to the AddGroupPage route
  };
  
  return (
    <>
      <Header/>
      <CategoryPieChart />
      <DownloadExcelButton />
      
      <div className="p-5 flex flex-row flex-wrap gap-4">
        {Object.entries(cityData).map(([city, groups]) => (
          <div key={city} className="mb-10 mx-auto">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{city}</h2>
            <button
              onClick={addGroupButton}
              className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
            >
              <FaPlus className="mr-2" /> Add Group
            </button>
          </div>
            <div>
              {Object.entries(groups).map(([group, data]) => {
                // Create an array of category counts for the group
                const categoryCounts = categoryValues.map(
                  (category) => data.categories[category] || 0
                );
  
                const groupInfo = categoryCounts.join(' ');
  
                return (
                  <div key={group} className="mb-2 flex items-center w-full">
                    <div
                      onClick={() => handleGroupClick(city, group)}
                      className="flex justify-between p-2 border border-gray-300 cursor-pointer w-80 bg-gray-100 hover:bg-gray-200 hover:shadow-md transition"
                    >
                      <strong>{`Group ${group}`}</strong>
                      <div className="flex justify-between w-1/2 pl-2">
                        {categoryCounts.map((count, index) => (
                          <span
                            key={index}
                            className="inline-block w-1/5 text-center"
                          >
                            {count}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
