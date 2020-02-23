import React, { Component } from "react";
import "./App.css";

let newCurr = "";
let first = true;
let stack = [];

class Box extends Component {
  render() {
    let borderStyle = {
      borderTop: "1px solid black",
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      borderLeft: "1px solid black"
    };
    return <div className="box" style={borderStyle} id={this.props.id}></div>;
  }
}

class Grid extends Component {
  current = 0;
  rowsArr = [];
  visited = new Set();
  width = this.props.cols * 50;

  createGrid = () => {
    for (var j = 0; j < this.props.rows; j++) {
      for (var i = 0; i < this.props.cols; i++) {
        this.rowsArr.push(<Box id={`(${i},${j})`} />);
      }
    }
  };

  playButton = () => {
    clearInterval(this.intervalId);
    let start = "(0,0)";
    this.intervalId = setInterval(() => this.draw(start), this.props.speed);
  };

  parseLocation = stringCoordinates => {
    let values = stringCoordinates.split(",");
    let row = parseInt(values[0].replace(/[^\d]/, ""));
    let col = parseInt(values[1].replace(/[^\d]/, ""));
    return [row, col];
  };

  index = (i, j) => {
    if (i < 0 || j < 0 || i > this.props.cols - 1 || j > this.props.rows - 1) {
      return undefined;
    }
    return i + j * this.props.cols;
  };

  getNeighbors = (currentCell, visited) => {
    let temp = this.parseLocation(currentCell);
    let i = temp[0];
    let j = temp[1];
    let top = undefined,
      bottom = undefined,
      right = undefined,
      left = undefined;

    if (!visited.has(`(${i - 1},${j})`)) {
      top = this.rowsArr[this.index(i - 1, j)];
    }
    if (!visited.has(`(${i},${j + 1})`)) {
      right = this.rowsArr[this.index(i, j + 1)];
    }
    if (!visited.has(`(${i + 1},${j})`)) {
      bottom = this.rowsArr[this.index(i + 1, j)];
    }
    if (!visited.has(`(${i},${j - 1})`)) {
      left = this.rowsArr[this.index(i, j - 1)];
    }

    let neighbors = [];

    if (top) {
      neighbors.push(top);
    }

    if (right) {
      neighbors.push(right);
    }

    if (left) {
      neighbors.push(left);
    }

    if (bottom) {
      neighbors.push(bottom);
    }

    let idnNeighbors = [];
    for (let i = 0; i < neighbors.length; i++) {
      idnNeighbors.push(neighbors[i].props.id);
    }
    if (idnNeighbors.length > 0) {
      var r = Math.floor(Math.random() * idnNeighbors.length);
    } else {
      return undefined;
    }

    return idnNeighbors[r];
  };

  geti = element => {
    return Number(element[1]);
  };

  getj = element => {
    return Number(element[3]);
  };

  removewalls = (a, b, x, y) => {
    let m = this.geti(x) - this.geti(y);
    let n = this.getj(x) - this.getj(y);
    if (m === 1) {
      a.style.borderLeft = "1px solid rgba(0, 0, 0, 0)";
      b.style.borderRight = "1px solid rgba(0, 0, 0, 0)";
    } else if (m === -1) {
      a.style.borderRight = "1px solid rgba(0, 0, 0, 0)";
      b.style.borderLeft = "1px solid rgba(0, 0, 0, 0)";
    }

    if (n === 1) {
      a.style.borderTop = "1px solid rgba(0, 0, 0,0)";
      b.style.borderBottom = "1px solid rgba(0, 0, 0, 0)";
    } else if (n === -1) {
      a.style.borderBottom = "1px solid rgba(0, 0, 0, 0)";
      b.style.borderTop = "1px solid rgba(0, 0, 0, 0)";
    }
  };

  //will be called after 1 ms
  draw = curr => {
    //stops the loop
    if (!first) {
      if (stack.length === 0) {
        clearInterval(this.intervalId);
      }
    }

    //get current
    let currentCell;
    let next;
    let parent = document.querySelectorAll(".box");
    for (let k = 0; k < parent.length; k++) {
      parent[k].classList.remove("active");
    }

    if (first) {
      currentCell = document.getElementById(curr);
      this.visited.add(curr);
      first = !first;
      next = this.getNeighbors(curr, this.visited);
      currentCell.className += " visitedCell";
      currentCell.className += " active";
      if (next) {
        this.visited.add(next);
        stack.push(curr);
        //remove borders
        let nextCell = document.getElementById(next);
        this.removewalls(currentCell, nextCell, curr, next);
        newCurr = next;
      } else if (stack.length > 0) {
        //backtrack
        curr = stack.pop();
      }
    } else {
      currentCell = document.getElementById(newCurr);
      this.visited.add(newCurr);
      next = this.getNeighbors(newCurr, this.visited);
      currentCell.className += " visitedCell";
      currentCell.className += " active";

      if (next) {
        this.visited.add(next);
        //remove borders
        let nextCell = document.getElementById(next);
        stack.push(newCurr);
        this.removewalls(currentCell, nextCell, newCurr, next);
        newCurr = next;
      } else if (stack.length > 0) {
        //backtrack
        newCurr = stack.pop();
      }
    }

    //mark it visited with visited array
    //get next
    //mark next visited
    //curr = next
  };

  componentDidMount() {
    // this.playButton();
  }

  render() {
    this.createGrid();
    return (
      <div className="grid" style={{ width: this.width }}>
        <button className="startBtn" onClick={this.playButton}>
          Generate Maze
        </button>
        {this.rowsArr}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 10;
    this.cols = 10;
  }
  render() {
    return (
      <div>
        <h1 className="center"> Maze Generator </h1>
        <Grid rows={this.rows} cols={this.cols} speed={this.speed} />
      </div>
    );
  }
}

export default App;
