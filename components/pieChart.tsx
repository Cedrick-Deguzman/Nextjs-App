import { createClient } from '@supabase/supabase-js';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels);

type CategoryCount = {
  category: string; 
  count: number;
};

const CategoryPieChart: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase and group by Category
        const { data, error } = await supabase
          .from('users') 
          .select('category')
         

        if (error) {
          throw new Error(error.message);
        }

        const counts = data.reduce((acc: { [key: string]: number }, row: { category: string }) => {
            acc[row.category] = (acc[row.category] || 0) + 1;
            return acc;
          }, {});

        setCategoryCounts(counts);
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
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Null'],
    datasets: [
      {
        data: Object.values(categoryCounts),
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
       <div style={{ width: '90%', margin: '0 auto' }}>
       <h2 style={{ textAlign: 'center' }}>Distribution</h2>
        <Pie data={pieData} options={pieOptions}/>
        </div>
    </div>
  );
};

export default CategoryPieChart;
