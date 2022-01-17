// returns a string representation of a provided day 0-6 (0 indexing)
export const getDayString = (day) => {
    switch (day) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Thuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thuersday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"

    }
}