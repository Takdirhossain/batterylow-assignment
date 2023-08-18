import React, { useState } from "react";
import Papa from "papaparse";
import Pdf from "react-to-pdf";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const ref = React.createRef();

const Formtwo = ({ contractor, description, client, name }) => {

  const [minX, setMinX] = useState(null);
  const [maxX, setMaxX] = useState(null);
  const [minY, setMinY] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [minZ, setMinZ] = useState(null);
  const [maxZ, setMaxZ] = useState(null);
  const [table, setTable] = useState(true)
  const [chartData, setChartData] = useState([]);
console.log(chartData)
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        const data = result.data.slice(1); // Skip the header row

        const chartData = data.map(row => ({
          KP: parseInt(row[0]),
          X: parseFloat(row[1]),
        }));
        setChartData(chartData);


        const columnIndexes = [1, 2, 3]; // X, Y, Z column indexes
        const numericalColumns = columnIndexes.map((index) =>
          data.map((row) => parseFloat(row[index]))
        );
        

        const [minX, maxX] = getMinMaxValues(numericalColumns[0]);
        const [minY, maxY] = getMinMaxValues(numericalColumns[1]);
        const [minZ, maxZ] = getMinMaxValues(numericalColumns[2]);

        setMinX(minX);
        setMaxX(maxX);
        setMinY(minY);
        setMaxY(maxY);
        setMinZ(minZ);
        setMaxZ(maxZ);
      },
    });
  };

  const getMinMaxValues = (column) => {
    let min = column[0];
    let max = column[0];
    for (let i = 1; i < column.length; i++) {
      if (column[i] < min) {
        min = column[i];
      }
      if (column[i] > max) {
        max = column[i];
      }
    }

    return [min, max];
  };

  const handalesubmit = () => {
    setTable(false)
  }
  return (
    <div>
      {
        table ?
        <div className="secondform">
          <div className="form-container">
            <h2>prototype XYZ Company</h2>
            <form onSubmit={handalesubmit} className="contact-form">
              <label>Project Name:</label>
              <input value={name} readOnly
                placeholder="Project Name"
                type="text"
                required
                name="name"
              />
              <label>Contractor:</label>
              <input value={contractor} readOnly
                placeholder="Contractor"
                type="text"
                required
                name="Contractor"
              />
              <label>Client:</label>
              <input value={client} readOnly placeholder="Client" type="text" required name="Client" />

              <label >Project Description:</label>
              <textarea value={description}
                required readOnly
                name="Description"
                placeholder="Project Description"
                rows="4"
              />
              <input type="file" onChange={handleCSVUpload} />

              <label >Min X Value</label>
              <input value={minX}
                required
                name="Description"
                placeholder="Project Description"
                rows="4"
              />
              <label >Max X Value</label>
              <input value={maxX}
                required
                name="Description"
                placeholder="Project Description"
                rows="4"
              />
              <label >Min Y Value</label>
              <input value={minY}
                required
                name="Description"
                placeholder="Project Description"
                rows="4"
              />
              <label >Max Y Value</label>
              <input value={maxY}
                required
                name="Description"
                placeholder="Project Description"
                rows="4"
              />
              <label >Min Z Value</label>
              <input value={maxZ}
                required
                name="Description"
                placeholder="Project Description"
                rows="4"
              />
              <label >Max Z Value</label>
              <input value={maxZ}
                required
                name="Description"
                placeholder="Project Description"
                rows="4"
              />

              <button className="button" type="submit">
                Submit
              </button>
            </form>
          </div>

          <div>
      
      <div className="chart">
        <h2>Chart</h2>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="KP" label={{ value: 'KP', position: 'insideBottom', offset: -10 }} />
          <YAxis label={{ value: 'X', angle: -90, position: 'insideLeft', offset: 10 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="X" name="X Column" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
          </div>
          :
          <>

            <div ref={ref} className="tabledata">
              <div>
                <table>
                  <tr>
                    <th>Name</th>
                    <th>client</th>
                    <th>Description</th>
                    <th>contractor</th>
                    <th>Min X</th>
                    <th>Max X</th>
                    <th>Min y</th>
                    <th>Max y</th>
                    <th>Min Z</th>
                    <th>Max Z</th>
                  </tr>
                  <tr>
                    <td>{name}</td>
                    <td>{client}</td>
                    <td>{description}</td>
                    <td>{contractor}</td>
                    <td>{minX}</td>
                    <td>{maxX}</td>
                    <td>{minY}</td>
                    <td>{maxY}</td>
                    <td>{minZ}</td>
                    <td>{minZ}</td>
                  </tr>


                </table>
              </div>

            </div>
            <div>
              <Pdf targetRef={ref} filename="Details.pdf">
                {({ toPdf }) => <button className=" tablebutton" onClick={toPdf}>Download pdf</button>}
              </Pdf>
            </div>
          </>
      }




    </div>
  );
};

export default Formtwo;
