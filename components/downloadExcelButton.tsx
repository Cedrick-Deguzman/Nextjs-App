import React from 'react';

const DownloadExcelButton: React.FC = () => {
  const handleDownloadExcel = (): void => {
    const link = document.createElement('a');
    link.href = '/files/Community Tracker Excel.xlsx';
    console.log(link.href);
    link.download = 'Community Tracker.xlsx';
    link.click();
  };

  return (
    <button
      onClick={handleDownloadExcel}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded 
            sm:py-3 sm:px-6 sm:text-lg md:py-4 md:px-8 md:text-xl 
            w-auto mx-auto"
    >
      Download Excel Template
    </button>
  );
};

export default DownloadExcelButton;
