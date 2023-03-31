import {Column, Row} from "@/App/Table/types";
import {dataset, getAllModels, Model} from "@/App/api";

export const columns: Column[] = [
    {key: 'deal', label: 'Deal'},
    {
        key: 'issuer', label: 'Issuer',
        filterItems: dataset.ClientIssuers.map(x => ({key: x.IssuerId, value: x.IssuerName}))
    },
    {
        key: 'industry', label: 'Industry',
        filterItems: dataset.Industries.map(x => ({key: x.Id, value: x.IndustryName}))
    },
    {key: 'access', label: 'Access'},
    {
        key: 'agent', label: 'Agent',
        filterItems: dataset.Agents.map(x => ({key: x.Id, value: x.CompanyName}))
    },
    {
        key: 'source', label: 'Source',
        filterItems: dataset.Sources.map(x => ({key: x.Id, value: x.SourceName}))
    },
    {key: 'status', label: 'Dataroom Status'},
    {
        key: 'type', label: 'Type',
        filterItems: dataset.DealTypes.map(x => ({key: x.Id, value: x.TypeName}))
    },
];

export const rows: Row[] = getAllModels().map((model: Model) => {
    return [
        {column: 'deal', value: model.row.DealName, columnId: model.row.DealId},
        {column: 'issuer', value: model.joins.Issuer.IssuerName, columnId: model.joins.Issuer.IssuerId},
        {column: 'industry', value: model.joins.Industry?.IndustryName || 'N/A', columnId: model.joins.Industry?.Id},
        {column: 'access', value: 'Public'},
        {column: 'agent', value: model.joins.Agent.CompanyName, columnId: model.joins.Agent.Id},
        {
            column: 'source', value: model.joins.Source.SourceName,
            columnId: model.joins.Source.Id,
        },
        {column: 'status', value: 'In Dataroom'},
        {
            column: 'type', value: model.joins.Type.TypeName,
            columnId: model.joins.Type.Id,
        },
    ];
});