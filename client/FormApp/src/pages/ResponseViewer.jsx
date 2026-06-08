import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ResponseViewer = () => {
  const { formId } = useParams();

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await API.get(`/responses/${formId}`);

      setResponses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading Responses...</h2>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Responses</h2>
        <p>No responses found.</p>
      </div>
    );
  }

  const columns = Object.keys(
    responses[0].answers
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Responses</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}

            <th>Submitted At</th>
          </tr>
        </thead>

        <tbody>
          {responses.map((response) => (
            <tr key={response._id}>
              {columns.map((col) => (
                <td key={col}>
                  {response.answers[col]}
                </td>
              ))}

              <td>
                {new Date(
                  response.createdAt
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseViewer;