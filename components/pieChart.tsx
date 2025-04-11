import { createClient } from '@supabase/supabase-js';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels);


const CategoryPieChart: React.FC = () => {
  const [groupCounts, setGroupCounts] = useState<{ [key: string]: number }>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase and group by Category
        const { data, error } = await supabase
          .from('members') 
          .select('group_id')
          
         

        if (error) {
          throw new Error(error.message);
        }

        const counts = data.reduce((acc: { [key: string]: number }, row: { group_id: string }) => {
            acc[row.group_id] = (acc[row.group_id] || 0) + 1;
            return acc;
          }, {});

        setGroupCounts(counts);
        setCategories(data); //raw data
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pieData = {
    labels: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Null'],
    datasets: [
      {
        data: Object.values(groupCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.getDatasetMeta(0).total;
          const percentage = (value / total) * 100;
          return percentage.toFixed(1) + '%'; // Display percentage with 1 decimal
        },
        color: '#fff',
        font: {
          weight: 700,
          size: 14,
        },
      },
    },
  };

return (
    <div>
       <div className="w-[90%] lg:w-1/2 mx-auto px-4">
       <h2 className="text-center text-xl font-semibold mb-4">Distribution</h2>
          <Pie data={pieData} options={pieOptions}/>
       </div>
    </div>
  );
};

export default CategoryPieChart;
