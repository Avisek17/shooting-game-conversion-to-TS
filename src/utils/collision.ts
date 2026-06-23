import { Box } from "../interface/Box.js";
export function hit(a : Box, b : Box) : boolean{
    return(
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}