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
            lineColor: "hsl(210, 40%, 98%)",
            labelFontColor: "hsl(210, 40%, 98%)",
        },
        axisY: {
            lineColor: "hsl(210, 40%, 98%)",
            labelFontColor: "hsl(210, 40%, 98%)",
        },
        toolTip: {
            fontColor: "hsl(210, 40%, 98%)",
            backgroundColor: "#333", // optional: make it match your theme
            cornerRadius: 5,
            fontSize: 14
        },
        data: [{
            type: "spline",
            markerType: "circle",
            markerColor: "hsl(217 89% 61%)",
            lineThickness: 3,
            color: "hsl(217 89% 61%)",
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
