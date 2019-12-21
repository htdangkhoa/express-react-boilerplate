export default {
  htmlAttributes: {
    lang: 'en',
  },
  defaultTitle: 'Express React Boilerplate',
  titleTemplate: 'Express React Boilerplate | %s',
  link: [
    {
      rel: 'canonical',
      href: __DEV__
        ? 'http://localhost:8080'
        : 'https://htdangkhoa-erb.herokuapp.com/',
    },
  ],
  meta: [
    {
      name: 'theme-color',
      content: '#222725',
    },
    {
      name: 'description',
      content:
        '🔥 This is a tool that helps programmers create Express & React projects easily.',
    },
    {
      name: 'keywords',
      content:
        'kblog, erb, erb-gen, express, expressjs, rest, restful, router, app, api, react, react-router, redux, template, webpack, universal, boilerplate',
    },
    {
      name: 'author',
      content: 'htdangkhoa',
    },
  ],
};
