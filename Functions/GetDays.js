const GetDays = () => {
    
   
    const dates = [];
    const today = new Date();
    let range = 16 * 7

    // Loop from -range to +range
    for (let i = -range; i <= range; i++) {
        const newDate = new Date(today); // Create a new date object
        newDate.setDate(today.getDate() + i); // Adjust the date
        dates.push({ Date: newDate}); // Add the new date to the array
    }

    return dates;
            
    
            
}

export default GetDays


