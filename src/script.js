const addEmployeeClick = () => {
    const name = document.getElementById("employeeName").value;
    const hours = document.getElementById("employeeHours").value;
    const minutes = document.getElementById("employeeMinutes").value;
    const li = document.createElement("li");

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
