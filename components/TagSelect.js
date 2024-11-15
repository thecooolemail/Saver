import styles from '../src/app/styles/custom.module.css'
import { useEffect, useState } from 'react'
import Tags from '../src/app/states/Tags.js'

const TagSelect = ({SendTag}) => {


    const [ShowAll, setShowAll] = useState(false)
    return(
        <div className={styles.tagselect}>

            <div className={styles.tagsgrid}>
                {Tags.slice(0, ShowAll ? Tags.length : 6).map(e => {
                    return(<div onClick={() => SendTag(e)} className={styles.tagButton} style={{backgroundColor: e.In ? '#35C759' : "#FF3B2F"}}><div style={{scale: '0.9'}}>{e.svg}</div></div>)
                })}
            </div>
                <div className={styles.tagButton}onClick={() => setShowAll(!ShowAll)}><b style={{fontSize: '10px', opacity: '1', color: 'black'}}>{ShowAll ? "Less" : "More"}</b></div>


        </div>
    )
}

export default TagSelect

//return(<div onClick={() => SendTag(e)} className={styles.tagButton}><div style={{height: '30px',scale: '0.6'}}>{e.svg}</div><p style={{opacity: '1', fontSize: '15px'}}>{e.name}</p></div>)