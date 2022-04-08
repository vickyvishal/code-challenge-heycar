export interface ProjectModel  {
    projectId: string;
    userIds: string[];
    rule: string;
    gatewayIds: string[];
    structure: string;
    industry: string;
    website: string;
    description: string;
    image: string;
    name: string;
}

export interface GatewayModel{
    gatewayId: string;
    userIds: string[];
    name: string;
    type: string;
    apiKey: string;
    secondaryApiKey: string;
    description: string;
}

export interface ReportDataModel {
    date: string | number | Date;
    paymentId: string;
    amount: number;
    projectId: string;
    gatewayId: string;
    userIds: string[];
    modified: string;
    created: string;
}

export interface UserInfoModel{
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface PostBody{
    from: string;
    to: string;
    projectId: string;
    gatewayId: string;
}