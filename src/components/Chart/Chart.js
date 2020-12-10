import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { fetchChartData } from '../../api/api'
import numeral from 'numeral'

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const buildChartData = (data, casesType = 'cases') => {
    let chartData = []; 
    let lastDataPoint;
    for(let date in data.cases) {
        if(lastDataPoint) {
        let newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
     }
     lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

export default function Chart({ casesType }) {

  const [chartData, setChartData] = useState({});

    useEffect(() => {
        const getData = async () => {
          await fetchChartData(90)
          .then((response) => { 
            let data = buildChartData(response.data, casesType);
            setChartData(data);
            })
        };
        getData();
    }, [casesType]);

    return (
        <div>
            {chartData?.length > 0 && (
            <Line
                data={{
                    datasets: [
                        {
                          backgroundColor: "rgba(204, 16, 52, 0.5)",
                          borderColor: "#CC1034",
                          data: chartData,
                        },
                      ],
            }}
            options={options}
           />
           )}
        </div>
    )
}
