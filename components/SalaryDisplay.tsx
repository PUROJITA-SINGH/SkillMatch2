import React from 'react';
import { SalaryData } from '../types';

interface SalaryDisplayProps {
  salaryData: SalaryData;
}

const SalaryDisplay: React.FC<SalaryDisplayProps> = ({ salaryData }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: salaryData.currency || 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 h-full flex flex-col justify-center items-center">
      <h4 className="text-xl font-semibold text-on-surface mb-4">Estimated Salary</h4>
      <p className="text-5xl font-extrabold text-green-500">
        {formatCurrency(salaryData.average)}
        <span className="text-lg font-semibold text-gray-500 ml-2">/ year</span>
      </p>
      <div className="text-center text-gray-600 mt-3">
        <span>Range: </span>
        <span className="font-semibold">{formatCurrency(salaryData.rangeLow)}</span>
        <span> - </span>
        <span className="font-semibold">{formatCurrency(salaryData.rangeHigh)}</span>
      </div>
    </div>
  );
};

export default SalaryDisplay;