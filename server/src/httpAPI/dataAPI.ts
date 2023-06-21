import { type ReqData, type ResData } from '../FrontBackSharedTypes';
import { getByUsernameDB } from '../database';
import { sessionManager } from '../sessionManager';

export async function getData(req: ReqData): Promise<ResData> {
    const username = await sessionManager.get(req.sid);
    const userdata = await getByUsernameDB(username);

    if (userdata.email !== '') {
        if (userdata.ispro) {

            return {
                isAccepted: true,
                username: userdata.username,
                email: userdata.email,
                ispro: userdata.ispro,
                proContent: `[
                {
                "name": "Kota Factory",
                "desc": "Dedicated to Shrimati SL Loney ji, Shri Irodov ji and Maanniya HC Verma ji, 'Kota Factory' is TVF's latest original. India's first 'Black and White' show highlights the problems present day IIT-JEE aspirants face in their day-to-day lives.",
                "imdb": 9.6,
                "date": "2020",
                "sposter": "./Movie/img/kota factory.jpg",
                "bposter": "./Movie/img/kota factory1.webp",
                "genre": "Action",
                "type": "series",
                "trailer": "KotaFactory.mp4"
            },
            {
                "name": "Thor Love Of Thunder",
                "desc": "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
                "imdb": 8.8,
                "date": "2022",
                "sposter": "./Movie/img/thor love of thunder.jpg",
                "bposter": "./Movie/img/thor love of thunder1.avif",
                "genre": "Action",
                "type": "movie",
                "trailer": "Thor.mp4"
            },
            {
                "name": "Uncharted",
                "desc": "Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor 'Sully' Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada.",
                "imdb": 9.8,
                "date": "2022",
                "sposter": "./Movie/img/uncharted.webp",
                "bposter": "./Movie/img/uncharted1.jpg",
                "genre": "Action",
                "type": "movie",
                "trailer": "Uncharted.mp4"
            },
            {
                "name": "Eesho",
                "desc": "While working the night at an ATM, a security guard, who is the prime witness in the case against a powerful industrialist, happens to come across a mysterious man named Eesho. They engage in a conversation and the guard pours his heart out to the stranger before realising that Eesho may not be a friend. Who is Eesho and what does he want?",
                "imdb": 8.2,
                "date": "2022",
                "sposter": "./Movie/img/eesho.jpeg",
                "bposter": "./Movie/img/eesho1.jpg",
                "genre": "Action",
                "type": "movie",
                "trailer": "Eesho.mp4"
            },
            {
                "name": "Top Gun",
                "desc": "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
                "imdb": 8.0,
                "date": "2022",
                "sposter": "./Movie/img/topgun.jpg",
                "bposter": "./Movie/img/topgun1.jpg",
                "genre": "Action",
                "type": "movie",
                "trailer": "TopGun.mp4"
            },
            {
                "name": "Jurassic World",
                "desc": "Four years after the destruction of Isla Nublar, Biosyn operatives attempt to track down Maisie Lockwood, while Dr Ellie Sattler investigates a genetically engineered swarm of giant insects.",
                "imdb": 8.0,
                "date": "2022",
                "sposter": "./Movie/img/jurassic world.jpg",
                "bposter": "./Movie/img/jurassic world1.jpg",
                "genre": "Action",
                "type": "movie",
                "trailer": "JurassicWorld.mp4"
            },
            {
                "name": "Eternals",
                "desc": "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
                "imdb": 9.0,
                "date": "2022",
                "sposter": "./Movie/img/eternals.jpg",
                "bposter": "./Movie/img/eternals1.webp",
                "genre": "Action",
                "type": "movie",
                "trailer": "Eternals.mp4"
            },
            {
                "name": "Spider Man",
                "desc": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
                "imdb": 9.9,
                "date": "2020",
                "sposter": "./Movie/img/spiderman.jpg",
                "bposter": "./Movie/img/spiderman1.jpg",
                "genre": "Action",
                "type": "movie",
                "trailer": "Spider-Man.mp4"
            }
        ]`
            };
        }
        else {
            return {
                isAccepted: true,
                username: userdata.username,
                email: userdata.email,
                ispro: userdata.ispro,
                proContent: ``
            };
        }
    }
    else {
        return {
            isAccepted: false,
            username: '',
            email: '',
            ispro: false,
            proContent: ``
        };
    }
}