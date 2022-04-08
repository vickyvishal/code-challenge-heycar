import { GatewayModel, ProjectModel, ReportDataModel } from "../../models/mockUpModels"
import { ContentPieChart } from "./ContentPieChart"
import { ContentAccordion } from "./ContentAccordion"
import { Paper, Typography } from "@mui/material"
import { getProjectTotalAmount } from "../../helpers/functions/functions"

export interface ContentBodyType {
    projectList: ProjectModel[],
    selectedProject: ProjectModel[],
    gatewayList: GatewayModel[]
    selectedGateway: GatewayModel[]
    reportData: ReportDataModel[]
}



export const ContentBody = (props: ContentBodyType) => {
    const { selectedProject, selectedGateway, reportData } = props
    return (
        <div className="content-body">
            <div className="content-body-accordion">
                <Paper classes={{ root: "content-body-background" }} elevation={2}>

                    <ContentAccordion {...props} />{/*pass only selected project*/}

                </Paper>
                {
                    (selectedProject.length !== 1 && selectedGateway.length !== 1) && <Paper classes={{ root: "content-body-footer" }} elevation={2}>
                        <Typography>Total: {Math.round(getProjectTotalAmount(reportData))}</Typography>

                    </Paper>
                }

            </div>

            {/*Only Show when allproject/onegateway or oneproject/allgateway */}
            {
                ((selectedProject.length !== 1 && selectedGateway.length === 1) ||
                    (selectedProject.length === 1 && selectedGateway.length !== 1)) && <div className="content-body-pie-chart">
                    <Paper classes={{ root: "content-body-background" }} elevation={2}>

                        <ContentPieChart {...props} />
                    </Paper>
                    {(selectedProject.length === 1 && selectedGateway.length !== 1) && <Paper classes={{ root: "content-body-footer" }} elevation={2}>
                        <Typography>Project Total: {Math.round(getProjectTotalAmount(reportData))}</Typography>
                    </Paper>}
                    {(selectedProject.length !== 1 && selectedGateway.length === 1) && <Paper classes={{ root: "content-body-footer" }} elevation={2}>
                        <Typography>Gateway Total: {Math.round(getProjectTotalAmount(reportData))}</Typography>
                    </Paper>}
                </div>
            }

        </div>
    )
}