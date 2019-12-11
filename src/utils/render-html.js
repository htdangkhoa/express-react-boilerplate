/* @flow */
import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
import { isDev } from '../config';
import { type RenderHtmlType } from '../types';

const renderHtml = ({
  head,
  htmlContent,
  initialState = {},
}: RenderHtmlType) => {
  const html = `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">

      <link rel="stylesheet" type="text/css" href="${
        isDev ? '/styles.css' : '/styles.min.css'
      }" />
      
      ${head.title.toString()}
      ${head.base.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="react-view">${htmlContent}</div>

      <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>

      <script type="text/javascript" src="${
        isDev ? '/bundle.js' : '/bundle.min.js'
      }"></script>

      ${head.script.toString()}
    </body>
    </html>
  `;

  const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };

  return isDev ? html : minify(html, minifyOptions);
};

export default renderHtml;
