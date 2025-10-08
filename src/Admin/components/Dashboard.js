import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";


const lineChartData = [
  { month: "Jan", sales: 200 },
  { month: "Feb", sales: 350 },
  { month: "Mar", sales: 280 },
  { month: "Apr", sales: 400 },
  { month: "May", sales: 500 },
];

const barChartData = [
  { product: "Machines", revenue: 15000 },
  { product: "Devices", revenue: 12000 },
  { product: "Systems", revenue: 18000 },
];

const pieChartData = [
  { name: "Machines", value: 40 },
  { name: "Devices", value: 30 },
  { name: "Systems", value: 30 },
];

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    let sales = lineChartData.reduce((sum, item) => sum + item.sales, 0);
    let revenue = barChartData.reduce((sum, item) => sum + item.revenue, 0);
    let products = pieChartData.reduce((sum, item) => sum + item.value, 0);

    setTotalSales(sales);
    setTotalRevenue(revenue);
    setTotalProducts(products);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        background: "#F5F5F5",
        padding: "90px",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          📊 Product Dashboard
        </Typography>

        {/* Counter Summary */}
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#1976D2", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">📈 Total Sales</Typography>
                <Typography variant="h4">{totalSales}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#43A047", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">💰 Total Revenue</Typography>
                <Typography variant="h4">${totalRevenue}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#FBC02D", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">📦 Total Products</Typography>
                <Typography variant="h4">{totalProducts}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} justifyContent="center">
          {/* Monthly Sales Line Chart */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📈 Monthly Sales Trend
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#1976D2" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue by Product Category Bar Chart */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💰 Revenue by Category
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#43A047" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Product Category Distribution Pie Chart */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📦 Product Category Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieChartData} dataKey="value" nameKey="name" fill="#FBC02D" label />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
