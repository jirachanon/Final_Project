import { Line } from "react-chartjs-2";

const BpChart = ({ bp }) => {
    const formattedDate = moment(bp.createDate).add(543, 'YEAR').format('วันที่ DD/MM/YYYY')

    const data = {
        labels: formattedDate,
        datasets: [
            {
                label: "Systolic",
                data: bp.sys,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
            {
                label: "Dia",
                data: bp.dia,
                borderColor: "rgb(54, 162, 235)",
                tension: 0.1,
            },
            {
                label: "Pul",
                data: bp.pul,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export { BpChart as BloodPressureChart };