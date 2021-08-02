import { render } from '@testing-library/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { RichText } from 'prismic-dom';
import id from 'date-fns/esm/locale/id/index.js';
import { useState } from 'react';

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
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
console.log(posts)
  const handleLoadMorePosts = async () => {
    fetch(nextPage)
      .then(response => response.json())
      .then((data: PostPagination) => {
        setPosts([...posts, ...data.results]);
        setNextPage(data.next_page);
      });
  }

  return (
    <>
      <Head>
        <title>CodeNews - Home</title>
      </Head>
      <main className={styles.container}>
        {posts.map(post => (
          <a key={post.uid} className={styles.content}>
            <h1>{post.data.title}</h1>
            <p>{post.data.subtitle}</p>
            <div className={styles.postFooter}>
              <span><img src="/assets/calendar.svg" alt="icon calendar" />{post.first_publication_date} </span>
              <span><img src="/assets/user.svg" alt="icon calendar" />{post.data.author}</span>
            </div>
          </a>
        ))}
        {nextPage &&
          <div className={styles.nextPage} onClick={handleLoadMorePosts}>
            Carregar mais posts
          </div>
        }

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

  ) as PostPagination;

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results,
  }

  return {
    props: {
      postsPagination,
    },
    revalidate: 60 * 30  //30 minutes
  };
};
