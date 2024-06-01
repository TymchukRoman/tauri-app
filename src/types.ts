export interface Cost {
    id: string;
    title: string;
    amount: number;
    type: string;
    timestamp: number;
    positive: boolean;
}

export interface Global {
    name?: string;
    networth?: number;
    currency?: string;
}

export interface CProps {
    readonly costs: Cost[];
    readonly global: Global;
    readonly setCosts: (costs: Cost[]) => void;
    readonly setGlobal: (global: Global) => void;
}