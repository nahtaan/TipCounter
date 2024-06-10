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
    <div class="flex flex-row place-content-center bg-neutral-700 rounded-xl divide-x-2 p-3 divide-neutral-400 max-w-full">
        <div class="flex justify-center items-center align-middle">
            <svg class="fill-true-red lg:h-9 lg:w-7 lg:pt-2 h-7 w-7 justify-self-center place-self-center" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
            </svg>
        </div>
        <div class="pl-2 pr-2 lg:pr-0 lg:pl-0 block text-clip overflow-hidden">
            <p class="text-ellipsis break-words">${nameEntry}</p>
        </div>
        <div class="flex lg:flex-col sm:flex-row gap-3 pl-2 pr-2 lg:pr-2">
            ${hoursFormat}
            ${minutesFormat}
        </div>
    </div>
    `);
    
    // append the overall container to the entrylist container
    document.getElementById("entriesList").appendChild(newItem);
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