import { Film } from "../models/film";
import { ACTORS } from "./mockActors";
import { GENRES } from "./mockGenres";


export const FILMS: Film[] = [
    {
        id: 11,
        title: "Pulp Fiction",
        description: "Un killer si innamora della moglie del suo capo, un pugile rinnega la sua promessa e una coppia tenta una rapina che va rapidamente fuori controllo.",
        director: "Quentin Tarantino",
        duration: "2h 58m",
        releaseYear: 1994,
        stars: 5,
        cast: [ACTORS[0]],
        genres: [GENRES[5]],
        tags: "crime, VM18",
    },
    {
        id: 22,
        title: "Metropolis",
        description: "Nell'anno 2026, un gruppo di industriali governa il pianeta, relegando i lavoratori in un mondo sotterraneo, in cui subiscono ogni sorta di maltrattamento. Tuttavia, un androide dalle sembianze femminili li ispira alla rivolta.",
        director: "Fritz Lang",
        duration: "2h 33m",
        releaseYear: 1927,
        stars: 4.5,
        cast: [ACTORS[1]],
        genres: [GENRES[4]],
        tags: "distopico, muto",
    },
    {
        id: 33,
        title: "Million dollar baby",
        description: "Frankie, coriaceo allenatore di boxe, prende la giovane e talentuosa Maggie sotto la sua ala e la trasforma in una atleta da competizione.",
        director: "Clint Eastwood",
        duration: "2h 17m",
        releaseYear: 2004,
        stars: 5,
        cast: [ACTORS[2]],
        genres: [GENRES[2]],
        tags: "boxe, Oscar",

    },

    {
        id: 44,
        title: "Shining",
        description: "Un aspirante scrittore alcolista accetta l'incarico di guardiano invernale di un albergo in un luogo isolato. Ma suo figlio Danny inizia a sperimentare delle visioni riguardo i terribili eventi accaduti nella struttura.",
        director: "Stanley Kubrick",
        duration: "2h 26m",
        releaseYear: 1980,
        stars: 4.5,
        cast: [ACTORS[3]],
        genres: [GENRES[6]],
        tags: "triciclo, gemelle",
    }
];
