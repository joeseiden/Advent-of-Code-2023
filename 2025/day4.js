import { readFileSync } from "fs";
import { allAdjacentElementsFlattened, splitInputStringToArray } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day4_example.txt', 'utf8');
const input = readFileSync('./inputs/day4.txt', 'utf8');

const parseInput = (input) => {
    return splitInputStringToArray(input)
}

const part1 = (input) => {
    const parsedInput = parseInput(input);
    
    let reachableRollCount = 0;
    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = 0; j < parsedInput[i].length; j++) {
            const element = parsedInput[i][j];
            if( element === '@' && allAdjacentElementsFlattened(parsedInput, [i, j]).filter(el => el === '@').length < 4) {
                reachableRollCount++
            }
        }
        
    }
    return reachableRollCount;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const parsedInput = parseInput(input);
    return countReachableRolls(parsedInput);
}

const countReachableRolls = (rollMap) => {
    let reachableRollCount = 0;
    for (let i = 0; i < rollMap.length; i++) {
        for (let j = 0; j < rollMap[i].length; j++) {
            const element = rollMap[i][j];
            if( element === '@' && allAdjacentElementsFlattened(rollMap, [i, j]).filter(el => el === '@').length < 4) {
                reachableRollCount++
                rollMap[i][j] = '.'
            }
        }
    }
    if (reachableRollCount > 0) {
        return reachableRollCount + countReachableRolls(rollMap)
    }
    return reachableRollCount
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
