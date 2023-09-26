
async function writeCodeAnimation() {

    const codeText = //PEGADO A LA IZQUIERDA PARA QUE SE ESCRIBA DENTRO DE LA ETIQUETA PRE SIN TABULACIONES INNECESARIAS
        `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portafolio</title>
</head>
<body>
    <main>
        <div id="web-developer-info">
            <h1>Sergio Navarro González</h1>
            <h2>Desarrollador Web FullStack</h2>
        </div>
    </main>
</body>
</html>`

    let index = 0;

    while (index <= codeText.length) {
        const char = codeText.slice(0, index);
        await write(char);
        index++;
    }

}

async function write(char) {
    const codeElement = document.getElementById("code-animation");
    return new Promise((resolve) => {
        setTimeout(() => {
            codeElement.innerHTML = Prism.highlight(char, Prism.languages.html);
            resolve();
        }, 50);
    })
}


function showContent() {
    const divToShow = document.getElementById("hero-content");
    const divToHide = document.getElementById("animation-container");
    divToHide.style.display = "none";
    divToShow.classList.add("active");
}

/*Scroll menú header*/
function toSection(idSection) {
    const elementToScroll = document.getElementById(idSection);
    elementToScroll.scrollIntoView({ behavior: 'smooth' });
    setupScrolling();
}

/*Scroll entre secciones*/
function setupScrolling() {
    let index = 0;

    window.addEventListener("wheel", (event) => {
        const elements = document.getElementsByClassName("container-fluid content-div");

        if (event.deltaY > 0 && index < elements.length - 1) {
            event.preventDefault();
            index++;
            elements[index].scrollIntoView({ behavior: 'smooth' });
        } else if (event.deltaY < 0 && index !== 0) {
            event.preventDefault();
            console.log("arriba");
            index--;
            elements[index].scrollIntoView({ behavior: 'smooth' });
        }
    }, { passive: false });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ball-animation").scrollIntoView({ behavior: "smooth" });

    setTimeout(() => { //Retardo para esperar a aplicar las funciones cuando finalice la animación de inicio
        showContent();
        writeCodeAnimation();
        setupScrolling();
    }, 4000);
});

function showMenu() {
    const menuContent = document.getElementById("menu-content");
    const menuBars = document.getElementById("menu-bars");
    const menuList = document.getElementById("menu-list");

    if (menuContent.classList.contains("active")) {
        menuContent.classList.remove("active");
        menuBars.classList.remove("open");

        setTimeout(() => { //Retardo para que de tiempo a que termine la transición antes de ocultar los enlaces
            menuList.style.display = "none";
        }, 600);

    } else {
        menuContent.classList.add("active");
        menuBars.classList.add("open");
        menuList.style.display = "block";
    }

}


function toDetail(idProject) {

    switch (idProject) {
        case 'project-gesgas':
            window.open('Proyectos/detalleProyectoGesgas.html', '_blank');
            break;

        case 'project-marketart':
            window.open('Proyectos/detalleProyectoMarketArt.html', '_blank');
            break;
    }
}



async function mixChars(idElement, originalString) {
    const mixElement = document.getElementById(idElement);
    const originalText = originalString;
    mixElement.innerText = "";

    let index = originalText.length - 1;


    for (let i = index; i !== 0; i--) {
        let randomChar = Math.floor(Math.random() * originalText.length);
        let char = originalText.charAt(randomChar);
        await writeMixedChar(idElement, char);
        index--;
    }


    setTimeout(() => {
        mixElement.innerText = originalText;
    }, 35);


}


async function writeMixedChar(idElement, charToWrite) {
    const mixElement = document.getElementById(idElement);
    let acumChar = "";
    acumChar = acumChar + charToWrite;

    return new Promise((resolve) => {
        setTimeout(() => {
            mixElement.innerText += acumChar;
            resolve();
        }, 35);
    });


}

