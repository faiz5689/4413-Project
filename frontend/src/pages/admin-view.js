import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from 'recharts';

const AdminView = () => {
  const [salesReport, setSalesReport] = useState(null);
  const [appUsageReport, setAppUsageReport] = useState(null);
  const [generalSalesReport, setGeneralSalesReport] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const API_URL = 'http://localhost:4000/api/admin';
  const userId = JSON.parse(localStorage.getItem('userInfo'))._id;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const runSalesReport = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/run-sales-report-specific/${userId}`,
        {
          month,
          year,
        },
        {
          withCredentials: true,
        }
      );
      setSalesReport(response.data);
    } catch (error) {
      console.error('Error running sales report:', error);
    }
  };

  const runGeneralSalesReport = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/run-general-sales-report/${userId}`,
        {
          withCredentials: true,
        }
      );
      setGeneralSalesReport(response.data);
    } catch (error) {
      console.error('Error running general sales report:', error);
    }
  };

  const runAppUsageReport = async () => {
    try {
      const response = await axios.get(`${API_URL}/run-app-report/${userId}`, {
        withCredentials: true,
      });
      setAppUsageReport(response.data);
    } catch (error) {
      console.error('Error running application usage report:', error);
    }
  };

  return (
    <div>
      <style>
        {`
          h1 {
            margin: 20px;
          }
        `}
      </style>
      <h1>Admin View</h1>
      <TextField
        label="Month"
        variant="outlined"
        type="number"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        sx={{ marginLeft: '10px', marginRight: '10px' }}
      />
      <TextField
        label="Year"
        variant="outlined"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        sx={{ marginRight: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={runSalesReport}
        sx={{
          backgroundColor: '#7865f5',
          '&:hover': {
            backgroundColor: '#4E2A84',
          },
        }}
      >
        Run Sales Report
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={runGeneralSalesReport}
        sx={{
          marginLeft: '10px',
          backgroundColor: '#7865f5',
          '&:hover': {
            backgroundColor: '#4E2A84',
          },
        }}
      >
        Run Monthly Sales Report
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={runAppUsageReport}
        sx={{
          marginLeft: '10px',
          backgroundColor: '#7865f5',
          '&:hover': {
            backgroundColor: '#4E2A84',
          },
        }}
      >
        Run App Usage Report
      </Button>

      {salesReport && (
        <div style={{ marginBottom: '100px' }}>
          <Typography
            variant="h6"
            sx={{ marginTop: '20px', marginLeft: '20px' }}
          >
            Sales Report
          </Typography>
          {salesReport.length === 0 ? (
            <p style={{ marginLeft: '20px' }}>
              There are no sales in the specified period.
            </p>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Revenue ($)</TableCell>
                      <TableCell align="right">Month</TableCell>
                      <TableCell align="right">Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesReport.map((row) => (
                      <TableRow key={row.item}>
                        <TableCell component="th" scope="row">
                          {row.item}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          {row.revenue.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">{row.month}</TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={500} height={400}>
                  <Pie
                    dataKey="revenue"
                    data={salesReport}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={(entry) => entry.item}
                  >
                    {salesReport.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <BarChart
                  width={500}
                  height={400}
                  data={salesReport}
                  margin={{
                    top: 100,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" label={null} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#8884d8"
                    label={({ name }) => name}
                  />
                </BarChart>
              </div>
            </>
          )}
        </div>
      )}

      {generalSalesReport && (
        <div style={{ marginBottom: '100px' }}>
          <Typography
            variant="h6"
            sx={{ marginTop: '20px', marginLeft: '20px' }}
          >
            General Sales Report (for the past 30 days)
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Revenue ($)</TableCell>
                  <TableCell align="right">Items Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generalSalesReport.map((row) => (
                  <TableRow key={row._id.month}>
                    <TableCell component="th" scope="row">
                      {row._id.month}
                    </TableCell>
                    <TableCell align="right">
                      {row.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {appUsageReport && (
        <div style={{ marginBottom: '100px' }}>
          <Typography
            variant="h6"
            sx={{ marginTop: '20px', marginLeft: '20px' }}
          >
            Application Usage Report
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Admin ID</TableCell>
                  <TableCell align="right">Average Time (hours)</TableCell>
                  <TableCell align="right">Active Users</TableCell>
                  <TableCell align="right">Total Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appUsageReport && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {userId}
                    </TableCell>
                    <TableCell align="right">
                      {appUsageReport.averageTime
                        ? appUsageReport.averageTime.toFixed(2)
                        : '-'}
                    </TableCell>
                    <TableCell align="right">
                      {appUsageReport.activeUsers
                        ? appUsageReport.activeUsers
                        : '-'}
                    </TableCell>
                    <TableCell align="right">
                      {appUsageReport.totalUsers
                        ? appUsageReport.totalUsers
                        : '-'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BarChart
                width={600}
                height={300}
                data={[appUsageReport]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activeUsers" fill="#82ca9d" />
                <Bar dataKey="totalUsers" fill="#ffc658" />
              </BarChart>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default AdminView;
