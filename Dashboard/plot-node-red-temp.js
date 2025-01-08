import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  // 시계열 데이터 시뮬레이션
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // 초기 데이터 생성
    const initialData = Array.from({ length: 20 }, (_, index) => {
      const now = new Date();
      now.setMinutes(now.getMinutes() - (20 - index));
      return {
        time: now.toLocaleTimeString(),
        value: Math.random() * (28 - 22) + 22 // 22-28도 사이의 온도값
      };
    });
    setData(initialData);

    // 1초마다 새로운 데이터 추가
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString(),
          value: Math.random() * (28 - 22) + 22
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>실시간 센서 데이터 모니터링</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[20, 30]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                name="온도(°C)"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;