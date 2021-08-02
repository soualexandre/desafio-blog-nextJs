import { render } from '@testing-library/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { RichText } from 'prismic-dom';
import id from 'date-fns/esm/locale/id/index.js';

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

export default function Home({ postsPagination }: HomeProps) {
  console.log(postsPagination)
  return (
    <>
      <Head>
        <title>CodeNews - Home</title>
      </Head>
      <main className={styles.container}>
        {postsPagination.map(post => {
          <div key={post.uid} className={styles.content}>
            <h1>{post.data.title}</h1>
            <p>{post.data.subtitle}</p>
            <div className={styles.postFooter}>
              <span><img src="/assets/calendar.svg" alt="icon calendar" />{post.first_publication_date} </span>
              <span><img src="/assets/user.svg" alt="icon calendar" />{post.data.author}</span>
            </div>
          </div>
        })}

        <a href="#">Carregar mais posts</a>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'codenews')
  ],
    {
      pageSize: 10,
    },

  )as PostPagination;

  const postsPagination : PostPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results,
  }

  return {
    props: {
      postsPagination
    },
    revalidate: 60 * 30  //30 minutes
  };
};
