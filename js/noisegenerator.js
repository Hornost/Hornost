const date = new Date();
var current_date = parseInt(String(date.getYear())+String(date.getMonth())+String(date.getDate()));
var config = {colors:["255, 255, 255*16","128, 128, 128*12","0, 0, 0*7"],size_x:8,size_y:8};
draw('noise_square',document.getElementById('config_field').value,true);
draw('today_noise_square','{"colors":["255, 255, 255*16","128, 128, 128*12","0, 0, 0*7"],"size_x":8,"size_y":8}',false)
function draw(id,config,random) {
  console.log("drawe");
  var colors = [];
  var rng;
  if (random){
    rng = function() {
      return Math.random();
    }
  }
  else {
    rng = seededRandom(current_date);
  }
  console.log(current_date);
  let parsed_config = JSON.parse(config);
  for (let i = 0; i < parsed_config.colors.length; i++)
  {
    var color = parsed_config.colors[i].split("*")[0];
    var multiplier = parseInt(parsed_config.colors[i].split("*")[1])
    for (let i2 = 0; i2 < multiplier; i2++)
    {
      colors.push(color);
    }
  }
  const ctx = document.getElementById(id).getContext("2d");
  for (let x = 0; x < parsed_config.size_x; x++) {
    for (let y = 0; y < parsed_config.size_y; y++) {
      let rand = Math.floor((rng() * (colors.length))+1);
      let color = colors[rand-1].replace(",", "");
      ctx.fillStyle = "rgb(" + color + ")";
      ctx.fillRect(x * 1, y * 1, 1, 1);
    }
  }
}

function seededRandom(seed) {
  let x = seed;
  return function() {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
}
