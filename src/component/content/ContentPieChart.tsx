
import { Paper } from '@mui/material';
import { ContentBodyType } from './ContentBody';
import { GatewayModel, ProjectModel, ReportDataModel } from '../../models/mockUpModels';
import { VictoryPie, VictoryLegend } from "victory";

const getProjectName = (projectId: string, projectList: ProjectModel[]) => {
    return projectList.find((project: ProjectModel) => project.projectId === projectId)?.name
}

const getGatewayName = (gatewayId: string, gatewayList: GatewayModel[]) => {
    return gatewayList.find((gateway: GatewayModel) => gateway.gatewayId === gatewayId)?.name
}

const generateChartData = (selectedGateway: GatewayModel[],
    selectedProject: ProjectModel[],
    gatewayList: GatewayModel[],
    projectList: ProjectModel[],
    reportData: ReportDataModel[]) => {
    console.log(selectedGateway, selectedProject)

    if (selectedGateway.length === 1) {
        const groupByCategory = reportData.filter((report) => report.gatewayId === selectedGateway[0].gatewayId).reduce((project: any, report) => {//one gateway is selected
            const { projectId } = report;
            const projectName = getProjectName(projectId, projectList)!
            project[projectName] = project[projectName] ?? [];
            project[projectName].push(report)
            return project;
        }, {});
        return Object.keys(groupByCategory).map((item: any) => { return { x: item, y: Math.round(groupByCategory[item].reduce((acc: any, report: ReportDataModel) => acc + report.amount, 0)) } })

    } else if (selectedGateway.length !== 1) {
        const groupByCategory = reportData.filter((report) => report.projectId === selectedProject[0].projectId).reduce((gateway: any, report) => {
            const { gatewayId } = report;
            const projectName = getGatewayName(gatewayId, gatewayList)!
            gateway[projectName] = gateway[projectName] ?? [];
            gateway[projectName].push(report)
            return gateway;
        }, {});
        console.log()
        return Object.keys(groupByCategory).map((item: any) => { return { x: item, y: Math.round(groupByCategory[item].reduce((acc: any, report: ReportDataModel) => acc + report.amount, 0)) } })

    }
    else {
        return []
    }
}


export const ContentPieChart = (props: ContentBodyType) => {
    const { projectList, selectedProject, gatewayList, selectedGateway, reportData } = props

    const chartData = generateChartData(selectedGateway, selectedProject, gatewayList, projectList, reportData)
    // console.log(chartData)
    return <div className="content-pie-chart">
        <Paper classes={{ root: "content-pie-chart-labels" }}>
            <VictoryLegend x={0} y={0}
            height={20}
                orientation="horizontal"
                gutter={20}
                // style={{ border: { stroke: "black" } }}
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