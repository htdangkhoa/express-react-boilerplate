// @flow
import serialize from 'serialize-javascript';
import { type RenderHtmlType } from '../types';

const html = ({ htmlContent, initialState = {} }: RenderHtmlType) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="react-view">${htmlContent}</div>

  <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>

  <script type="text/javascript" src="/bundle.js"></script>
</body>
</html>
`;

export default html;
