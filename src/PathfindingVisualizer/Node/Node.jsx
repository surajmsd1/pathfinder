import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isFinish,
      isStart,
      row,
      col,
      isWall,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props;

    const isWallClassName = isWall ? "isWall" : "";
    return (
      <div
        id={`node-${row}-${col}`}
        className={`Node ${extraClassName(
          isFinish,
          isStart
        )} ${isWallClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
      ></div>
    );
  }
}
const extraClassName = (isFinish, isStart) =>
  isFinish ? "node-finish" : isStart ? "node-start" : "";
