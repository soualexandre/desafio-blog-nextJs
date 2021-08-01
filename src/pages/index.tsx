import { render } from '@testing-library/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

 export default function Home() {
  return(
    <>
    <Head>
      <title>CodeNews - Home</title>
    </Head>
   <div className={styles.container}>
    <div className={styles.content}>
    <h1>Como utilizar hooks</h1>
      <p>Pensando em sincronização em vez de ciclos de vida.</p>
      <div className={styles.postFooter}>
      <span><img src="/assets/calendar.svg" alt="icon calendar"/> 15 Mar 2021</span>
      <span><img src="/assets/user.svg" alt="icon calendar"/> 15 Mar 2021</span>
      </div>
    </div>
    <div className={styles.content}>
    <h1>Como utilizar hooks</h1>
      <p>Pensando em sincronização em vez de ciclos de vida.</p>
      <div className={styles.postFooter}>
      <span><img src="/assets/calendar.svg" alt="icon calendar"/> 15 Mar 2021</span>
      <span><img src="/assets/user.svg" alt="icon calendar"/> 15 Mar 2021</span>
      </div>
    </div>
    <div className={styles.content}>
    <h1>Como utilizar hooks</h1>
      <p>Pensando em sincronização em vez de ciclos de vida.</p>
      <div className={styles.postFooter}>
      <span><img src="/assets/calendar.svg" alt="icon calendar"/> 15 Mar 2021</span>
      <span><img src="/assets/user.svg" alt="icon calendar"/> 15 Mar 2021</span>
      </div>
    </div>
    <div className={styles.content}>
    <h1>Como utilizar hooks</h1>
      <p>Pensando em sincronização em vez de ciclos de vida.</p>
      <div className={styles.postFooter}>
      <span><img src="/assets/calendar.svg" alt="icon calendar"/> 15 Mar 2021</span>
      <span><img src="/assets/user.svg" alt="icon calendar"/> 15 Mar 2021</span>
      </div>
    </div>
    <div className={styles.content}>
    <h1>Como utilizar hooks</h1>
      <p>Pensando em sincronização em vez de ciclos de vida.</p>
      <div className={styles.postFooter}>
      <span><img src="/assets/calendar.svg" alt="icon calendar"/> 15 Mar 2021</span>
      <span><img src="/assets/user.svg" alt="icon calendar"/> 15 Mar 2021</span>
      </div>
    </div>

    <a href="#">Carregar mais posts</a>
   </div>
</>
  )
 }

//  export const getStaticProps = async () => {
//     const prismic = getPrismicClient();
//     const postsResponse = await prismic.query(TODO);

//  };
