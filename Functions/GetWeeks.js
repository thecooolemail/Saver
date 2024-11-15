const GetWeeks = () => {
    
    const weekday = ["Mon","Tue","Wed","Thu","Fri","Sat", "Sun"];

    
    const weeksArray = []; // To hold the arrays of weeks
    const currentDate = new Date();

    let range = 16

    // Helper function to get the start of the week (Monday)
    const getStartOfWeek = (date) => {
        const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
        const diff = (day === 0 ? -6 : 1) - day; // Calculate difference to Monday
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() + diff);
        return startOfWeek;
    };

    // Calculate the start of the current week
    let startOfCurrentWeek = getStartOfWeek(currentDate);

    // Generate past 5 weeks, current week, and next 5 weeks
    for (let weekOffset = range*-1; weekOffset <= range; weekOffset++) {
        const weekArray = [];

        // Start of the week based on the offset (e.g., -5 for 5 weeks ago)
        let startOfWeek = new Date(startOfCurrentWeek);
        startOfWeek.setDate(startOfCurrentWeek.getDate() + weekOffset * 7);

        // Push each day of the week (Monday to Sunday) into weekArray
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + dayOffset);
            weekArray.push({ Date: day, Day: weekday[dayOffset] });
        }

        // Push the current week's array of days into the weeksArray
        weeksArray.push(weekArray);
    }

    return weeksArray; // Returns an array of weeks, each containing an array of days
};

export default GetWeeks;