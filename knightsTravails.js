const node = (coord, previous = null, steps = 0) => {
    return {
        coord: coord,
        steps: steps,
        //consider changin previous rather to array of all moves before this one
        previous: previous
    }
}

const arrayIncludes = (arr, ele) => {
    return arr.some((x) => x[0] == ele[0] && x[1] == ele[1])
}

const getMoves = (start, end) => {
  
    let moves = [
        [2,1], [1,2], [-2,1], [-1,2], [2,-1], [1,-2], [-2,-1], [-1,-2]
    ]

    let queue = [node(start)]
    let steps = 0;
    //change array to set if possible
    let visited = new Array()
    
    while (queue[0]) {
        let length = queue.length
        while (length-- != 0) {
            if (!arrayIncludes(visited, queue[0].coord)){
                visited.push(queue[0].coord)
            }
            if (queue[0].coord[0] == end[0] && queue[0].coord[1] == end[1]) {
                return queue[0]
            }

            for (let i in moves) {
                if (queue[0].coord[0] + moves[i][0] <=7 && queue[0].coord[0] + moves[i][0] >= 0 && queue[0].coord[1] + moves[i][1] <=7 && queue[0].coord[1] + moves[i][1] >= 0) {
                    if (!arrayIncludes(visited, [queue[0].coord[0] + moves[i][0], queue[0].coord[1] + moves[i][1]])) {
                        queue.push(node([queue[0].coord[0] + moves[i][0], queue[0].coord[1] + moves[i][1]], queue[0], steps))
                    }
                }
            }
            queue.shift()
        }
        steps++
    }
}

const getPath = (start,end) => {
    let node = getMoves(start,end)
    let path = [node.coord]
    let steps = node.steps
    while(node.previous) {
        node = node.previous
        path.push(node.coord)
    }
    console.log(`=> You made it in ${steps + 1} moves! Here is your path: `)
    path.reverse().forEach((move) => console.log(move))
}

getPath([3,3], [4,3])