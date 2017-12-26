let listener = null;
let interval = null;
let seed = 0;

const startRainbow = (listener, brightness, speed) => {
  listener = listener;
  speed = speed < 1 ? 1 : speed;
  speed = speed / 100;

	clearInterval(interval);
	interval = setInterval(() => {
		const values = hslToRgb(seed, 0.5, brightness / 200);
		seed = seed + (speed * speed / 100);
		if(seed > 1) {
			seed = 0;
		}
		listener(values);
	}, 50);
};

const stopRainbow = () => {
  clearInterval(interval);
  interval = null;
  listener = null;
};

const hslToRgb = (h, s, l) => {
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 1024), Math.round(g * 1024), Math.round(b * 1024)];
};

export default {
  startRainbow,
  stopRainbow
}