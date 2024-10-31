import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const BpChart = () => {
    const {bp} = useSelector((state) => state.slices)

    if (!bp || !bp.content) {
        return <div className="text-center"><Loading /></div>;
    }

    const dates = bp.content.map(item => item.createDate);

    console.log(dates.sort((a,b) => a-b));

    const data = {
        labels: bp.content.map(item => (moment(item.createDate).add(543, 'YEAR').format('DD/MM/YY'))),
        datasets: [
            {
                label: "ค่าบน",
                data: bp.content.map(item => parseInt(item.systolicPressure)),
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
            {
                label: "ค่าล่าง",
                data: bp.content.map(item => parseInt(item.diastolicPressure)),
                borderColor: "rgb(54, 162, 235)",
                tension: 0.1,
            },
            {
                label: "ชีพจร",
                data: bp.content.map(item => parseInt(item.pulseRate)),
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        aspectRatio: "1/4",
        scales: {
            x: {
                title: {
                    display: true,
                    text: "วัน/เดือน/ปี",
                },
            },
            y: {
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