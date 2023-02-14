export function generateArray(w: number, h: number, val: number) {
  const arr: number[][] = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr![i]![j] = val;
    }
  }
  return arr;
}

// Function to calculate the rating for each team using the Bradley-Terry method
export default function calculateRatings(matches: any, iterations = 1) {
  let teams = new Set() as any;

  // Get all teams
  matches.forEach((match: any) => {
    teams.add(match.blueTeam);
    teams.add(match.redTeam);
  });

  teams = [...teams];

  let ratings = [...Array(teams.length)].map((_) => 1);
  let wins = [...Array(teams.length)].map((_) => 0);
  let gameCount = [...Array(teams.length)].map((_) => 0);

  let matchResults = generateArray(teams.length, teams.length, 0);

  // Get match results
  matches.forEach((match: any) => {
    if (match.blueScore > match.redScore) {
      matchResults[teams.indexOf(match.blueTeam)][
        teams.indexOf(match.redTeam)
      ] += 1;
    } else if (match.blueScore < match.redScore) {
      matchResults[teams.indexOf(match.redTeam)][
        teams.indexOf(match.blueTeam)
      ] += 1;
    }
    wins[teams.indexOf(match.blueTeam)] += match.blueScore;
    wins[teams.indexOf(match.redTeam)] += match.redScore;
    gameCount[teams.indexOf(match.blueTeam)] += 1;
    gameCount[teams.indexOf(match.redTeam)] += 1;
  });

  // Calculate ratings
  for (let i = 0; i < iterations; i++) {
    let newRatings = [...Array(teams.length)].map((_) => 0);
    for (let j = 0; j < teams.length; j++) {
      for (let k = 0; k < teams.length; k++) {
        if (j !== k) {
          newRatings[j] +=
            (ratings[k] * matchResults[j][k]) /
            ratings.reduce((a, b) => a + b, 0);
        }
      }
    }
    ratings = newRatings;
  }

  const data = teams.map((team: any, index: number) => {
    return {
      team,
      rating: ratings[index],
      wins: wins[index],
      gameCount: gameCount[index],
    };
  });

  return data;
}
