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

const AdminView = () => {
  const [salesReport, setSalesReport] = useState(null);
  const [appUsageReport, setAppUsageReport] = useState(null);
  const [generalSalesReport, setGeneralSalesReport] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const API_URL = 'http://localhost:4000/api/admin';
  const userId = JSON.parse(localStorage.getItem('userInfo'))._id;

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
      <h1>Admin View</h1>
      <TextField
        label="Month"
        variant="outlined"
        type="number"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        sx={{ marginRight: '10px' }}
      />
      <TextField
        label="Year"
        variant="outlined"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        sx={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={runSalesReport}>
        Run Sales Report
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={runGeneralSalesReport}
        sx={{ marginLeft: '10px' }}
      >
        Run Monthly Sales Report
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={runAppUsageReport}
        sx={{ marginLeft: '10px' }}
      >
        Run Application Usage Report
      </Button>

      {salesReport && (
        <>
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Sales Report
          </Typography>
          {salesReport.length === 0 ? (
            <p>There are no sales in the specified period.</p>
          ) : (
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
                      <TableCell align="right">{row.revenue}</TableCell>
                      <TableCell align="right">{row.month}</TableCell>
                      <TableCell align="right">{row.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {generalSalesReport && (
        <>
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            General Sales Report (for the past 30 days)
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generalSalesReport.map((row) => (
                  <TableRow key={row._id.month}>
                    <TableCell component="th" scope="row">
                      {row._id.month}
                    </TableCell>
                    <TableCell align="right">{row.totalPrice}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {appUsageReport && (
        <>
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Application Usage Report
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell align="right">Average Time (hours)</TableCell>
                  <TableCell align="right">Active Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appUsageReport.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right">
                      {row.avgTime.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{row.activeUsers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default AdminView;
