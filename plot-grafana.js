import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const GrafanaDashboard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // 24시간 동안의 데이터 포인트 생성 (10분 간격)
    const initialData = Array.from({ length: 144 }, (_, index) => {
      const now = new Date();
      now.setMinutes(now.getMinutes() - (144 - index) * 10);
      
      // 습도 데이터 시뮬레이션 (40-80% 범위)
      const baseHumidity = 60;
      const variation = Math.sin(index / 12) * 15; // 하루 주기의 사인파
      const noise = Math.random() * 5 - 2.5; // 랜덤 노이즈
      
      return {
        timestamp: now.toLocaleTimeString(),
        humidity: Math.round(baseHumidity + variation + noise)
      };
    });
    
    setData(initialData);

    // 10초마다 새로운 데이터 추가
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastIndex = newData.length;
        const baseHumidity = 60;
        const variation = Math.sin(lastIndex / 12) * 15;
        const noise = Math.random() * 5 - 2.5;
        
        newData.push({
          timestamp: new Date().toLocaleTimeString(),
          humidity: Math.round(baseHumidity + variation + noise)
        });
        return newData;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="text-lg font-medium">습도 모니터링 대시보드</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#8884d8"
                tick={{ fill: '#8884d8' }}
                tickLine={{ stroke: '#8884d8' }}
              />
              <YAxis 
                domain={[30, 90]} 
                stroke="#8884d8"
                tick={{ fill: '#8884d8' }}
                tickLine={{ stroke: '#8884d8' }}
                label={{ 
                  value: '습도 (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#8884d8'
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #8884d8',
                  color: '#8884d8'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#00ff00"
                dot={false}
                name="습도"
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrafanaDashboard;