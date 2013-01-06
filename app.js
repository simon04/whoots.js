var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/crossdomain.xml', function(req, res){
  res.type('xml');
  res.send('<?xml version="1.0"?><cross-domain-policy><allow-access-from domain="*" /></cross-domain-policy>');
});

app.get('/tms/:z/:x/:y/:layers/*', function(req, res){
  var x = parseInt(req.params.x),
      y = parseInt(req.params.y),
      z = parseInt(req.params.z);
  y = ((1 << z) - y - 1); // for Google/OSM tile scheme
  var url = req.params[0] +
    '?bbox=' + get_tile_bbox(x, y, z) +
    '&format=' + (req.query.format || 'image/png') +
    '&service=' + 'WMS' +
    '&version=' + (req.query.version || '1.1.1') +
    '&request=' + 'GetMap' +
    '&srs=' + (req.query.srs || 'EPSG:900913') +
    '&width=' + '256' +
    '&height=' + '256' +
    '&layers=' + (req.params.layers || '') +
    '&map=' + (req.query.map || '') +
    '&styles=' + (req.query.styles || '');
  //console.log(req.params, req.query, url);
  res.redirect(url);
});

function get_tile_bbox(x,y,z) {
  var min = get_merc_coords(x * 256, y * 256, z),
      max = get_merc_coords((x + 1) * 256, (y + 1) * 256, z);
  return [min[0], min[1], max[0], max[1]].join(',');
}

function get_merc_coords(x,y,z) {
  var resolution = (2 * Math.PI * 6378137 / 256) / (1 << z);
  var merc_x = (x * resolution -2 * Math.PI  * 6378137 / 2.0);
  var merc_y = (y * resolution - 2 * Math.PI  * 6378137 / 2.0);
  return [merc_x, merc_y];
}



app.listen(3000);
