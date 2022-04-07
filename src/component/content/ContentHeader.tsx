import { Box, Button, Typography } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GatewayModel, ProjectModel } from "../../models/mockUpModels";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


interface ContenHeaderProps {
    projectList: ProjectModel[],
    gatewayList: GatewayModel[],
    selectedProject: ProjectModel[],
    setSelectedProject: (projects: ProjectModel[]) => void,
    selectedGateway: GatewayModel[],
    setSelectedGateway: (gateways: GatewayModel[]) => void,
    toDate: Date | null,
    setToDate: (date: Date | null) => void,
    fromDate: Date | null,
    setFromDate: (date: Date | null) => void
    postFormData: () => void
    clearFilter:() =>void
}

export const ContentHeader = ({ projectList,
    gatewayList,
    selectedProject,
    setSelectedProject,
    selectedGateway,
    setSelectedGateway,
    toDate,
    setToDate,
    fromDate,
    setFromDate,
    postFormData,
    clearFilter
}: ContenHeaderProps) => {

    const getSelectedProject = (projectId: string | number): ProjectModel[] => {
        return projectList.filter((project: ProjectModel) => {
            return project.projectId === projectId
        })
    }

    const getSelectedGateway = (gatewayId: string | number): GatewayModel[] => {
        return gatewayList.filter((gateway: GatewayModel) => {
            return gateway.gatewayId === gatewayId
        })
    }
    return (
        <div className="content-header">
            <Box>
                <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom component="div">
                    Reports
                </Typography>
                <Typography variant="caption" gutterBottom>
                    Easily generate a report of you transactions
                </Typography>
            </Box>

            <div className="content-header-form">
                <Box>
                    <FilterAltOffIcon onClick={() => clearFilter()} sx={{marginTop: "12px", cursor: "pointer"}}/>
                    <FormControl sx={{ m: 1, width: 150 }}>
                        <InputLabel id="select-for-project">All Projects</InputLabel>
                        <Select
                            labelId="select-for-project"
                            id="demo-simple-select-filled"
                            label="All Projects"
                            value={Object.keys(selectedProject).length === 1 ? selectedProject[0].projectId : ""}
                            onChange={(e) => setSelectedProject(getSelectedProject(e.target.value))}
                        >
                            {
                                projectList.map((project: ProjectModel) => {
                                    return <MenuItem key={project.projectId} value={project.projectId}>{project.name}</MenuItem>

                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 150 }}>
                        <InputLabel id="select-for-gateway">All Gateways</InputLabel>
                        <Select
                            labelId="select-for-gateway"
                            id="demo-simple-select-filled"
                            label = "All Gateways"
                            value={Object.keys(selectedGateway).length === 1 ? selectedGateway[0].gatewayId : ""}
                            onChange={(e) => setSelectedGateway(getSelectedGateway(e.target.value))}
                        >
                            {
                                gatewayList.map((gateway: GatewayModel) => {
                                    return <MenuItem key={gateway.gatewayId} value={gateway.gatewayId}>{gateway.name}</MenuItem>

                                })
                            }
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => {
                                setFromDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button onClick={() => postFormData()} classes={{root: "generate-button"}} variant="contained">
                        Generate
                    </Button>
                </Box>
            </div>

        </div>
    )
}