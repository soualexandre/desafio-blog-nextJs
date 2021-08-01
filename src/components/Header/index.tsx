import styles from './header.module.scss'
export default function Header() {
  return(
   <div className={styles.containerHeader}>
   <div className={styles.contentHeader}>
      <img src="/assets/logoIcon.svg" alt="Logo"/>
      <span>CodeNews <span>.</span></span>
    </div>
   </div>
  )
}
