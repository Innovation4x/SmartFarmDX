import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
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
import mqtt from 'mqtt';

const SensorDashboard = () => {
  const [client, setClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState('');

  const mqttConnect = useCallback(() => {
    setError('');
    const mqttClient = mqtt.connect('ws://broker.hivemq.com:8000/mqtt', {
      clientId: `mqtt_${Math.random().toString(16).slice(2, 8)}`,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 5000
    });

    mqttClient.on('connect', () => {
      setConnectionStatus('Connected');
      mqttClient.subscribe('EC:15:18/et/smpl/tele/sensor', { qos: 0 });
    });

    mqttClient.on('error', (err) => {
      setError(`Connection error: ${err.message}`);
      setConnectionStatus('Error');
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        const timestamp = new Date().toISOString();
        
        setSensorData(prev => {
          const newData = [...prev, {
            timestamp,
            wind: payload.wind,
            windMax: payload.wind_max,
            solar: payload.solar,
            solarMax: payload.solar_max
          }];
          
          // Keep last 50 data points for better visualization
          if (newData.length > 50) {
            return newData.slice(-50);
          }
          return newData;
        });
      } catch (err) {
        console.error('Error processing message:', err);
      }
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  const disconnect = useCallback(() => {
    if (client) {
      client.end();
      setClient(null);
      setConnectionStatus('Disconnected');
      setSensorData([]);
    }
  }, [client]);

  useEffect(() => {
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [client]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Renewable Energy Sensor Data</CardTitle>
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${
            connectionStatus === 'Connected' ? 'text-green-500' : 
            connectionStatus === 'Error' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {connectionStatus}
          </span>
          <Button
            variant={client ? "destructive" : "default"}
            onClick={client ? disconnect : mqttConnect}
          >
            {client ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sensorData}
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
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              />
              <YAxis domain={[0, 1]} />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleString()}
                formatter={(value) => value.toFixed(3)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="solar"
                stroke="#8884d8"
                name="Solar Current"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="solarMax"
                stroke="#82ca9d"
                name="Solar Max"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="wind"
                stroke="#ffc658"
                name="Wind Current"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="windMax"
                stroke="#ff7300"
                name="Wind Max"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorDashboard;
