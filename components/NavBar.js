"use client"
import styles from '../src/app/styles/custom.module.css'
import Container_Add from './Container_Add'
import { useEffect, useState } from 'react'
import DayPicked from '@/app/states/daypicked'
import CalendarView from '@/app/states/CalendarView';

const NavBar = () => {

    const DaySelected = DayPicked()
    const CalView = CalendarView()

    const [date, setdate] = useState()

    useEffect(() => {
        let x = new Date(DaySelected.Date)
        setdate(x)
    }, [DaySelected])

    const [add, setadd] = useState(false)

    let todayDate = new Date()

    return(
        <div className={styles.NavBar} style={{zIndex: 2}}>
            {add && <Container_Add AutoDate={date} Close={() => setadd(false)}/>}
            

            <svg onClick={() => {DaySelected.setFullDayScroll(undefined) ; DaySelected.setDay(todayDate.toDateString())}}  xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.431 17.21C6.703 16.528 5.327 15.147 4.649 13.417C4.448 12.903 3.868 12.65 3.354 12.851C2.84 13.052 2.586 13.633 2.787 14.147C3.666 16.392 5.453 18.184 7.696 19.07C8.209 19.273 8.791 19.021 8.993 18.507C9.196 17.994 8.944 17.413 8.431 17.21ZM17.121 13.417C16.443 15.147 15.067 16.528 13.339 17.21C12.826 17.413 12.574 17.994 12.777 18.507C12.979 19.021 13.561 19.273 14.074 19.07C16.317 18.184 18.104 16.392 18.983 14.147C19.184 13.633 18.93 13.052 18.416 12.851C17.902 12.65 17.322 12.903 17.121 13.417ZM13.339 4.75299C15.067 5.43499 16.443 6.81599 17.121 8.54499C17.322 9.05899 17.902 9.31299 18.416 9.11199C18.93 8.91099 19.184 8.32999 18.983 7.81599C18.104 5.56999 16.317 3.77899 14.074 2.89299C13.561 2.68999 12.979 2.94199 12.777 3.45599C12.574 3.96899 12.826 4.54999 13.339 4.75299ZM4.649 8.54499C5.327 6.81599 6.703 5.43499 8.431 4.75299C8.944 4.54999 9.196 3.96899 8.993 3.45599C8.791 2.94199 8.209 2.68999 7.696 2.89299C5.453 3.77899 3.666 5.56999 2.787 7.81599C2.586 8.32999 2.84 8.91099 3.354 9.11199C3.868 9.31299 4.448 9.05899 4.649 8.54499Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.901 1V5.544C9.901 6.096 10.349 6.544 10.901 6.544C11.453 6.544 11.901 6.096 11.901 5.544V1C11.901 0.448 11.453 0 10.901 0C10.349 0 9.901 0.448 9.901 1Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.901 16.2581V20.8031C9.901 21.3551 10.349 21.8031 10.901 21.8031C11.453 21.8031 11.901 21.3551 11.901 20.8031V16.2581C11.901 15.7061 11.453 15.2581 10.901 15.2581C10.349 15.2581 9.901 15.7061 9.901 16.2581Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.803 9.901H16.258C15.706 9.901 15.258 10.349 15.258 10.901C15.258 11.453 15.706 11.901 16.258 11.901H20.803C21.355 11.901 21.803 11.453 21.803 10.901C21.803 10.349 21.355 9.901 20.803 9.901Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.544 9.901H1C0.448 9.901 0 10.349 0 10.901C0 11.453 0.448 11.901 1 11.901H5.544C6.096 11.901 6.544 11.453 6.544 10.901C6.544 10.349 6.096 9.901 5.544 9.901Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.891 7.35596C8.90801 7.35596 7.29901 8.96596 7.29901 10.948C7.29901 12.93 8.90801 14.54 10.891 14.54C12.873 14.54 14.483 12.93 14.483 10.948C14.483 8.96596 12.873 7.35596 10.891 7.35596ZM10.891 9.35596C11.769 9.35596 12.483 10.069 12.483 10.948C12.483 11.827 11.769 12.54 10.891 12.54C10.012 12.54 9.29901 11.827 9.29901 10.948C9.29901 10.069 10.012 9.35596 10.891 9.35596Z" fill="black"/>
            </svg>

            <h4 style={{color: 'black'}} onClick={() => setadd(true)}>+</h4>

            <svg onClick={() => CalView.setView(!CalView.WeekView)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M17.3857 14.1197C17.0393 13.7722 16.6882 13.4281 16.3313 13.09C16.0751 12.8466 15.8071 12.5997 15.6058 12.4346C15.3273 12.2029 15.0066 12.0052 14.6333 12.1596C14.3162 12.2907 14.2086 12.5774 14.1933 12.7658C14.1816 12.9156 14.2203 13.0326 14.2343 13.0736C14.6603 14.3198 14.3747 15.7533 13.38 16.7433C12.3865 17.7321 10.9518 18.013 9.70788 17.5812C9.34159 17.4536 8.94139 17.6479 8.81383 18.0142C8.68628 18.3804 8.88053 18.7806 9.2468 18.907C10.9787 19.5085 12.9822 19.1212 14.371 17.738C15.2615 16.851 15.7448 15.7089 15.8197 14.547C16.0104 14.733 16.2012 14.9214 16.3907 15.111C16.6646 15.386 17.1092 15.3872 17.3831 15.1133C17.6581 14.8395 17.6595 14.3947 17.3857 14.1197Z" fill="black"/>
                <path d="M4.62486 14.3621C4.3522 14.0871 4.3522 13.6424 4.6272 13.3686C4.9022 13.0947 5.34686 13.0959 5.6207 13.3709C5.8091 13.5605 5.99984 13.7489 6.19174 13.9349C6.26664 12.7729 6.74877 11.6308 7.64045 10.7439C9.02947 9.36072 11.0316 8.97337 12.7646 9.57488C13.1309 9.70243 13.324 10.1015 13.1976 10.4689C13.0701 10.8352 12.6698 11.0283 12.3036 10.9019C11.0596 10.4689 9.62496 10.7498 8.6302 11.7398C7.6367 12.7286 7.35001 14.1621 7.77711 15.4083C7.79115 15.4493 7.8286 15.5663 7.8169 15.7161C7.80285 15.9045 7.69402 16.1912 7.37808 16.3222C7.00479 16.4767 6.68415 16.2789 6.40447 16.0484C6.20437 15.8822 5.93639 15.6353 5.67894 15.3919C5.3232 15.0537 4.97213 14.7097 4.62576 14.3622L4.62486 14.3621Z" fill="black"/>
                <path d="M11.4679 12.8723C11.4679 12.485 11.1531 12.1702 10.7658 12.1702C10.3785 12.1702 10.0637 12.485 10.0637 12.8723V14.5305C10.0637 14.7786 10.162 15.0173 10.3375 15.1928L11.0888 15.9429C11.3626 16.2179 11.8072 16.2179 12.0811 15.9429C12.3561 15.6691 12.3561 15.2244 12.0811 14.9506L11.4679 14.3362L11.4679 12.8723Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.61701 0C6.00436 0 6.31915 0.314791 6.31915 0.702138V1.87233H15.6808V0.702138C15.6808 0.314791 15.9956 0 16.3829 0C16.7703 0 17.0851 0.314791 17.0851 0.702138V1.87233H17.5531C20.0094 1.87233 22 3.86284 22 6.31918V17.5531C22 20.0094 20.0095 22 17.5531 22H4.44685C1.9906 22 0 20.0095 0 17.5531V6.31918C0 3.86293 1.99051 1.87233 4.44685 1.87233H4.91494V0.702138C4.91494 0.314791 5.22967 0 5.61701 0ZM20.5956 6.31918V6.55322H1.40443V6.31918C1.40443 4.63876 2.76655 3.27672 4.44688 3.27672H4.91496V4.68097C4.91496 5.06832 5.22976 5.38311 5.6171 5.38311C6.00445 5.38311 6.31924 5.06832 6.31924 4.68097V3.27672H15.6809V4.68097C15.6809 5.06832 15.9957 5.38311 16.383 5.38311C16.7704 5.38311 17.0852 5.06832 17.0852 4.68097V3.27672H17.5532C19.2337 3.27672 20.5956 4.63885 20.5956 6.31918ZM20.5956 7.95748H1.40443V17.5531C1.40443 19.2335 2.76655 20.5955 4.44688 20.5955H17.5532C19.2336 20.5955 20.5956 19.2334 20.5956 17.5531V7.95748Z" fill="black"/>
            </svg>

        </div>
    )
}

export default NavBar