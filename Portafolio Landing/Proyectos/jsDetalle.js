function showFunctionalities() {
    const dropdown = document.getElementById("dropdown-functionalities");
    const spanIcon = document.getElementById("dropdown-icon");


    if (!dropdown.classList.contains("active")) {
        dropdown.classList.add("active");
        spanIcon.innerText = "expand_more";
    } else {
        dropdown.classList.remove("active");
        spanIcon.innerText = "chevron_right";
    }
}


function toPorfolio(){
    window.location.href="../portafolioLanding.html";
}