import { ContentBody } from "./ContentBody"
import { ContentHeader } from "./ContentHeader"
import "./content.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import { GET_GATEWAYS_URL, GET_PROJECTS_URL, Initial_POST_REPORT_BODY, POST_REPORT_URL } from "../../helpers/constants/constant";
import { GatewayModel, PostBody, ProjectModel, ReportDataModel } from "../../models/mockUpModels";


export const Content = () => {
    const [projectList, setProjectList] = useState<ProjectModel[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectModel[]>([] as ProjectModel[])//length === 1? then an item is selected [0]
    const [gatewayList, setGatewayList] = useState<GatewayModel[]>([])
    const [selectedGateway, setSelectedGateway] = useState<GatewayModel[]>([] as GatewayModel[])//length === 1? then an item is selected [0]
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [toDate, setToDate] = useState<Date | null>(new Date(2021, 11, 31))//https://stackoverflow.com/questions/2552483/why-does-the-month-argument-range-from-0-to-11-in-javascripts-date-constructor
    const [fromDate, setFromDate] = useState<Date |null>(new Date(2021, 0, 1))
    const [reportData, setReportData] = useState<ReportDataModel[]>([])

    const postFormData = () =>{
        let postBody = {} as PostBody
        postBody.from =  `${fromDate?.getFullYear()}-${fromDate?.getMonth()! + 1}-${fromDate?.getDate()!}`
        postBody.to =  `${toDate?.getFullYear()}-${toDate?.getMonth()! + 1}-${toDate?.getDate()!}`
        postBody.gatewayId = selectedGateway.length === 1 ? selectedGateway[0].gatewayId : ""
        postBody.projectId = selectedProject.length === 1 ? selectedProject[0].projectId : ""
        console.log(postBody)
        axios.post(POST_REPORT_URL, postBody).then(postReportResponse => {
            setReportData(postReportResponse.data.data)
        }).catch(err => console.error(err))
    }

    const clearFilter = () =>{
        setSelectedProject(projectList)
        setSelectedGateway(gatewayList)
        setToDate(new Date(2021, 11, 31))
        setFromDate(new Date(2021, 0, 1))
    }

    useEffect(() => {
        setIsLoading(true)
        axios.all([
            axios.get(GET_PROJECTS_URL),
            axios.get(GET_GATEWAYS_URL),
            axios.post(POST_REPORT_URL, Initial_POST_REPORT_BODY)
        ]).then(axios.spread((projectResponse, gatewayResponse, postReportResponse) => {
            setProjectList(projectResponse.data.data)
            setGatewayList(gatewayResponse.data.data)
            setSelectedProject(projectResponse.data.data)
            setSelectedGateway(gatewayResponse.data.data)
            setReportData(postReportResponse.data.data)
        })).catch(err => console.error(err))
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [projectList, gatewayList])


    return (
        <div className="content">

            <ContentHeader
                projectList={projectList}
                gatewayList={gatewayList}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                selectedGateway={selectedGateway}
                setSelectedGateway={setSelectedGateway}
                toDate={toDate}
                setToDate={setToDate}
                fromDate={fromDate}
                setFromDate={setFromDate}
                postFormData={postFormData}
                clearFilter={clearFilter}
            />
            {
                reportData.length !==0 ?
                <ContentBody
                 projectList={projectList} 
                 selectedProject={selectedProject}
                 gatewayList={gatewayList} 
                 selectedGateway={selectedGateway} 
                 reportData={reportData}/>
                 : <div className="no-report-body">No Reports</div>
            }
            
        </div>
    )
}