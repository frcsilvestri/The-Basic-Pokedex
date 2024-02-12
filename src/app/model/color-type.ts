
export function getColorByType(typeName: string){
    switch(typeName){
        case 'fire': return '#fd7d24';
        case 'grass': return '#9bec6b';
        case 'electric': return '#eed535';
        case 'water': return '#4592c4';
        case 'ground': return '#E2BF65';
        case 'rock': return '#B6A136';
        case 'fairy': return '#D685AD';
        case 'poison': return '#c15fbf';
        case 'bug': return '#A6B91A';
        case 'dragon': return '#6F35FC';
        case 'psychic': return '#F95587';
        case 'flying': return '#A98FF3';
        case 'fighting': return '#C22E28';
        case 'normal': return '#A8A77A';
        case 'ice': return '#96D9D6';
        case 'ghost': return '#735797';
        case 'dark': return '#705746';
        case 'steel': return '#B7B7CE';
        default: return 'whitesmoke';
        
    }
}
