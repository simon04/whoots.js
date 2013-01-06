WhooTS.js
=========

WhooTS.js is a WMS to TMS proxy, i.e., it rewrites TMS requests into WMS requests, and so enables the usage of WMS servers in applications that only support TMS.

Based on [WhooTS](https://github.com/timwaters/whoots) written in Ruby.

Install & run
-------

```
npm install
node app
```

Usage
-----
* `http://localhost:3000/tms/{z}/{x}/{y}/{layer}/{wms}`
* optional parameters: `?srs={srs}` (e.g. `srs=EPGS:3857`) and `?map={map}`

Notes/limitations
-----------------
* Redirects only and does not reproject. Thus, make sure that the WMS server supports `EPSG:900913` (or aliases, then use `?srs={srs}`)
* No caching