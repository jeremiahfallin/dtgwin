import Colley from "colley-rankings";

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
export default function calculateRatings(matches: any) {
  let C = Colley(14);
  let teams = new Set() as any;

  // Get all teams
  matches.forEach((match: any) => {
    teams.add(match.blueTeam);
    teams.add(match.redTeam);
  });

  teams = [...teams];

  let ids = teams.map((team: any, i: number) => i);

  matches.forEach((match: any) => {
    if (match.blueScore > match.redScore) {
      C.addGame(
        ids[teams.indexOf(match.blueTeam)],
        ids[teams.indexOf(match.redTeam)]
      );
    } else if (match.blueScore < match.redScore) {
      C.addGame(
        ids[teams.indexOf(match.redTeam)],
        ids[teams.indexOf(match.blueTeam)]
      );
    }
  });

  return C.solve().array.map((rating: any, i: number) => {
    return { team: teams[i], rating: rating };
  });
}
