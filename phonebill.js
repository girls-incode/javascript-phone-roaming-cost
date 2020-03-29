const PRICE_PER_MINUTE = 120;
const PRICE_PER_SECOND = 4;

function getCost(duration) {
    const [hour, min, sec] = duration;
    let seconds = hour*3600 + min*60 + sec;
    let time = 0, price = 0;

    if (hour || (!hour && min >= 5)) {
        time = (hour*60) + (sec ? min+1: min);
        price = PRICE_PER_MINUTE * time;
    }
    else {
        price = PRICE_PER_SECOND * seconds;
    }
    return {time: seconds, price: price}
}

function readText(text) {
    let callLogs = [],
        totalCost = 0,
        phones = new Map();

    callLogs = text.split("\n");
    
    callLogs.forEach(item => {
        let info = item.split(','),
            duration = info[0].split(":").map(x=>parseInt(x)),
            phoneNum = parseInt(info[1].replace(/-/g,'')),
            cost = getCost(duration);

        if (phones.has(phoneNum)) {
            let curent = phones.get(phoneNum);
            curent.time += cost.time;
            curent.price += cost.price;
            phones.set(phoneNum, curent);
        }
        else {
            phones.set(phoneNum, cost);
        }
        
        totalCost += cost.price;
    });
    return {'phones': phones, 'totalCost': totalCost}
}

async function main(url) {
    const text = await fetch(url);
    let data = await text.text(),
        res = readText(data),
        phones = res.phones,
        minPhoneNum = Infinity,
        maxDuration = 0,
        phonePrice = 0;

    phones.forEach((val, key) => {
        console.log(`Phone ${key} costs ${val.price} cents for ${val.time} seconds`);
        if (val.time >= maxDuration && key < minPhoneNum) {
            maxDuration = val.time;
            minPhoneNum = key;
            phonePrice = val.price;
        }
    });
    res.totalCost -= phonePrice;
    console.log('Total cost: ' + res.totalCost);
}

main('logs.txt');