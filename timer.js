let time = document.getElementsByClassName('time');
let timeFunctions = {
    incrementSecond: function () {
        time[2].innerHTML = Number(time[2].innerHTML) + 1
        time[2].innerHTML.length === 1 ? time[2].innerHTML = "0" + time[2].innerHTML : time[2].innerHTML
    },
    incrementMinutes: function () {
        time[1].innerHTML = Number(time[1].innerHTML) + 1
        time[1].innerHTML.length === 1 ? time[1].innerHTML = "0" + time[1].innerHTML : time[1].innerHTML
    },
    incrementHours: function () {
        time[0].innerHTML = Number(time[0].innerHTML) + 1
        time[0].innerHTML.length === 1 ? time[0].innerHTML = "0" + time[0].innerHTML : time[0].innerHTML
    },
    clearAll: function () {
        for (let index = 0; index < time.length; index++) {
            time[index].innerHTML = '00'
        }
    }
}

function start() {
    return setInterval(() => {
        timeFunctions.incrementSecond();
        if (time[2].innerHTML == 60) {
            timeFunctions.incrementMinutes()
            if (time[1].innerHTML == 60) {
                timeFunctions.incrementHours()
                time[1].innerHTML = 0
            }
            time[2].innerHTML = 0
        }
    }, 1000)
}

function stop(timer) {
    clearInterval(timer)
}