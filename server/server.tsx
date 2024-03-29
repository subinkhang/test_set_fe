import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';



import { StaticRouter } from 'react-router-dom/server';
import { App } from '../client/app';
// import Helmet from 'react-helmet'
// import routes from './routes';
// import Layout from './components/Layout'
// import { Provider } from 'mobx-react'
// import { User } from './store'
// import { fetchUsers } from './api'
 
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
 
server.use('/', express.static(path.join(__dirname, 'static')));
 
const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
);
const assets = JSON.parse(manifest);
 
server.get('*', (req, res) => {
  const component = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
  );
  res.render('client', { assets, component });
});

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});