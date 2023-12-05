import { getData } from "./../util/util.js"

const DAY = 2;

getData(DAY).then((data) => {
  const games = data.split("\n");
  
  const output = games.reduce((acc, game) => {
    // get id
    let match = game.match(/^Game (\d+):/)
    if (!match) return acc
    const id = match[1]

    // max values
    let max_red   = 0 
    let max_green = 0
    let max_blue  = 0

    game.split(";").forEach((draw) => {
      const red_match   = draw.match(/(\d+) red/);
      const green_match = draw.match(/(\d+) green/);
      const blue_match  = draw.match(/(\d+) blue/);

      if (red_match && red_match.length > 1)  {
        max_red = Math.max(max_red, red_match[1]);
      } 

      if (green_match && green_match.length > 1) { 
        max_green = Math.max(max_green, green_match[1])
      }

      if (blue_match  && blue_match.length > 1)  {
        max_blue = Math.max(max_blue, blue_match[1])
      }
    })

    // Part 1
    //return acc + ((max_red <= 12 && max_green <= 13 && max_blue <= 14) ? +id : 0)

    // Part 2
    return acc + (max_blue * max_green * max_red)
  }, 0);

  console.log(output)
});


