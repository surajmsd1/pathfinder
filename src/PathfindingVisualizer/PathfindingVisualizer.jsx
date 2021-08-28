import React, { Component } from "react";
import "./PathfindingVisualizer.css";
import Node from "./Node/Node";
import { dijkstra, getShortestPath } from "../algorithms/dijkstra";

const START_NODE_ROW = 12;
const START_NODE_COL = 11;
const FINISH_NODE_ROW = 12;
const FINISH_NODE_COL = 37;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grid: [],
      isPressed: false,
    };
  }

  componentDidMount() {
    const Grid = [];
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = createNode(col, row);
        currentRow.push(currentNode);
      }
      Grid.push(currentRow);
    }
    this.setState({ Grid });
  }

  animateInOrderNodes = (nodesInOrder, shortestPath) => {
    for (let i = 1; i < nodesInOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "Node node-current";
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "Node node-visited";
        }, 30);
        if (i === nodesInOrder.length - 1) {
          this.animateShortestPath(shortestPath);
        }
      }, 25 * i);
    }
  };

  animateShortestPath = (shortestPath) => {
    for (let j = 0; j < shortestPath.length; j++) {
      setTimeout(() => {
        const node = shortestPath[j];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "Node node-shortestPath";
      }, 35 * j);
    }
  };

  handleVisualize = (
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL
  ) => {
    let nodesInOrder = [];
    this.updateWalls();

    setTimeout(() => {
      let { Grid } = this.state;

      nodesInOrder = dijkstra(
        Grid,
        Grid[START_NODE_ROW][START_NODE_COL],
        Grid[FINISH_NODE_ROW][FINISH_NODE_COL]
      );

      this.animateInOrderNodes(nodesInOrder, getShortestPath(nodesInOrder));
    }, 500);
  };

  // toggleWall = (node) => {
  //   const { row, col } = node;
  //   let { GNode } = this.state.Grid[row][col];

  //   node.isWall ? (node.isWall = false) : (node.isWall = true);
  //   GNode = node;
  //   this.setState({ GNode });
  // };

  handleMouseDown = (row, col) => {
    let { isPressed } = this.state;
    isPressed = true;
    this.setState({ isPressed });
    const { Grid } = this.state;
    this.toggleWall(Grid[row][col]);
  };
  handleMouseEnter = (row, col) => {
    const { isPressed, Grid } = this.state;
    if (isPressed) {
      this.toggleWall(Grid[row][col]);
    }
  };

  handleMouseUp = () => {
    let { isPressed } = this.state;
    isPressed = false;
    this.setState({ isPressed });
  };

  //use this then update state once before algo runs
  toggleWall = (node) => {
    if (
      !document
        .getElementById(`node-${node.row}-${node.col}`)
        .className.includes("isWall")
    ) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "Node isWall";
    } else {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "Node";
    }
  };
  updateWalls = () => {
    let Grid = [];
    let currentNode;
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentNode = createNodeWall(
          col,
          row,
          document
            .getElementById(`node-${row}-${col}`)
            .className.includes("isWall")
        );

        currentRow.push(currentNode);
      }
      Grid.push(currentRow);
    }
    this.setState({ Grid });
  };

  // handleMouseDown = (row, col) => {};
  // handleMouseEnter = (row, col) => {};
  // handleMouseUp = () => {};

  render() {
    const { Grid } = this.state;

    return (
      <div className="wholeComponent">
        <header className="heading"> My PathfindingVisualizer</header>
        <div className="navBar">
          <button
            className="visualize dark"
            onClick={() =>
              this.handleVisualize(
                START_NODE_ROW,
                START_NODE_COL,
                FINISH_NODE_ROW,
                FINISH_NODE_COL
              )
            }
          >
            Visualize!
          </button>
          <button
            className="clearBoard dark"
            onClick={() => this.clearBoard(Grid)}
          >
            Clear Board
          </button>
        </div>
        {this.showGrid(Grid)}
      </div>
    );
  }

  clearBoard = (Grid) => {
    window.location.reload();
  };

  showGrid(Grid) {
    return (
      <div className="Grid">
        {Grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish, row, col, isWall } = node;

                return (
                  <Node
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseUp={() => this.handleMouseUp()}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    isPressed={this.state.isPressed}
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
let createNodeWall = (col, row, isWall) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: isWall,
    previousNode: null,
  };
};
