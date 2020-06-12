/* @flow */
import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
import { isDev } from '../config';
import { type RenderHtmlType } from '../types';

const renderHtml = ({
  head,
  extractor,
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

      <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
      <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#449dd1">
      <meta name="apple-mobile-web-app-title" content="ERB">
      <meta name="application-name" content="Express React Boilerplate">
      <meta name="msapplication-TileColor" content="#449dd1">
      <meta name="theme-color" content="#222222">

      ${
        !isDev
          ? `
            <!--
              manifest.json provides metadata used when your web app is installed on a
              user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
            -->
            <link rel="manifest" href="/site.webmanifest">
            `.trim()
          : ''
      }
      
      ${head.title.toString()}
      ${head.base.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}

      <!-- Insert bundled styles into <link> tag -->
      ${extractor.getLinkTags()}
      ${extractor.getStyleTags()}
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="react-view">${htmlContent}</div>

      <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>

      <!-- Insert bundled scripts into <script> tag -->
      ${extractor.getScriptTags()}

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
