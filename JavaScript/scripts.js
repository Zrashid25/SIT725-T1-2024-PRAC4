const cardList = [
    {
        title: "Fudge!",
        image: "images/img 5.jpg",
        link: "Fudge",
        desciption: "Cute but kind of evil :P!!"
    },
    {
        title: "Snowball the Fluffy Rabbit!!",
        image: "images/img 4.jpg",
        link: "Snowball",
        desciption: "Ola, I hope you have a wonderful day :D!!!"
    }
]

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align"> <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '"></img></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.description + '</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span><p class="card-text">' + item.description + '</p></div></div></div>';
        $('#card-section').append(itemToAppend);
    });
}

const getProjects = () => {
    $.get('/api/projects', (response) => {

        addCards(response.data);
    });
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    console.log('form data: ', formData);
    addProjectToApp(formData);
}

const addProjectToApp = (project) => {
    $.ajax({
        url: '/api/projects',
        data: project,
        type: 'POST',
        success: (result) => {
            console.log(result);
            location.reload();
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    addCards(cardList);
    $('.modal').modal();

    getProjects();

    $('#formSubmit').click(() => {
        submitForm();
    })
});