import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLabel, VictoryLegend } from "victory";
function Chart(props) {
    return (
        <VictoryChart padding={{ top: 50, bottom: 140, left: 100, right: 10 }} domainPadding={15} height={400} width={1200}>
            <VictoryLegend
                x={110}
                y={1}
                orientation="vertical"
                style={{ labels: { fontSize: 15 } }}
                data={[
                    { name: "Rating", symbol: { fill: "#007bff" } },
                    { name: "Difficulty", symbol: { fill: "orange" } },
                ]}
            />
            <VictoryGroup offset={9} style={{ data: { width: 9 } }} colorScale={["#007bff", "orange"]}>
                <VictoryBar
                    data={props.averages}
                    x="project"
                    y="avgRating"
                    animate={{
                        duration: 300,
                        onLoad: 300,
                        easing: "cubicInOut",
                    }}
                />
                <VictoryBar
                    data={props.averages}
                    x="project"
                    y="avgDiff"
                    animate={{
                        duration: 300,
                        onLoad: 300,
                        easing: "cubicInOut",
                    }}
                />
            </VictoryGroup>
            <VictoryAxis axisLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />} style={{ tickLabels: { angle: -45, textAnchor: "end" } }} />
            <VictoryAxis dependentAxis axisLabelComponent={<VictoryLabel dy={20} />} label="Ratings ⮕" style={{ axisLabel: { padding: 50 } }} tickValues={[1.0, 2.0, 3.0, 4.0, 5.0]} domain={[0.0, 5.0]} />
        </VictoryChart>
    );
}
export default Chart;
