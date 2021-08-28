export function dijkstra(grid, start, end) {
  const visitedNodesInOrder = [];
  start.distance = 0;

  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === end) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (closestNode, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  for (const unvisitedNeighbor of unvisitedNeighbors) {
    unvisitedNeighbor.distance = closestNode.distance + 1;
    unvisitedNeighbor.previousNode = closestNode;
  }
};
const getUnvisitedNeighbors = (closestNode, grid) => {
  const neighbors = [];
  const { row, col } = closestNode;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};
export function getShortestPath(nodesInVisitedOrder) {
  let lastNode = nodesInVisitedOrder[nodesInVisitedOrder.length - 1];
  let shortestPath = [];
  while (lastNode.previousNode != null) {
    shortestPath.push(lastNode);
    lastNode = lastNode.previousNode;
  }
  return shortestPath.reverse();
}
