import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const BpChart = () => {
    const {bp} = useSelector((state) => state.slices)

    if (!bp || !bp.bps) {
        return <div className="text-center"><Loading /></div>;
    }

    const data = {
        labels: bp.bps.map(item => (moment(item.createDate).add(543, 'YEAR').format('DD/MM/YY'))),
        datasets: [
            {
                label: "ค่าบน",
                data: bp.bps.map(item => parseInt(item.sys)),
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
            {
                label: "ค่าล่าง",
                data: bp.bps.map(item => parseInt(item.dia)),
                borderColor: "rgb(54, 162, 235)",
                tension: 0.1,
            },
            {
                label: "ชีพจร",
                data: bp.bps.map(item => parseInt(item.pul)),
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        aspectRatio: "1/4",
        scales: {
            y: {
                title: {
                    display: true,
                    text: "วัน/เดือน/ปี",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "ผลวัดความดัน",
                    beginAtZero: false
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