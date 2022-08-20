//variables locales
const 
//navbar
navbar = document.getElementById("navbar"),
home = document.getElementById("home"),
reserve = document.getElementById("reserve"),
log = document.getElementById("log"),
sesion = document.getElementById("sesion"),
shine = document.getElementById("shine"),
//form
form = document.getElementById("form"),
email = document.getElementById("email"),
password = document.getElementById("password"),
rememberme = document.getElementById("rememberme"),
forgetme = document.getElementById("forgetme"),
access = document.getElementById("access"),
//container
container = document.getElementById("container"),
spinner = document.getElementById("spinner"),
property = document.getElementById("property"),
//archive
archive = document.getElementById("archive");

//funcion reutilizable para cambiar las clases
const classReplace = (name, firstClass, secondClass) => {
    name.classList.replace(firstClass, secondClass)
}

//array vacio donde dinamicamente se rellenará 
//con los datos de la reserva
let contentReserve = [];

//en esta funcion se encuentran todas las funciones
//correspondientes a la seccion navbar
const functionsNavbar = () => {
    //navega hacia la pagina principal
    home.addEventListener("click", () => {
        classReplace(property,"property","propertyRemove");
        classReplace(archive,"archive","archiveRemove");
        classReplace(spinner,"spinner","spinner-border");
        setTimeout(() => {
            classReplace(spinner,"spinner-border","spinner");
            classReplace(navbar,"navbarRemove","navbar");
            classReplace(container,"containerRemove","container");
        }, 1000)
    })
    //navega hacia la reserva del usuario
    reserve.addEventListener("click", () => {
        //si no esta logueado, no puede reservar una propiedad
        if (!email.value | !password.value) {
            Toastify({
                text: "To make a reservation, you must log in",
                duration: 2000,
                style: {
                    background: "0d6efd",
                  },
                }).showToast();
        } else {
            //una vez logueado, puede realizar una reserva
            classReplace(container,"container","containerRemove");
            classReplace(property,"property","propertyRemove");
            classReplace(spinner,"spinner","spinner-border");
            setTimeout(() => {
                classReplace(spinner,"spinner-border","spinner");
                classReplace(archive,"archiveRemove","archive");
                if (!contentReserve.length) {
                    //si aun no existen reservas, se emite una alerta
                    archive.innerHTML = `
                    <div class="alert alert-primary" role="alert">
                    <h3>¡You haven't made a reservation yet!</h3>
                    </div>`
                } else {
                    //una vez que existe una reserva, se pintara una 
                    //tarjeta con los datos de la propiedad
                    contentReserve.map((cont) => {
                        archive.innerHTML = `
                        <div class="card mb-3">
                            <div class="col g-0">
                                <div class="col-md-12">
                                    <div class="card-body">
                                    <img src=${cont.interior3} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior2} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior3} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior2} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior3} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior2} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior3} class="img-fluid rounded-start" alt="...">
                                    <img src=${cont.interior2} class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="card-body">
                                    <h1 class="card-title">${cont.name}</h1>
                                    <p class="card-text">${cont.details}</p>
                                    <p class="card-text">${cont.details}</p>
                                    <p class="card-text">${cont.details}</p>
                                    <h3>Price: ${cont.price}</h3>
                                    <h3>Contract: ${cont.contract}</h3>
                                    <h3>Fee: ${cont.fee}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    })
                }
            }, 1000) 
        }
    })

    //navega hacia el formulario
    log.addEventListener(("click"), () => {
        //si se encuentra logueado, se despide al usuario
        if (sesion.innerText === "Log Out") {
            Toastify({
                text: `Good bye ${email.value}!`,
                duration: 2000
                }).showToast();
            classReplace(navbar,"navbar","navbarRemove");
            classReplace(archive,"archive","archiveRemove");
            classReplace(container,"container","containerRemove");
            classReplace(property,"property","propertyRemove");
            classReplace(spinner,"spinner","spinner-border");
                setTimeout(() => {
                    classReplace(spinner,"spinner-border","spinner");
                    classReplace(form,"formRemove","form");
                    classReplace(shine,"bg-danger","bg-success");
                    sesion.innerText = "Log Out";
                }, 1000);
        } else {
            //si se loguea por primera vez cambiara el estado 
            //de la luz de "rojo" a "verde"
            classReplace(navbar,"navbar","navbarRemove");
            classReplace(archive,"archive","archiveRemove");
            classReplace(container,"container","containerRemove");
            classReplace(spinner,"spinner","spinner-border");
                setTimeout(() => {
                    classReplace(spinner,"spinner-border","spinner");
                    classReplace(form,"formRemove","form");
                    classReplace(shine,"bg-danger","bg-success");
                    sesion.innerText = "Log Out";
                }, 1000);
        }
    })
}
//ejecucion
functionsNavbar()

//en esta funcion se encuentran todas las funciones
//correspondientes a la seccion form
const functionsForm = () => {
    //se guardan los datos del usuario en el localStorage
    rememberme.addEventListener("click", () => {
        //si no hay datos ingresados se emite un mensaje
        if (!email.value | !password.value) {
            Toastify({
                text: "You have not entered your data",
                duration: 2000
            }).showToast();
        } else {
            //si hay datos ingresados, se guardan correctamente
            Toastify({
                text: "Your data has been saved!",
                duration: 2000
            }).showToast();
            localStorage.setItem(email.value, password.value);
        }
    })
    //se borran los datos ingresados en el localStorage
    forgetme.addEventListener("click", () => {
        //si no hay datos ingresados, se emite un mensaje
        if (!localStorage.length) {
            Toastify({
                text: "You have not entered your data",
                duration: 2000
            }).showToast();
        } else {
            //si hay datos ingresados, se borran correctamente
            Toastify({
                text: "Your data has been deleted!",
                duration: 2000
            }).showToast();
            localStorage.clear()
            }
    })
    //navega hacia el inicio de la pagina nuevamente
    access.addEventListener("click", () => {
        //si no hay datos ingresados emite una alerta
        if (!email.value | !password.value) {
            Swal.fire({
                icon: 'error',
                title: 'An error has occurred',
                text: 'Your email and/or password are invalid, please re-enter your data'
              })
        } else {
            //si hay datos ingresados permite la navegacion
            form.classList.replace("form","formRemove");
            spinner.classList.replace("spinner","spinner-border");
            setTimeout(() => {
                spinner.classList.replace("spinner-border","spinner");
                navbar.classList.replace("navbarRemove","navbar");
                container.classList.replace("containerRemove","container");
            }, 1000);
            setTimeout(() => {
                Toastify({
                    text: `¡Welcome ${email.value}!`,
                    duration: 2000
                    }).showToast();
            }, 300)
        }
    })

}
//ejecucion
functionsForm()

//en esta funcion se encuentran todas las funcionalidades
//que pintan las propiedades en inicio
const paintProperties = () => {
    //llamado fetch al archivo json que contiene las propieades
    fetch("./properties.json")
    .then((respuesta) => respuesta.json())
    .then((informacion) => {
        //metodo de arrays map para recorrer el json
            informacion.map((el) => {
                container.innerHTML += `
                    <div 
                    class="card text-center" 
                    style="width: 20rem;" 
                    data-aos="fade-up"
                    data-aos-duration="1500">
                        <img src=${el.img} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h3 class="card-title">${el.name}</h3>
                            <p class="card-text">${el.details}</p>
                            <h4>Price: ${el.price}</h4>
                            <h4>Contract: ${el.contract}</h4>
                            <h4>Fee: ${el.fee}</h4>
                        </div>
                        <div>
                            <button id=${el.id} type="button" class="btn btn-primary">More Info</button>
                        </div>
                    </div>`
                })

                    informacion.forEach((select) => {
                        //tomamos la seleccion del usuario y ejecutamos la funcion
                        //de navegar hacia la seleccion en detalle
                        document.getElementById(`${select.id}`).addEventListener("click", () => {
                            classReplace(container, "container", "containerRemove");
                            classReplace(spinner, "spinner", "spinner-border");
                            setTimeout(() => {
                                classReplace(spinner, "spinner-border", "spinner");
                                classReplace(property, "propertyRemove", "property");
                                //guardamos el parametro de la seleccion del usuario en
                                //una funcion a ejecutar a continuacion
                                propertySelect(select);
                            }, 500);
                        })
                    })
        }) 
}
//ejecucion
paintProperties()

//esta funcion contiene las funciones 
//correspondientes a la seleccion del usuario
const propertySelect = (select) => {
    //pintamos en un archivo HTML la seleccion
    //del usuario en detalle
    property.innerHTML = `
        <div 
        class="card mb-3" 
        style="max-width: 940px;"
        data-aos="fade-up"
        data-aos-duration="1500">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${select.interior2} class="img-fluid rounded-start" alt="...">
                    <img src=${select.interior3} class="img-fluid rounded-start" alt="...">
                    <img src=${select.interior2} class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h1 class="card-title">${select.name}</h1>
                        <p class="card-text">${select.details}</p>
                        <p class="card-text">${select.details}</p>
                        <p class="card-text">${select.details}</p>
                        <h3>Price: ${select.price}</h3>
                        <h3>Contract: ${select.contract}</h3>
                        <h3>Fee: ${select.fee}</h3>
                    </div>
                    <div>
                        <button id="back" type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                                <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
                            </svg>
                        </button>
                        <button id="addReserve" type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>`

            //esta funcion permite retornar del detalle 
            //hacia las opciones nuevamente
            let back = document.getElementById("back");
            back.addEventListener("click", () => {
                property.classList.replace("property","propertyRemove");
                spinner.classList.replace("spinner", "spinner-border")
                setTimeout(() => {
                    navbar.classList.replace("navbarRemove", "navbar");
                    container.classList.replace("containerRemove", "container");
                    spinner.classList.replace("spinner-border", "spinner")
                }, 500);       
            })

            //esta funcion permite reservar la propiedad
            let addReserve = document.getElementById("addReserve");
            addReserve.addEventListener("click", () => {
                if (!email.value | !password.value) {
                    //siempre y cuanto el usuario este registrado
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: 'btn btn-primary',
                          cancelButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                      })
                      swalWithBootstrapButtons.fire({
                        title: 'An error has occurred!',
                        //en caso de no estar registrado
                        //se da a elegir al usuario si quiere hacerlo
                        text: `To reserve a property you must first enter your data, since without your data we will not know who to expect at the real estate agency. 
                        Do you want to start session?`,
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, log in',
                        cancelButtonText: 'No, continue watching',
                        reverseButtons: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                            //si quiere registrarse, se redirecciona al formulario
                            classReplace(navbar, "navbar","navbarRemove");
                            classReplace(property, "property","propertyRemove");
                            classReplace(archive, "archive","archiveRemove");
                            classReplace(spinner,"spinner","spinner-border");
                            setTimeout(() => {
                                classReplace(spinner,"spinner-border","spinner");
                                classReplace(form,"formRemove","form")
                                classReplace(shine,"bg-danger","bg-success");
                                sesion.innerText = "Log Out";
                            }, 1000)
                        }
                        //si no quiere registrarse, puede seguir viendo propiedades
                      })
                } else {
                    //una vez registrado, puede libremente reservar una propiedad
                    Swal.fire({
                        icon: 'success',
                        title:'¡Success Booking!',
                        text: `Thank you for your reservation! A download will be issued which will 
                        contain both your data and the property data so that you can go to one of our 
                        closest branches and carry out the operation. 
                        Remember that you can only reserve one property per day...
                        Good luck!`,
                        footer: `Your turn is: March 8. 3:00 p.m.`,
                      })
                    //se guarda la propiedad en el localStorage
                    const propertySave = JSON.stringify(select);
                    localStorage.setItem(`Property`, propertySave); 
                    //se guarda la propiedad en el array vacio que tenemos en la linea 31
                    //para generar funcionalidad desde el navbar
                    contentReserve.push(select);
                }
            })
}