import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";

const BpChart = () => {
    const formattedDate = moment(bp.createDate).add(543, 'YEAR').format('DD/MM/YYYY')
    const {bp} = useSelector((state) => state.slices)

    const data = {
        labels: bp.bps.map(item => parseInt(item.createDate)),
        datasets: [
            {
                label: "Sys",
                data: bp.bps.map(item => parseInt(item.sys)),
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
            {
                label: "Dia",
                data: bp.bps.map(item => parseInt(item.dia)),
                borderColor: "rgb(54, 162, 235)",
                tension: 0.1,
            },
            {
                label: "Pul",
                data: bp.bps.map(item => parseInt(item.pul)),
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