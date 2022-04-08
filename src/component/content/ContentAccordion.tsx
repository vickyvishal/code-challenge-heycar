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
import { getSelectedProjectTotalAmount, filteredReportForProject, getSelectedGatewayTotalAmount, filteredReportForGateway, sortDate } from "../../helpers/functions/functions"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ContentAccordion = (props: ContentBodyType) => {
    const { selectedProject, reportData, selectedGateway, handleSort } = props
    return (
        <div>
            {selectedProject.length === 1 && selectedGateway.length !== 1 ?
                selectedGateway.map((gateway: GatewayModel) => {
                    return <Accordion classes={{ root: "my-accordion" }} key={gateway.gatewayId}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{gateway.name}</Typography>
                            <Typography>{`Total: ${Math.round(getSelectedGatewayTotalAmount(gateway, selectedProject, reportData))}`}</Typography>

                        </AccordionSummary>

                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                <TableHead>
                                        <TableRow>
                                            <TableCell>Date < ArrowUpwardIcon onClick={() => handleSort()}/></TableCell>
                                            <TableCell>Payment Id</TableCell>
                                            <TableCell>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {filteredReportForGateway(gateway, selectedProject, reportData).map((report: ReportDataModel) => (
                                            <TableRow
                                                key={report.paymentId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {report.created}
                                                </TableCell>
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



                : selectedProject.map((project: ProjectModel) => {
                    return <Accordion classes={{ root: "my-accordion" }} key={project.projectId}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{project.name}</Typography>
                            <Typography>{`Total: ${Math.round(getSelectedProjectTotalAmount(project, selectedGateway, reportData))}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date < ArrowUpwardIcon onClick={() =>  handleSort()}/></TableCell>
                                            <TableCell>Gateway</TableCell>
                                            <TableCell>Payment Id</TableCell>
                                            <TableCell>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {filteredReportForProject(project, selectedGateway, reportData).map((report: ReportDataModel) => (
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