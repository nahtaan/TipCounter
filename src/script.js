let employeeMap = new Map();
let currencyMap = new Map([
    [0.01, 0],
    [0.02, 0],
    [0.05, 0],
    [0.10, 0],
    [0.20, 0],
    [0.50, 0],
    [1.00, 0],
    [2.00, 0],
    [5.00, 0],
    [10.00, 0],
    [20.00, 0],
    [50.00, 0]
]);

let nextId = 0;

class EmployeeEntry {
    /**
     * 
     * @param {String} name 
     * @param {Number} hours 
     * @param {Number} minutes 
     */
    constructor(name, hours, minutes, tipAmount = 0){
        this.name = name;
        this.hours = hours;
        this.minutes = minutes;
        this.tipAmount = tipAmount;
    }
    getHoursDecimal() {
        if(this.minutes > 0){
            return this.hours + (this.minutes / 60);
        }
        return this.hours;
    }
}

const handleSave = () => {
    // save all employees
    let employeeSave = {};
    for(let id of employeeMap.keys()) {
        employeeSave[id] = JSON.stringify(employeeMap.get(id));
    }
    localStorage.setItem('employees', JSON.stringify(employeeSave));

    // save money
    let moneySave = {};
    for(let id of currencyMap.keys()) {
        moneySave[id] = currencyMap.get(id);
    }
    localStorage.setItem('money', JSON.stringify(moneySave));
}

const handleLoad = () => {
    // check if there is a previous save available
    if(localStorage.getItem('employees') === null) {
        return;
    }
    if(localStorage.getItem('money') === null) {
        return;
    }

    // load all employees
    let employeeSave = JSON.parse(localStorage.getItem('employees'));
    for(const [id, employeeStr] of Object.entries(employeeSave)) {
        const employee = JSON.parse(employeeStr);
        const obj = new EmployeeEntry(employee['name'], employee['hours'], employee['minutes'], employee['tipAmount']);
        employeeMap.set(Number(id), obj);
        addEmployeeVisually(employee['name'], employee['hours'], employee['minutes'], Number(id));
        if(nextId <= Number(id)) {
            nextId = Number(id) + 1;
        }
    }

    // load all money
    let moneySave = JSON.parse(localStorage.getItem('money'));
    for(const [value, amount] of Object.entries(moneySave)) {
        currencyMap.set(Number(value), amount);

        // update visual number
        switch (Number(value)) {
            case 0.01: {
                document.getElementById("entry-0.01").innerText = `x${amount}`;
                break;
            }
            case 0.02: {
                document.getElementById("entry-0.02").innerText = `x${amount}`;
                break;
            }
            case 0.05: {
                document.getElementById("entry-0.05").innerText = `x${amount}`;
                break;
            }
            case 0.10: {
                document.getElementById("entry-0.10").innerText = `x${amount}`;
                break;
            }
            case 0.20: {
                document.getElementById("entry-0.20").innerText = `x${amount}`;
                break;
            }
            case 0.50: {
                document.getElementById("entry-0.50").innerText = `x${amount}`;
                break;
            }
            case 1.00: {
                document.getElementById("entry-1.00").innerText = `x${amount}`;
                break;
            }
            case 2.00: {
                document.getElementById("entry-2.00").innerText = `x${amount}`;
                break;
            }
            case 5.00: {
                document.getElementById("entry-5.00").innerText = `x${amount}`;
                break;
            }
            case 10.00: {
                document.getElementById("entry-10.00").innerText = `x${amount}`;
                break;
            }
            case 20.00: {
                document.getElementById("entry-20.00").innerText = `x${amount}`;
                break;
            }
            case 50.00: {
                document.getElementById("entry-50.00").innerText = `x${amount}`;
                break;
            }
        }
    }
    // re-calculate the values
    calculateValues();
}



const addEmployeeClick = () => {
    const nameEntry = document.getElementById("employeeName").value;
    const hoursEntry = document.getElementById("employeeHours").value;
    const minutesEntry = document.getElementById("employeeMinutes").value;

    // early return if there were no inputs made
    if(nameEntry === null || hoursEntry === null || minutesEntry === null){
        return;
    }

    // early return if the name is blank
    if(/^\s$/gm.test(nameEntry) || nameEntry === ""){
        return;
    }

    // early return if the minutes and hours are both 0
    if(hoursEntry === '0' && minutesEntry === '0') {
        return;
    }

    addEmployeeVisually(nameEntry, hoursEntry, minutesEntry, nextId);

    // add the new entry to the employee map
    employeeMap.set(nextId, new EmployeeEntry(nameEntry, Number(hoursEntry), Number(minutesEntry)));
    // increment the id
    nextId += 1;
    calculateValues();
}

const addEmployeeVisually = (nameEntry, hoursEntry, minutesEntry, id) => {
    var hoursFormat = "";
    var minutesFormat = "";

    // create the hours p tag if the hours > 0
    if(Number(hoursEntry) > 0){
        hoursFormat = `<p>${hoursEntry} Hours</p>`;
    }
    // create the minutes p tag if the minutes > 0
    if(Number(minutesEntry) > 0){
        minutesFormat = `<p>${minutesEntry} Minutes</p>`;
    }
    // return if both the hours and minutes are not greater than 0
    if(Number(hoursEntry) <= 0 && Number(minutesEntry) <= 0){
        return;
    }
    const newItem = fromHTML(`
    <div id="employee-${id}" class="flex flex-row place-content-center bg-neutral-700 rounded-xl divide-x-2 p-3 divide-neutral-400 max-w-full min-w-0">
    <div class="flex justify-center items-center align-middle cursor-pointer" onclick="removeEmployee(${id})">
        <svg class="fill-true-red h-7 w-7 justify-self-center place-self-center" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
            <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
        </svg>
    </div>
    <div class="pl-2 pr-2 block text-clip overflow-hidden">
        <p class="text-ellipsis break-words">${nameEntry}</p>
    </div>
    <div class="flex flex-row gap-3 pl-2 pr-2">
        ${hoursFormat}
        ${minutesFormat}
    </div>
</div>
    `);
    
    // append the overall container to the entrylist container
    document.getElementById("entriesList").appendChild(newItem);
}

const removeEmployee = (id) =>  {
    const element = document.getElementById("employee-"+id);
    element.remove();
    employeeMap.delete(id);
    calculateValues();
}

const resetValue = (id, def = "") => {
    const element = document.getElementById(id);
    element.value = def;
}

const resetTips = () => {
    currencyMap = new Map([
        [0.01, 0],
        [0.02, 0],
        [0.05, 0],
        [0.10, 0],
        [0.20, 0],
        [0.50, 0],
        [1.00, 0],
        [2.00, 0],
        [5.00, 0],
        [10.00, 0],
        [20.00, 0],
        [50.00, 0]
    ]);

    document.getElementById("entry-0.01").innerText = 'x0';
    document.getElementById("entry-0.02").innerText = 'x0';
    document.getElementById("entry-0.05").innerText = 'x0';
    document.getElementById("entry-0.10").innerText = 'x0';
    document.getElementById("entry-0.20").innerText = 'x0';
    document.getElementById("entry-0.50").innerText = 'x0';
    document.getElementById("entry-1.00").innerText = 'x0';
    document.getElementById("entry-2.00").innerText = 'x0';
    document.getElementById("entry-5.00").innerText = 'x0';
    document.getElementById("entry-10.00").innerText = 'x0';
    document.getElementById("entry-20.00").innerText = 'x0';
    document.getElementById("entry-50.00").innerText = 'x0';
    calculateValues();
}

const resetEmployees = () => {
    employeeMap = new Map();
    document.getElementById('entriesList').innerHTML = "";
    calculateValues();
}

const addCurrency = (value) => {
    if(!currencyMap.has(value)){
        return;
    }
    const newValue = currencyMap.get(value)+1
    if(newValue > 999){
        return;
    }
    currencyMap.set(value, currencyMap.get(value)+1);

    switch (value) {
        case 0.01: {
            document.getElementById("entry-0.01").innerText = `x${newValue}`;
            break;
        }
        case 0.02: {
            document.getElementById("entry-0.02").innerText = `x${newValue}`;
            break;
        }
        case 0.05: {
            document.getElementById("entry-0.05").innerText = `x${newValue}`;
            break;
        }
        case 0.10: {
            document.getElementById("entry-0.10").innerText = `x${newValue}`;
            break;
        }
        case 0.20: {
            document.getElementById("entry-0.20").innerText = `x${newValue}`;
            break;
        }
        case 0.50: {
            document.getElementById("entry-0.50").innerText = `x${newValue}`;
            break;
        }
        case 1.00: {
            document.getElementById("entry-1.00").innerText = `x${newValue}`;
            break;
        }
        case 2.00: {
            document.getElementById("entry-2.00").innerText = `x${newValue}`;
            break;
        }
        case 5.00: {
            document.getElementById("entry-5.00").innerText = `x${newValue}`;
            break;
        }
        case 10.00: {
            document.getElementById("entry-10.00").innerText = `x${newValue}`;
            break;
        }
        case 20.00: {
            document.getElementById("entry-20.00").innerText = `x${newValue}`;
            break;
        }
        case 50.00: {
            document.getElementById("entry-50.00").innerText = `x${newValue}`;
            break;
        }
    }
    calculateValues();
}

const subtractCurrency = (value) => {
    if(!currencyMap.has(value)){
        return;
    }
    const newValue = currencyMap.get(value) - 1;
    if(newValue < 0){
        return;
    }
    currencyMap.set(value, newValue);

    switch (value) {
        case 0.01: {
            document.getElementById("entry-0.01").innerText = `x${newValue}`;
            break;
        }
        case 0.02: {
            document.getElementById("entry-0.02").innerText = `x${newValue}`;
            break;
        }
        case 0.05: {
            document.getElementById("entry-0.05").innerText = `x${newValue}`;
            break;
        }
        case 0.10: {
            document.getElementById("entry-0.10").innerText = `x${newValue}`;
            break;
        }
        case 0.20: {
            document.getElementById("entry-0.20").innerText = `x${newValue}`;
            break;
        }
        case 0.50: {
            document.getElementById("entry-0.50").innerText = `x${newValue}`;
            break;
        }
        case 1.00: {
            document.getElementById("entry-1.00").innerText = `x${newValue}`;
            break;
        }
        case 2.00: {
            document.getElementById("entry-2.00").innerText = `x${newValue}`;
            break;
        }
        case 5.00: {
            document.getElementById("entry-5.00").innerText = `x${newValue}`;
            break;
        }
        case 10.00: {
            document.getElementById("entry-10.00").innerText = `x${newValue}`;
            break;
        }
        case 20.00: {
            document.getElementById("entry-20.00").innerText = `x${newValue}`;
            break;
        }
        case 50.00: {
            document.getElementById("entry-50.00").innerText = `x${newValue}`;
            break;
        }
    }
    calculateValues();
}

const validateNumberInput = (id) => {
    // get the element
    const input = document.getElementById(id);
    let inputtedValue = input.value;
    // check for invalid characters
    if(!/^[0-9]+$/g.test(inputtedValue)) {
        // remove the invalid characters if they are present
        input.value = inputtedValue.replace(/\D/g, "");
    }
    // stop leading zeros from filling up the space
    input.value = String(Number(input.value));
    // add an upper limit to the inputs
    const numericValue = Number(input.value);
    // no need to check if this is a real number as this has already been validated above
    if(id === "employeeHours" && numericValue > 99){
        input.value = input.value.substring(0, input.value.length - 1);
        window.alert("Max number of Hours is 99")
    }
    if(id === "employeeMinutes" && numericValue > 59){
        input.value = input.value.substring(0, input.value.length - 1);
        window.alert("Max number of Minutes is 59")
    }
}

/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */
const fromHTML = (html, trim = true) => {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;
  
    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;
  
    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}


const calculateValues = () => {
    // save values incase a reload occurs
    handleSave();

    // first, calculate the total of all the tips
    var totalTips = 0;
    for(let key of currencyMap.keys()){
        totalTips += key * currencyMap.get(key);
    }
    
    // update the total tips element
    document.getElementById("total-tips").innerText = `Total: £${totalTips.toFixed(2)}`;

    // next, calculate the total of all the hours
    var totalHours = 0;
    for(let id of employeeMap.keys()){
        totalHours += employeeMap.get(id).getHoursDecimal();
    }

    // calculate the tips earned per hour
    const tipsPerHour = totalTips / totalHours;
    document.getElementById("perhour").innerText = `£${tipsPerHour.toFixed(2)}/hr`;
    
    // calculate the tips earned by each employee
    const employeeResults = [];
    for(let id of employeeMap.keys()){
        const employee = employeeMap.get(id);
        // const employeeTips = Math.floor(employee.getHoursDecimal() * tipsPerHour * 100);
        // do not round until the very end
        const employeeTips = employee.getHoursDecimal()  * tipsPerHour * 100;
        employeeResults.push({
            'name': employee.name,
            'totalTips': employeeTips,
            'remainder': employeeTips,
            'tipsIndividual': {}
        })
    }

    // create a copy of the currencyMap so that we don't mess up the input section
    const currencyMapCopy = new Map(currencyMap);

    // try to use up as many of the tips that we already have before looking at swapping tips
    for(let result of employeeResults){
        splitTips(result, currencyMapCopy);
    }

    // now that we have used as much of the cash that we already have
    // we now need to calculate the minimum number of each currency per employee
    let remainingTipsCount = new Map([
        [50.00, 0],
        [20.00, 0],
        [10.00, 0],
        [5.00, 0],
        [2.00, 0],
        [1.00, 0],
        [0.50, 0],
        [0.20, 0],
        [0.10, 0],
        [0.05, 0],
        [0.02, 0],
        [0.01, 0],
    ]);
    for(let result of employeeResults){
        countRemainingTips(result, remainingTipsCount);
    }

    // remove any old entries
    document.getElementById("old-cash-exchange").innerHTML = "";
    // create the new entries for the old cash exchange
    for(let entry of currencyMapCopy) {
        if(entry[1] == 0) {
            continue;
        }
        let returnEntry = fromHTML(`
            <div class="bg-red-500 rounded-none border-red-700 border-4 px-3 flex flex-col place-content-center text-center w-[72px]">
                        <p>${numberToCurrency(entry[0])}</p>
                        <p>x${entry[1]}</p>
                    </div>`)
        document.getElementById("old-cash-exchange").appendChild(returnEntry);
    }
    // remove any old entries
    document.getElementById("new-cash-exchange").innerHTML = "";
    // create the new entries for the new cash exchange
    for(let entry of remainingTipsCount) {
        if(entry[1] == 0) {
            continue;
        }
        let gainEntry = fromHTML(`
            <div class="bg-green-500 rounded-none border-green-700 border-4 px-3 flex flex-col place-content-center text-center w-[72px]">
                        <p>${numberToCurrency(entry[0])}</p>
                        <p>x${entry[1]}</p>
                    </div>`)
        document.getElementById("new-cash-exchange").appendChild(gainEntry);
    }

    // remove any old entries of employees
    document.getElementById("employee-reslults").innerHTML = "";
    // create the new entries for the employee results
    for(let employee of employeeResults) {
        // console.log(employee);
        let container = fromHTML(`<div class="flex flex-col place-self-center justify-items-center place-items-center p-5 divide-y-2 bg-neutral-700 rounded-xl divide-neutral-400">
                <div class="flex flex-row pb-5 w-full gap-3 place-content-center">
                    <div class="flex flex-col align-middle place-content-center justify-items-center justify-center">
                        <input type="checkbox" class="w-7 h-7 accent-green-500">
                    </div>
                    <div class="flex flex-col">
                        <p class="font-bold text-lg text-center">${employee.name}</p>
                        <p class="font-bold text-lg text-center">Total: £${(employee.totalTips / 100).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `)
        let coinValues = fromHTML(`<div class="flex flex-row place-items-center place-content-center gap-5 flex-wrap pt-5 w-full"></div>`)
        for(const [increment, frequency] of Object.entries(employee.tipsIndividual)) {
            const realIncrement = increment / 100;
            coinValues.appendChild(
                fromHTML(`
                    <div class="bg-teal-500 rounded-none border-teal-700 border-4 px-3 flex flex-col place-content-center text-center w-[72px]">
                        <p>${numberToCurrency(realIncrement)}</p>
                        <p>x${frequency}</p>
                    </div>
                `)
            )
        }
        container.appendChild(coinValues);
        document.getElementById("employee-reslults").appendChild(container);
    }
}

const splitTips = (employee, currencyMap) => {
    // convert the currencyMap to an array and make the values all whole numbers
    let currency = Array.from(currencyMap.entries()).sort((a, b) => b[0] - a[0]);
    for(let i = 0; i<currency.length; i++){
        currency[i][0] *= 100;
    }

    let remainder = Number(employee['remainder']);
    let individual = employee['tipsIndividual'];
    for(let [value, quantity] of currency){
        // iterate until the remainder is too small to fit this value or we have run out of this value
        while(value <= remainder && quantity > 0){
            remainder -= value;
            quantity -= 1;
            currencyMap.set(value/100, quantity);
            if(!(value in individual)){
                individual[value] = 1;
            }else{
                individual[value] += 1;
            }
        }
    }
    employee["tipsIndividual"] = individual;
    employee["remainder"] = remainder;
}

const countRemainingTips = (employee, currencyMap) => {
    // convert the currencyMap to an array and make the values all whole numbers
    let currency = Array.from(currencyMap.entries()).sort((a, b) => b[0] - a[0]);
    for(let i = 0; i<currency.length; i++){
        currency[i][0] *= 100;
    }

    let remainder = employee['remainder'];
    let individual = employee['tipsIndividual'];
    for(let [value, quantity] of currency){
        while(value <= remainder){
            remainder -= value;
            currencyMap.set(value/100, currencyMap.get(value/100) + 1);
            if(!(value in individual)){
                individual[value] = 1;
            }else{
                individual[value] += 1;
            }
        }
    }
    employee['tipsIndividual'] = individual;
    employee['remainder'] = remainder;
}

const numberToCurrency = (number) => {
    switch (number) {
        case 0.01: return "1p";
        case 0.02: return "2p";
        case 0.05: return "5p";
        case 0.10: return "10p";
        case 0.20: return "20p";
        case 0.50: return "50p";
        case 1.00: return "£1";
        case 2.00: return "£2";
        case 5.00: return "£5";
        case 10.00: return "£10";
        case 20.00: return "£20";
        case 50.00: return "£50";
        default: return "Invalid amount";
    }
}
