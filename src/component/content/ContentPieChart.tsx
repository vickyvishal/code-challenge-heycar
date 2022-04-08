
import { Paper } from '@mui/material';
import { ContentBodyType } from './ContentBody';
import { VictoryPie, VictoryLegend } from "victory";
import {generateChartData} from "../../helpers/functions/functions"


export const ContentPieChart = (props: ContentBodyType) => {
    const { projectList, selectedProject, gatewayList, selectedGateway, reportData } = props

    const chartData = generateChartData(selectedGateway, selectedProject, gatewayList, projectList, reportData)
    return <div className="content-pie-chart">
        <Paper classes={{ root: "content-pie-chart-labels" }}>
            <VictoryLegend x={0} y={0}
            height={20}
                orientation="horizontal"
                gutter={20}
                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                data={chartData.map((item) => {return {name: item.x}})}
            />
        </Paper>
        <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
            radius={100}
            height={250}
            padding={{ top: 0 }}

            data={chartData}
        />
    </div>
}