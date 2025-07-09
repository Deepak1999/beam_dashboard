import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DashboardLine from './DashboardLine';
import DashboardUtilization from './DashboardUtilization';
import DashboardVarianceAnalysis from './DashboardVarianceAnalysis';
import DashboardWaterFall from './DashboardWaterFall';
import DashboardPieChart from './DashboardPieChart';
import ApiBaseUrl from '../../../Components/Api_base_url/ApiBaseUrl';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const [companies, setCompanies] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [clients, setClients] = useState([]);

  const [selectedClientCode, setSelectedClientCode] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [years, setYears] = useState([]);
  const [revenueExpenseData, setRevenueExpenseData] = useState([]);

  const handleGetBusinessCompany = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const authToken = localStorage.getItem('token');

      const response = await fetch(`${ApiBaseUrl}/get/business-master`, {
        method: 'GET',
        headers: {
          'userId': userId,
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.statusDescription?.statusCode === 200) {
        const activeCompanies = data.businessMasterList.filter(company => company.status === 1);
        setCompanies(activeCompanies);
      } else {
        console.error(data.statusDescription?.description || 'API returned error:', data.statusDescription?.description);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleGetClientCodeByBusinessId = async () => {
    if (!selectedBusinessId) return;

    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(`${ApiBaseUrl}/get/clients`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ businessId: parseInt(selectedBusinessId) })
      });

      const data = await response.json();

      if (data.statusDescription?.statusCode === 200) {
        const filteredClients = data.costCenterMasterList.filter(
          client => client.businessId === parseInt(selectedBusinessId) && client.status === 1
        );
        setClients(filteredClients);
      } else {
        console.error(data?.statusDescription?.description || 'Client API error:', data.statusDescription?.description);
      }
    } catch (error) {
      console.error('Fetch clients failed:', error);
    }
  };

  const handleGetRevenueExpenseDetails = async () => {
    if (!selectedBusinessId || !selectedYear) return;

    const bodyPayload = {
      businessId: parseInt(selectedBusinessId),
      year: selectedYear,
    };

    if (selectedClientCode) {
      bodyPayload.costClientCode = selectedClientCode;
    }

    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(`${ApiBaseUrl}/revenue-expense-yearly-details`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPayload)
      });

      const data = await response.json();

      if (data.statusDescription?.statusCode === 200) {
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const sorted = (data.businessSummaries || []).sort((a, b) =>
          monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

        setRevenueExpenseData(sorted);
      } else {
        console.error(data.statusDescription?.description || 'Revenue API error');
      }
    } catch (error) {
      console.error('Error fetching revenue-expense data:', error);
    }
  };

  const labels = revenueExpenseData.map(item => item.month);

  const profitData = {
    labels,
    projectedProfit: revenueExpenseData.map(item => item.projectedProfit ?? 0),
    actualProfit: revenueExpenseData.map(item => item.actualProfit ?? 0),
  };

  useEffect(() => {
    if (selectedBusinessId && selectedYear) {
      handleGetRevenueExpenseDetails();
    }
  }, [selectedBusinessId, selectedYear]);

  useEffect(() => {
    if (selectedClientCode) {
      handleGetRevenueExpenseDetails();
    }
  }, [selectedClientCode]);

  useEffect(() => {
    handleGetClientCodeByBusinessId();
  }, [selectedBusinessId]);

  useEffect(() => {
    handleGetBusinessCompany();
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    setYears([currentYear, nextYear]);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Budgeted Revenue',
        data: revenueExpenseData?.projectedProfit || [],
        backgroundColor: 'rgba(14, 55, 238, 0.7)',
      },
      {
        label: 'Actual Revenue',
        data: revenueExpenseData?.projectedProfit || [],
        backgroundColor: 'rgba(18, 148, 235, 0.7)',
      },
      {
        label: 'Budgeted Expenses',
        data: revenueExpenseData?.projectedProfit || [],
        backgroundColor: 'rgba(3, 136, 127, 0.7)',
      },
      {
        label: 'Actual Expenses',
        data: revenueExpenseData?.projectedProfit || [],
        backgroundColor: 'rgba(24, 211, 18, 0.96)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Budget Vs. Actual (Revenue & Expenses)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return (value);
          },
        },
      },
    },
  };

  return (
    <div className="p-4 content_main_open" id="create_expense">
      <div className="row">
        {/* <DashboardCompanyAndClient /> */}

        <div className="row mb-4">
          <div className="col-md-4">
            <label htmlFor="companySelect" className="form-label">Business Company</label>
            <select
              className="form-select"
              id="companySelect"
              onChange={(e) => {
                setSelectedBusinessId(e.target.value);
                setClients([]);
              }}
            >
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company.businessId} value={company.businessId}>
                  {company.businessName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="clientCodeSelect" className="form-label">Client Code</label>
            <select
              className="form-select"
              id="clientCodeSelect"
              value={selectedClientCode}
              onChange={(e) => setSelectedClientCode(e.target.value)}
            >
              <option value="">Select Client Code</option>
              {clients.map(client => (
                <option key={client.costCenterId} value={client.costCenterCode}>
                  {client.costCenterName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="yearSelect" className="form-label">Year</label>
            <select
              className="form-select"
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <DashboardLine revenueExpenseData={profitData} />
        {/* <DashboardUtilization /> */}
        {/* <DashboardVarianceAnalysis /> */}
        {/* <DashboardWaterFall /> */}
        {/* <DashboardPieChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;