"use client"
import styles from '../src/app/styles/custom.module.css'
import { MoonLoader } from 'react-spinners'
import CalendarView from '@/app/states/CalendarView';

const Loader = () => {

    let CalView = CalendarView()

    return(
        
            
        <div className={styles.IntroAnim}>
            <MoonLoader color='white'/>
      </div>
      
    )

}

export default Loader