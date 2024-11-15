import styles from '../app/styles/custom.module.css'

import Container_Top from '../../components/Container_Top';
import Container_Days from '../../components/Container_Days';

import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';

export default function Home() {
  return (
    <div className={styles.root}>
      <Loader/>
      <Container_Top/>
      <Container_Days/>
      <NavBar></NavBar>
      </div>
  );
}

