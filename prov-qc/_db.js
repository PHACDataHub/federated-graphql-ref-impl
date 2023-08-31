// TODO: replace with database

let games = [
    { id: '1', title: 'Zelda, Tears of the Kingdom', platform: ['Switch'], reviews: ['2', '7'] },
    { id: '2', title: 'Final Fantasy 7 Remake', platform: ['PS5', 'Xbox'], reviews: ['1', '6'] },
    { id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC'], reviews: ['3'] },
    { id: '4', title: 'Mario Kart', platform: ['Switch'], reviews: ['4'] },
    { id: '5', title: 'Pokemon Scarlet', platform: ['PS5', 'Xbox', 'PC'], reviews: ['5'] },
]

let authors = [
    { id: '1', name: 'mario', verified: true, reviews: ['1', '6'] },
    { id: '2', name: 'yoshi', verified: false, reviews: ['2', '4', '5'] },
    { id: '3', name: 'peach', verified: true, reviews: ['3', '7'] },
]


export default { games, authors }