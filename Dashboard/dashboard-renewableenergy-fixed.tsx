import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SensorDashboard = () => {
  // Process the MQTT messages into time-series data
  const processData = () => {
    const rawMessages = [
      {"createAt":"2025-01-08 13:14:07:846","payload":{"wind_max":0.01,"wind":0.01,"solar":0.28,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:13:969","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:19:843","payload":{"wind_max":0.01,"wind":0,"solar":0.26,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:26:260","payload":{"wind_max":0.01,"wind":0,"solar":0.27,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:32:208","payload":{"wind_max":0.01,"wind":0,"solar":0.28,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:37:930","payload":{"wind_max":0.01,"wind":0,"solar":0.28,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:43:784","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:49:915","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:14:56:403","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:15:04:030","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:15:08:351","payload":{"wind_max":0.01,"wind":0,"solar":0.26,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:15:14:319","payload":{"wind_max":0.01,"wind":0,"solar":0.26,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:15:19:901","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:15:25:896","payload":{"wind_max":0.01,"wind":0,"solar":0.25,"solar_max":0.35}},
      {"createAt":"2025-01-08 13:15:32:016","payload":{"wind_max":0.08,"wind":0,"solar":0.24,"solar_max":0.37}},
      {"createAt":"2025-01-08 13:15:37:840","payload":{"wind_max":0.09,"wind":0,"solar":0.23,"solar_max":0.38}}
    ];

    return rawMessages.map(msg => {
      const payload = typeof msg.payload === 'string' ? JSON.parse(msg.payload) : msg.payload;
      return {
        timestamp: msg.createAt,
        wind: payload.wind,
        windMax: payload.wind_max,
        solar: payload.solar,
        solarMax: payload.solar_max
      };
    });
  };

  const data = processData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Renewable Energy Sensor Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                angle={-45}
                textAnchor="end"
                height={70}
                tickFormatter={(time) => time.split(' ')[1]}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="solar"
                stroke="#8884d8"
                name="Solar Current"
              />
              <Line
                type="monotone"
                dataKey="solarMax"
                stroke="#82ca9d"
                name="Solar Max"
              />
              <Line
                type="monotone"
                dataKey="wind"
                stroke="#ffc658"
                name="Wind Current"
              />
              <Line
                type="monotone"
                dataKey="windMax"
                stroke="#ff7300"
                name="Wind Max"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorDashboard;
