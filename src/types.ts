export interface Dataset {
    data: Data
}

export interface Data {
    Holdings: Holding[]
    Industries: Industry[]
    ClientIssuers: ClientIssuer[]
    Agents: Agent[]
    Sources: Source[]
    DealTypes: DealType[]
    Analysts: Analyst[]
    Assets: Asset[]
}

export interface Holding {
    Id: number
    DivisionId: number
    DealId: number
    DealName: string
    IssuerId: number
    IndustryId?: number
    StatusId: number
    CustomDealId?: string
    Access: number
    AgentId: number
    SourceId: number
    DataroomStatusId: number
    TypeId: number
    Total: any
    Created: string
    LastPosted?: string
    LastAccessed?: string
    Borrowed: boolean
    CurrentHolding: boolean
    AnalystIds?: number[]
    DocCount: number
    DivisionIsPrivate: boolean
    PrimaryCustomIdentifiers: any
    SecondaryCustomIdentifiers: any
    CustomClientIssuersIdentifiers: any
    ClientCustomField: any
    CustomIdentifiers: any
}

export interface Industry {
    Id: number
    IndustryName: string
}

export interface ClientIssuer {
    IssuerId: number
    IssuerName: string
    ClientCustomId?: string
}

export interface Agent {
    Id: number
    CompanyName: string
}

export interface Source {
    Id: number
    SourceName: string
}

export interface DealType {
    Id: number
    TypeName: string
}

export interface Analyst {
    UserId: number
    FullName: string
}

export interface Asset {
    Id: number
    AssetName: string
    IssuerId: number
    HasEsmaData: boolean
    DealIds: number[]
    Divisions: Division[]
    Identifiers: Identifier[]
}

export interface Division {
    DivisionId: number
    AssetName: any
}

export interface Identifier {
    Identifier?: string
    TypeId: number
}
