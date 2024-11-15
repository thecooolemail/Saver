

const MonthTitle = ({Info}) => {

    const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

return(
    <p style={{color: 'black', zIndex: 2, textAlign: 'center', opacity: '0.3'}}>{MonthNames[Info[6]?.Date.getMonth()]}</p>
)
}

export default MonthTitle