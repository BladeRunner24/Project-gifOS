

const apikey = "tEqLo5qpwf1Tb3MhyXoiqEZG0vCK8qk1";

const arrayMisGuifos = [];
let video = document.getElementById('videodisplay');


let constrains = { 
    audio: false,
    video: {
    height: {max: 434 } 
    },       
};

    function captureCamera(callback) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then(function (camera) {
            callback(camera);
          })
          .catch(function (error) {
            console.error(error);
          });
    }

    function stopRecordingCallback() {
      video.src = URL.createObjectURL(recorder.getBlob());
      const form = new FormData();
      form.append("file", recorder.getBlob(), "myGif.gif");
      console.log(form.get("file")); 
      fetch('https://upload.giphy.com/v1/gifs?api_key=' + apikey, {
        method: "POST",
        body: form
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const dataid = data.data.id;    
        fetch('https://api.giphy.com/v1/gifs/' + dataid + '?&api_key=' + apikey)
        .then(response => {
          console.log(response.status);
          return response.json();
        })
        .then(data => {
          console.log(data.data.images.fixed_height_downsampled.url);
          console.log(data.data.title);
          console.log(data.data);
          let mostrarImg = document.getElementById('imagengif');
          mostrarImg.setAttribute('src', data.data.images.fixed_height_downsampled.url);
          let mostrarSegundaImg = document.getElementById('segundaimagengif');
          mostrarSegundaImg.setAttribute('src', data.data.images.fixed_height_downsampled.url);
          
          if (localStorage.getItem("guifos") == null) {
            arrayMisGuifos.push(data.data.images.fixed_height_downsampled.url);
            localStorage.setItem("guifos", JSON.stringify(arrayMisGuifos));
          } else {
            arrayMisGuifos = JSON.parse(localStorage.getItem("guifos"));
            arrayMisGuifos.push(data.data.images.fixed_height_downsampled.url);
            localStorage.setItem("guifos", JSON.stringify(arrayMisGuifos));
          }
        })
        .catch(error => {
          return error;
        })
      })
    }         


function comenzar(){

    document.getElementById('comienzo').addEventListener('click', function(){

        let cambioPantalla = document.getElementById('crearguifos');
        let pantallaVideo = document.getElementById('capturavideo');
        
        cambioPantalla.setAttribute('style', 'display: none');
        pantallaVideo.setAttribute('style', 'display: block');

        let imagenGif = document.getElementById('imagengif');
        imagenGif.setAttribute('style', 'display: none');

        let misGuifos = document.getElementById('misguifos');
        misGuifos.setAttribute('style', 'display: none');

        let galeriaGuifos = document.getElementById('galeriaguifs');
        galeriaGuifos.setAttribute('style', 'display: none');

        navigator.mediaDevices
    .getUserMedia(constrains)
    .then(function (mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
      video.play();
      };
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });
    

        });
};

comenzar();


function empezarAGrabar(){

    document.getElementById('botoncaptura').addEventListener('click', function(){

    let botonCapturar = document.getElementById('botonesvideo');
    botonCapturar.setAttribute('style', 'display: none');
    let botonListo = document.getElementById('botonlisto');
    botonListo.setAttribute('style', 'display: flex');
    let timer = document.getElementById('timer');
    timer.setAttribute('style', 'display: flex');
    let tituloUno = document.getElementById('titulo')
    tituloUno.innerHTML = 'Capturando Tu Guifo';
    
      
      captureCamera(function (camera) {
        recorder = RecordRTC(camera, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 720,
          hidden: 560,
          onGifRecordingStarted: function() {console.log('started')},
        });
        recorder.startRecording();
    });
    });
}

empezarAGrabar();

function terminarDeGrabar(){

  document.getElementById('botonfinalizar').addEventListener('click',function(){
   
    let tituloUno = document.getElementById('titulo')
    tituloUno.innerHTML = 'Vista Previa';
    let botonfinalizar = document.getElementById('botonlisto');
    botonfinalizar.style.display = 'none';    

    recorder.stopRecording(stopRecordingCallback);

    let terminarVideo = document.getElementById('videodisplay');
    terminarVideo.style.display = 'none';
    let mostrarImagen = document.getElementById('imagengif');
    mostrarImagen.style.display = 'block';
    let timer1 = document.getElementById('timer');
    timer1.setAttribute('style', 'display: none');
    let preview = document.getElementById('preview');
    preview.setAttribute('style', 'display: flex');
    
    
    navigator.mediaDevices
    .getUserMedia(constrains)
    .then(function (mediaStream) {
      video.srcObject = mediaStream;      
      mediaStream.getTracks()[0].stop();            
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });        
  });
};

terminarDeGrabar();

function repetirCaptura() {

  document.getElementById('repetir').addEventListener('click',function(){

    localStorage.removeItem('guifos');    
    window.history.back();

  });
};

repetirCaptura();

function subirGuifo() {

  document.getElementById('subir').addEventListener('click',function(){

    let tituloDos = document.getElementById('titulo');
    tituloDos.innerHTML = 'Subiendo Guifo';
    let ocultarImagen = document.getElementById('imagengif');
    ocultarImagen.style.display = 'none';
    let ocultarPreview = document.getElementById('preview');
    ocultarPreview.style.display = 'none';
    let pantallaDeCarga = document.getElementById('pantalladecarga');
    pantallaDeCarga.style.display = 'block';
    let botonCancelar = document.getElementById('cancelar');
    botonCancelar.style.display = 'block'; 
    
    setTimeout(function() {
      let videoOut = document.getElementById('capturavideo');
      videoOut.style.display = 'none' 
      let ultimaPantalla = document.getElementById('ultimapantalla');
      ultimaPantalla.style.display = 'block';
      let misGuifos1 = document.getElementById('misguifos');
      misGuifos1.setAttribute('style', 'display: block');
      let galeriaGuifos1 = document.getElementById('galeriaguifs');
      galeriaGuifos1.setAttribute('style', 'display: block');  

    }, 5000);
});
};

subirGuifo();

function CancelarCaptura() {

  document.getElementById('cancelar').addEventListener('click',function(){
    
    localStorage.removeItem('guifos');
    window.history.back();

  });
};

CancelarCaptura();

function SubirGuifAGaleria() {

const arrayGif = JSON.parse(localStorage.getItem('guifos'));
let galeria = document.getElementById('galeriaguifs');
let imagenesGaleria = document.createElement('img');

imagenesGaleria.setAttribute("class", "imagenguif");
imagenesGaleria.setAttribute("alt", "guif");
imagenesGaleria.src = arrayGif;

galeria.appendChild(imagenesGaleria);
console.log(arrayGif);
     
};

SubirGuifAGaleria();

function listo() {

  document.getElementById('listo').addEventListener('click',function(){
    
    window.history.back();

  });
};

listo();

function descargarGuifo() {

  const descargarGif = document.getElementById('copiaenlace');
  const arrayGif1 = JSON.parse(localStorage.getItem('guifos'));
  descargarGif.setAttribute('href', arrayGif1);
}

descargarGuifo();

function copiarEnlace() {

  document.getElementById('textoenlace').addEventListener('click',function(){

    const copyText = JSON.parse(localStorage.getItem('guifos'));
    const text = document.getElementById('myInput');
    text.setAttribute('value', copyText);
    text.select();
    document.execCommand("copy");        
});
};

copiarEnlace();







