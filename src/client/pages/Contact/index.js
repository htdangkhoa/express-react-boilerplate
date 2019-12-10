import React from 'react';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';

const source = `
# Contact

KBlog is a website to share experiences, knowledge, case studies to help you create more professional applications and products.

KBlog always strives to improve the content and quality of the article to provide you with the most useful information and knowledge in the field of programming and design to be able to create more professional applications.

KBlog is ready to welcome cooperation opportunities with all of you for the opportunity to develop more.

All information should be answered questions, support you please contact me at the address below:

Email: <a href="mailto:huynhtran.dangkhoa@gmail.com">huynhtran.dangkhoa@gmail.com</a>
`;

const Contact = ({ route: { title } }) => (
  <Layout title={title} needLogin={false}>
    <MdViewer source={source} />
  </Layout>
);

export default Contact;
