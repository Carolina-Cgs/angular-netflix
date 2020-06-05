import { Film } from './film';

export interface Actor {
    id?: number;
    firstname: string;
    lastname: string;
    created_by: number;
    films?: Film[];
}