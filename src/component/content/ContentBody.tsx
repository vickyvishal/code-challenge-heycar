import { GatewayModel, ProjectModel, ReportDataModel } from "../../models/mockUpModels"
import { ContentPieChart } from "./ContentPieChart"
import { ContentAccordion } from "./ContentAccordion"
import { Paper } from "@mui/material"

export interface ContentBodyType {

    projectList: ProjectModel[],
    selectedProject: ProjectModel[],
    gatewayList: GatewayModel[]
    selectedGateway: GatewayModel[]
    reportData: ReportDataModel[]
}
export const ContentBody = (props: ContentBodyType) => {
    // console.log(reportData.filter(report => report.projectId === selectedProject[0].projectId));
    const { selectedProject, selectedGateway } = props
    return (
        <div className="content-body">
            <div className="content-body-accordion">
                <Paper classes={{ root: "content-body-background" }}  elevation={2}>

                    <ContentAccordion {...props} />{/*pass only selected project*/}

                </Paper>
            </div>

            {/*Only Show when allproject/onegateway or oneproject/allgateway ====> why though?*/}
            {
                ((selectedProject.length !== 1 && selectedGateway.length === 1) ||
                (selectedProject.length === 1 && selectedGateway.length !== 1)) && <div className="content-body-pie-chart">
                    <Paper classes={{ root: "content-body-background" }}  elevation={2}>

                        <ContentPieChart {...props} />
                    </Paper>
                </div>
            }

        </div>
    )
}