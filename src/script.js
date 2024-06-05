const addEmployeeClick = () => {
    const name = document.getElementById("employeeName").value;
    const hours = document.getElementById("employeeHours").value;
    const minutes = document.getElementById("employeeMinutes").value;
    const li = document.createElement("li");

}
const handleNumOnly = (id) => {
    // get the element
    const input = document.getElementById(id);
    let inputtedValue = input.value;
    // check for invalid characters
    if(!/^[0-9]+$/g.test(inputtedValue)) {
        // remove the invalid characters if they are present
        input.value = inputtedValue.replace(/\D/g, "");
    }
}
