/* @flow */
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import { minify } from 'html-minifier';
import { isDev } from '../config';
import { type RenderHtmlType } from '../types';

// const h = Helmet.renderStatic()

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
      
      ${head.title.toString()}
      ${head.base.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
    </head>
    <body>
      <div id="react-view">${htmlContent}</div>

      <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>

      <script type="text/javascript" src="/bundle.js"></script>

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
