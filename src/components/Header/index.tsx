import Link from 'next/link'
import styles from './header.module.scss'
export default function Header() {
  return(
   <div className={styles.containerHeader}>
     <Link href="/">
     <a>
   <div className={styles.contentHeader}>
      <img src="/assets/logoIcon.svg" alt="logo"/>
      <span>CodeNews <span>.</span></span>
    </div>
    </a>
    </Link>
   </div>
  )
}
