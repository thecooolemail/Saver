import styles from '../src/app/styles/custom.module.css'


const Container_Stats = () => {

return(
    <div className={styles.ContainerStatsRoot}>
        

        <div className={styles.StatContainer}>
        <h3>Budget Left:</h3>
        <p>Stat1</p>
        
        </div>
        <div className={styles.StatContainer}>
            <p>Stat2</p>
        </div>
    </div>
)


}

export default Container_Stats