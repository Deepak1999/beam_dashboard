import React, { useEffect, useState } from 'react';
import ApiBaseUrl from '../../../Components/Api_base_url/ApiBaseUrl';

const DashboardCompanyAndClient = () => {

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

    return (
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
    );
};

export default DashboardCompanyAndClient;