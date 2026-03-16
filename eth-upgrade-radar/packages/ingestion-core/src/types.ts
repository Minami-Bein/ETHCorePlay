export type RawIngestionItem={source:string;sourceType:'github'|'forum'|'website'|'video';externalId:string;url:string;title:string;body:string;author:string|null;labels:string[];links:string[];publishedAt:string|null;updatedAt:string|null;raw:Record<string,unknown>};
export interface Adapter{ name:string; pullSince(since?:string):Promise<RawIngestionItem[]> }
