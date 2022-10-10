import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import RichText from '../components/richText'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <RichText />
    </div>
  )
}

export default Home
