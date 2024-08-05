import styles from '../app/styles/custom.module.css'
import Expense from '../../components/Expense';
import TransactionsUI from '../../components/Transactions';
import Income from '../../components/Income';

export default function Home() {
  return (
    <div className={styles.root}>
      <div style={{width: '100%', height: '1px', opacity: '0.5', border: 'solid 0.5px var(--accentcolor)', marginTop: '10px'}}/>
      <TransactionsUI></TransactionsUI>
      
      <div style={{position: 'fixed', zIndex: 1, bottom: '0px', width: '100vw', backgroundColor: 'var(--backgroundCol)', padding: '25px 20px', borderTop: 'solid 0.5px var(--accentcolor)'}}>
        <Income/>
        <div style={{width: '100%', height: '1px', opacity: '0.2', border: 'solid 0.5px var(--accentcolor)', marginTop: '10px'}}/>
        <Expense/>
      </div>
      </div>
  );
}
