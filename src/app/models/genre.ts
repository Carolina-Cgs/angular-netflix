import { Film } from './film';

export interface Genre {
    id?: number;
    name: string;
    films?: Film[];
}