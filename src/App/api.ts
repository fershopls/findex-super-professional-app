import datasetJson from '@/data/deals_dataset.json';
import datasetDocumentsJson from '@/data/docs_dataset.json';
import {Agent, Source, ClientIssuer, Industry, Analyst, Holding, DealType, Data} from "@/types";
import {DocumentsData} from "@/types-docs";

// @ts-ignore
export const dataset: Data = datasetJson['data'];

// @ts-ignore
export const datasetDocuments: DocumentsData = datasetDocumentsJson['data'];

function join(namespace: string, id: number, foreignKey: string = 'Id'): any {
    // @ts-ignore
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

export function getDocumentsByDealId(id: number) {
    return datasetDocuments.docs.filter((doc) => doc.deal_id === id);
}