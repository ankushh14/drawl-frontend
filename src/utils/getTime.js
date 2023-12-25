const getTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    if(hours<10){
        hours = `0${hours}`
    }
    let minutes = currentDate.getMinutes();
    if(minutes<10){
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
}

export default getTime