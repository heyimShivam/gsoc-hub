import "./PreviousContributorInfo.css";
import CanvasJSReact from '@canvasjs/react-charts';

const PreviousContributorInfo = ({
    pastCompletedPojects
}) => {
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const chartOptions = {
        animationEnabled: true,
        zoomEnabled: true,
        backgroundColor: "transparent", // makes canvas background transparent
        axisX: {
            lineColor: "white",
            labelFontColor: "white",
        },
        axisY: {
            lineColor: "white",
            labelFontColor: "white",
        },
        toolTip: {
            fontColor: "white",
            backgroundColor: "#333", // optional: make it match your theme
            cornerRadius: 5,
            fontSize: 14
        },
        data: [{
            type: "spline",
            markerType: "circle",
            markerColor: "#A91D3A",
            lineThickness: 3,
            color: "#C73659",
            dataPoints: pastCompletedPojects
        }]
    };

    return (<div className="contri-charts">
        <p>
            Projects Completed in Previous Years.
        </p>
        <CanvasJSChart options={chartOptions} />
    </div>);
}

export default PreviousContributorInfo;
