
import { Paper } from '@mui/material';
import { ContentBodyType } from './ContentBody';
import { VictoryPie, VictoryLegend } from "victory";
import {generateChartData} from "../../helpers/functions/functions"
import { COLOR_SCALE_FOR_PIE_CHART } from '../../helpers/constants/constant';


export const ContentPieChart = (props: ContentBodyType) => {
    const { projectList, selectedProject, gatewayList, selectedGateway, reportData } = props

    const chartData = generateChartData(selectedGateway, selectedProject, gatewayList, projectList, reportData)
    return <div className="content-pie-chart">
        <Paper classes={{ root: "content-pie-chart-labels" }}>
            <VictoryLegend x={0} y={0}
            height={20}
                orientation="horizontal"
                gutter={20}
                colorScale={COLOR_SCALE_FOR_PIE_CHART}
                data={chartData.map((item) => {return {name: item.x}})}
            />
        </Paper>
        <VictoryPie
            colorScale={COLOR_SCALE_FOR_PIE_CHART}
            radius={100}
            height={250}
            padding={{ top: 0 }}

            data={chartData}
        />
    </div>
}