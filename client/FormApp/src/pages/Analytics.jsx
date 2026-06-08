import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Analytics = () => {
  const { formId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get(`/analytics/${formId}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="container">
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1 style={{ marginBottom: "20px" }}>
        Analytics Dashboard
      </h1>

      <div className="kpi">
        Total Responses : {data.totalResponses}
      </div>

      {Object.keys(data.fields).map((key) => {
        const field = data.fields[key];

        if (field.type === "select") {
          const chartData = Object.entries(
            field.data
          ).map(([name, value]) => ({
            name,
            value,
          }));

          return (
            <div className="card" key={key}>
              <h3>{key}</h3>

              <div
                style={{
                  width: "100%",
                  height: 350,
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      label
                    >
                      {chartData.map(
                        (entry, index) => (
                          <Cell key={index} />
                        )
                      )}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        }

        if (field.type === "number") {
          const chartData = [
            {
              name: key,
              average: Number(
                field.average
              ),
            },
          ];

          return (
            <div className="card" key={key}>
              <h3>{key}</h3>

              <h4>
                Average : {field.average}
              </h4>

              <div
                style={{
                  width: "100%",
                  height: 300,
                }}
              >
                <ResponsiveContainer>
                  <BarChart
                    data={chartData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="average" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Analytics;