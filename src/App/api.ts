import datasetJson from '@/data/deals_dataset.json';
import {Dataset, Agent, Source, ClientIssuer, Industry, Analyst, Holding, DealType} from "../types";

export const dataset: Dataset['data'] = datasetJson['data'];

function join(namespace: string, id: number, foreignKey: string = 'Id'): any {
    return dataset[namespace].find((item: any) => item[foreignKey] === id);
}

function getAgent(id: number): Agent {
    return join('Agents', id);
}

function getSource(id: number): Source {
    return join('Sources', id);
}

function getIssuer(id: number): ClientIssuer {
    return join('ClientIssuers', id, 'IssuerId');
}

function getIndustry(id: number): Industry {
    return join('Industries', id);
}

function getAnalyst(id: number): Analyst {
    return join('Analysts', id, 'UserId');
}

function getDealType(id: number): DealType {
    return join('DealTypes', id);
}

export interface Model {
    row: Holding,
    joins: {
        Agent: Agent,
        Source: Source,
        Issuer: ClientIssuer,
        Industry: Industry | undefined,
        Analysts: Analyst[] | undefined,
        Type: DealType,
    }
}

export function getAllModels(): Model[] {
    const rows = dataset['Holdings'];

    return rows.map((row) => {
        return {
            row,
            joins: {
                'Agent': getAgent(row['AgentId']),
                'Source': getSource(row['SourceId']),
                'Issuer': getIssuer(row['IssuerId']),
                'Industry': row['IndustryId'] ? getIndustry(row['IndustryId']) : undefined,
                'Analysts': row['AnalystIds']?.map((id: number) => getAnalyst(id)),
                'Type': getDealType(row['TypeId']),
            }
        };
    });
}