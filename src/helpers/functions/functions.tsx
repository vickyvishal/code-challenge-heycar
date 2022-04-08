import { GatewayModel, ProjectModel, ReportDataModel } from "../../models/mockUpModels";

export const getProjectName = (projectId: string, projectList: ProjectModel[]) => {
    return projectList.find((project: ProjectModel) => project.projectId === projectId)?.name
}

export const getGatewayName = (gatewayId: string, gatewayList: GatewayModel[]) => {
    return gatewayList.find((gateway: GatewayModel) => gateway.gatewayId === gatewayId)?.name
}

export const generateChartData = (selectedGateway: GatewayModel[],
    selectedProject: ProjectModel[],
    gatewayList: GatewayModel[],
    projectList: ProjectModel[],
    reportData: ReportDataModel[]) => {

    if (selectedGateway.length === 1) {
        const groupByCategory = reportData.filter((report) => report.gatewayId === selectedGateway[0].gatewayId).reduce((project: any, report) => {//one gateway is selected
            const { projectId } = report;
            const projectName = getProjectName(projectId, projectList)!
            project[projectName] = project[projectName] ?? [];
            project[projectName].push(report)
            return project;
        }, {});
        return Object.keys(groupByCategory).map((item: any) => {
            return {
                x: item, y: Math.round(groupByCategory[item].reduce((acc: any, report: ReportDataModel) =>
                    acc + report.amount, 0))
            }
        })



    } else if (selectedGateway.length !== 1) {
        const groupByCategory = reportData.filter((report) => report.projectId === selectedProject[0].projectId).reduce((gateway: any, report) => {
            const { gatewayId } = report;
            const projectName = getGatewayName(gatewayId, gatewayList)!
            gateway[projectName] = gateway[projectName] ?? [];
            gateway[projectName].push(report)
            return gateway;
        }, {});
        return Object.keys(groupByCategory).map((item: any) => {
            return {
                x: item, y: Math.round(groupByCategory[item].reduce((acc: any, report: ReportDataModel) =>
                    acc + report.amount, 0))
            }
        })

    }
    else{
        return []
    }
}


export const filteredReportForProject = (project: ProjectModel, selectedGateway: GatewayModel[], reportData: ReportDataModel[]) => {//also filter gateways
    if (selectedGateway.length === 1) {//only one gateway is selected
        return reportData.filter((report: ReportDataModel) => project.projectId === report.projectId).filter((report) => report.gatewayId === selectedGateway[0].gatewayId)
    } else if (selectedGateway.length !== 1)// all gateway are selected
        return reportData.filter((report: ReportDataModel) => project.projectId === report.projectId)
    else {
        return []
    }
}

export const filteredReportForGateway = (gateway: GatewayModel, selectedProject: ProjectModel[], reportData: ReportDataModel[]) => {
    return reportData.filter((report) => report.gatewayId === gateway.gatewayId).filter((report) => report.projectId === selectedProject[0].projectId)
}
export const getSelectedProjectTotalAmount = (project: ProjectModel, selectedGateway: GatewayModel[], reportData: ReportDataModel[]) => {
    return filteredReportForProject(project, selectedGateway, reportData).reduce((acc, item) => acc + item.amount, 0)
}

export const getSelectedGatewayTotalAmount = (gateway: GatewayModel, selectedProject: ProjectModel[], reportData: ReportDataModel[]) => {
    return filteredReportForGateway(gateway, selectedProject, reportData).reduce((acc, item) => acc + item.amount, 0)
}

export const getProjectTotalAmount = (reportData: ReportDataModel[]) => {
    return reportData.reduce((acc, item) => acc + item.amount, 0)
}