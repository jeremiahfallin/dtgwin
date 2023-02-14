function determinant(matrix: number[][]) {
  let n = matrix.length;
  if (n === 1) {
    return matrix[0][0];
  } else if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  } else {
    let det = 0;
    for (let j = 0; j < n; j++) {
      let submatrix = [];
      for (let i = 1; i < n; i++) {
        let row = [];
        for (let k = 0; k < n; k++) {
          if (k !== j) {
            row.push(matrix[i][k]);
          }
        }
        submatrix.push(row);
      }
      det += Math.pow(-1, j) * matrix[0][j] * determinant(submatrix);
    }
    return det;
  }
}

function gaussianElimination(matrix: number[][], numTeams: number) {
  // Perform Gaussian elimination
  for (let i = 0; i < numTeams; i++) {
    let maxRow = i;
    for (let j = i + 1; j < numTeams; j++) {
      if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = j;
      }
    }
    let temp = matrix[i];
    matrix[i] = matrix[maxRow];
    matrix[maxRow] = temp;
    let div = matrix[i][i];
    for (let j = i; j < numTeams + 1; j++) {
      matrix[i][j] /= div;
    }
    for (let j = 0; j < numTeams; j++) {
      if (j === i) continue;
      let factor = matrix[j][i];
      for (let k = i; k < numTeams + 1; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
    }
  }

  // Extract the solutions
  let solutions = [];
  for (let i = 0; i < numTeams; i++) {
    solutions[i] = matrix[i][numTeams];
  }

  return solutions;
}

export default function massey(games: any) {
  let teams = new Set() as any;

  // Get all teams
  games.forEach((match: any) => {
    teams.add(match.blueTeam);
    teams.add(match.redTeam);
  });

  teams = [...teams];

  const numTeams = teams.length;

  // Create the matrix of wins and losses
  let matrix = [] as any;
  for (let i = 0; i < numTeams; i++) {
    matrix[i] = Array(numTeams).fill(0);
  }

  // Populate the matrix based on the games
  games.forEach((game: any) => {
    let winner = game.blueScore > game.redScore ? game.blueTeam : game.redTeam;
    let loser = game.blueScore > game.redScore ? game.redTeam : game.blueTeam;
    winner = teams.indexOf(winner);
    loser = teams.indexOf(loser);
    matrix[winner][winner] += 1;
    matrix[loser][loser] += 1;
    matrix[winner][loser] -= 1;
    matrix[loser][winner] -= 1;
  });

  //   console.log(determinant(matrix));

  // Solve the linear system using Gaussian elimination
  return gaussianElimination(matrix, numTeams);
}
