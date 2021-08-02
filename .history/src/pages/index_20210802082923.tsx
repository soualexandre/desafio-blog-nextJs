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

 export default function Home({posts} : HomeProps) {
  return(
    <>
    <Head>
      <title>CodeNews - Home</title>
    </Head>
   <div className={styles.container}>
   {posts.map(post =>{
      <div key={post.uid} className={styles.content}>
      <h1>{post.title}</h1>
        <p>{post.subtitle}</p>
        <div className={styles.postFooter}>
        <span><img src="/assets/calendar.svg" alt="icon calendar"/>{post.first_publication_date} </span>
        <span><img src="/assets/user.svg" alt="icon calendar"/>{post.author}</span>
        </div>
      </div>
   })}
    <a href="#">Carregar mais posts</a>
   </div>
</>
  )
 }

 export const getStaticProps = async () => {
    const prismic = getPrismicClient();

    const postsResponse = await prismic.query([
      Prismic.predicates.at('document.type', 'codenews')
    ],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 10,
    },

    );

    const posts = postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        data:{
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
         }
        }
      })
    
    return{
      props:{
        posts
      }
    }
 };
