/* @flow */
const site = (link: string, display?: string = 'Site') =>
  `<a href="${link}" target="_blank">${display}</a>`;

const download = (link: string, display?: string = 'Download') =>
  site(link, display);

export default `
# Introduce
# **Huỳnh Trần Đăng Khoa**
*[Steenify](https://steenify.com)* / *[Github](http://github.com/htdangkhoa)* / *[Linkedin](https://www.linkedin.com/in/khoa-đăng-7575a6136)*
> Every problem has more than one way to solve it. 

## Certification
**May 27, 2016**
Linux Operating System Certificate.

**Apr 04, 2016**
GDG Vietnam Certificate of completion Android course.

## Work history
**Steenify | Oct, 2018 - Present**
\`Android Developer\` / \`Backend Node.js Developer\`
- Research new technology about Android.
- Built an components, libraries for reduce the development time.
- Guild co-worker how to develop android application.
- Develop, build & release application.
- Deploy server.

-----

**BCA Studio | June, 2017 - Oct, 2018**
\`Android Developer\` / \`Web Developer\`
- Research new technology about Android.
- Built an components, libraries for reduce the development time.
- Guild co-worker how to develop android application.
- Manage team, source and review code's co-worker.
- Analysis system corporation.
- Deploy server.
- Develop, build & release application.

-----

**Freelance | 2017 - Present**
\`Freelance Mobile Developer\`
- Analysis system corporation.
- Develop, build & release application.

-----

**C.A.N Group | Apr, 2016 - May, 2017**
\`Hybrid Developer\`
- Research about Ionic Framework.
- Join to project, develop and maintenance.
- Communicate with the customer to retrieve the request.
- Develop, build & release application.

## Recent Projects
**TMWorld | Aug, 2019 - Nov, 2019 | ${site('https://tmworld.app')} | ${download(
  'https://play.google.com/store/apps/details?id=com.tmworld.tmworld&hl=en',
)}**
\`Node.js\` / \`Javascript\` / \`ExpressJS\` / \`ES6\` / \`MongoDB\` / \`AWS\`
Search for clubs easily. View club's upcoming meetings. Contact clubs in one click. Club visiting has never been so convenient. Never miss a meeting again.
- Development
- Review code
- Optimize code
- Bug Fixing

-----

**DreValet & DreFleet | Dec, 2018 - Sep, 2019 | ${download(
  'https://play.google.com/store/apps/details?id=com.drevalet.dre&hl=en',
  'Download DreValet',
)} | ${download(
  'https://play.google.com/store/apps/details?id=com.drevalet.drevalet',
  'Download DreFleet',
)}**
\`Android\` / \`Kotlin\` / \`RxJava\` / \`RxAndroid\` / \`Firebase\` / \`Realm\`
The app that gets you a trusted valet at the tap of a button! Enjoy your night out – we’ll get both you and your car home safely.
- Development
- Review code
- Optimize code
- Bug Fixing

-----

**MarineTime - MPA | Jul, 2018 - May, 2019 | ${download(
  'https://play.google.com/store/apps/details?id=sg.gov.mpa.marsg&hl=en',
)}**
\`Android\` / \`RxJava\` / \`RxAndroid\`
This is the app that helps people to keep track of vessel time.
- Analysis
- Development
- Review code
- Optimize code
- Bug Fixing

-----

**EMA Components | Mar, 2018 - Apr, 2019**
\`Android\`
This project to provide component is customized.
- Development
- Review code
- Optimize code
- Bug Fixing

-----

**8days | Jun, 2017 - Jul, 2018 | ${download(
  'https://play.google.com/store/apps/details?id=co.vn.the8days&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
)}**
\`Android\` / \`GraphQL\` / \`AES En-Decryption\` / \`AWS\`
Application is a solution to help worker at factory can other food using QR Code technology.
- Analysis
- Development
- Review code
- Optimize code
- Bug Fixing

-----

**Recpic | Apr, 2016 - May, 2017 | ${download(
  'https://play.google.com/store/apps/details?id=com.codeatnite.recpic',
)}**
\`Ionic\` / \`Android\` / \`iOS\` / \`HTML\` / \`SCSS\` / \`Javascript\`
This is the app that helps people to manage their spending.
- Development
- Optimize code
- Bug Fixing
`;
