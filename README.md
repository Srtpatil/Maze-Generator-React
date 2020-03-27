## Maze-Ganerator
    
A simple maze generator, built with React.

## Generated Maze
![](https://github.com/Srtpatil/Maze-Generator-React/blob/master/Maze.png)

## How does it work?

The generator uses [recursive backtracking](http://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking) to generate a maze. The algorithm can be described as listed below.

1. Start at position 0,0.
2. Choose a random wall (north, south, east, or west) to open a passage to the adjacent cell, only if the adjacent cell has not yet been visited and the cell is within the bounds of the grid. This becomes the new current cell.
3. If all adjacent cells have been visited, move back to the last cell that has uncarved walls and repeat.
4. Repeat steps 1-3 until no further cells remain.

## Installation

Make sure you have npm installed in your machine.

run `npm install` to install all the dependancies.

run `npm start` to start the development server.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


