import { Paper, TableRow } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ContentBodyType } from './ContentBody';
import { GatewayModel, ProjectModel, ReportDataModel } from '../../models/mockUpModels';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

const filteredReport = (project: ProjectModel, selectedGateway: GatewayModel[], reportData: ReportDataModel[]) => {//also filter gateways
    if (selectedGateway.length === 1) {//only one gateway is selected
        return reportData.filter((report: ReportDataModel) => project.projectId === report.projectId).filter((report) => report.gatewayId === selectedGateway[0].gatewayId)
    } else if (selectedGateway.length !== 1)// all gateway are selected
        return reportData.filter((report: ReportDataModel) => project.projectId === report.projectId)
    else {
        return []
    }
}

// const filterByGateway 

const getTotalProjectAmount = (project: ProjectModel, selectedGateway: GatewayModel[], reportData: ReportDataModel[]) => {
    const initialValue = 0;
    return filteredReport(project, selectedGateway, reportData).reduce((acc, item) => acc + item.amount, initialValue)
}

export const ContentAccordion = (props: ContentBodyType) => {

    const { selectedProject, reportData, selectedGateway } = props
    return (
        <div>
            {
                selectedProject.map((project: ProjectModel) => {
                    return <Accordion classes={{ root: "my-accordion" }} key={project.projectId}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{project.name}</Typography>
                            <Typography>{`Total: ${Math.round(getTotalProjectAmount(project, selectedGateway, reportData))}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Gateway</TableCell>
                                            <TableCell>Payment Id</TableCell>
                                            <TableCell>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredReport(project, selectedGateway, reportData).map((report: ReportDataModel) => (
                                            <TableRow
                                                key={report.paymentId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {report.created}
                                                </TableCell>
                                                <TableCell>{report.gatewayId}</TableCell>
                                                <TableCell>{report.paymentId}</TableCell>
                                                <TableCell>{report.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                })
            }

        </div>
    )
}