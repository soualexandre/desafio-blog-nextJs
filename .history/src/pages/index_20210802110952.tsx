import { render } from '@testing-library/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'
import commonStyles from '../styles/common.module.scss';
import { dateFormatter } from '../utils/dateFormater';
import styles from './home.module.scss';
import { RichText } from 'prismic-dom';
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
          <Link key={post.uid} href="#">
          <a className={styles.content}>
            <h1>{post.data.title}</h1>
            <p>{post.data.subtitle}</p>
            <div className={styles.postFooter}>
              <span><img src="/assets/calendar.svg" alt="icon calendar" /><time>{dateFormatter(post.first_publication_date)}</time></span>
              <span><img src="/assets/user.svg" alt="icon calendar" />{post.data.author}</span>
            </div>
          </a>
          </Link>

        ))}
        {nextPage &&
          <div className={styles.nextPage} >
            <a onClick={handleLoadMorePosts}> Carregar mais posts</a>
          </div>
        }

      </main>
    </>
  )
}

export const getStaticProps : GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'codenews')
  ],
    {
      pageSize: 2,
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
