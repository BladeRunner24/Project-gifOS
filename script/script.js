const apikey = "tEqLo5qpwf1Tb3MhyXoiqEZG0vCK8qk1";

  /*PRIMERA GALERIA DE IMAGENES*/

 async function galeria(){
      let llamadaUrl = 'http://api.giphy.com/v1/gifs/trending?api_key=' + apikey + '&limit=15&rating=G';
      let primerRespuesta = await fetch(llamadaUrl);
      let datosArray =  await primerRespuesta.json();
      return datosArray;
 }
 galeria()
 .then(function(datosArray){
      let primerTitulo = document.getElementById('galeria1');
      primerTitulo.innerHTML = datosArray.data[0].title; 
      let segundoTitulo = document.getElementById('galeria2');
      segundoTitulo.innerHTML = datosArray.data[1].title;
      let tercerTitulo = document.getElementById('galeria3');
      tercerTitulo.innerHTML = datosArray.data[2].title;
      let cuartoTitulo = document.getElementById('galeria4');
      cuartoTitulo.innerHTML = datosArray.data[3].title; 
      let primeraImagen = document.getElementById('imagen1'); 
      let primerGif =  datosArray.data[0].embed_url; 
      primeraImagen.setAttribute("src", primerGif);
      let segundaImagen = document.getElementById('imagen2'); 
      let segundoGif =  datosArray.data[1].embed_url; 
      segundaImagen.setAttribute("src", segundoGif);
      let terceraImagen = document.getElementById('imagen3'); 
      let tercerGif =  datosArray.data[2].embed_url; 
      terceraImagen.setAttribute("src", tercerGif);
      let cuartaImagen = document.getElementById('imagen4'); 
      let cuartoGif =  datosArray.data[3].embed_url; 
      cuartaImagen.setAttribute("src", cuartoGif);        
 });
 
 galeria()
.catch(function(error){
     console.log("Error al cargar " + error)
}); 

/*SEGUNDA GALERIA DE IMAGENES*/


async function galeria2(){
      let llamadaUrlDos = 'http://api.giphy.com/v1/gifs/trending?api_key=' + apikey + '&limit=15&rating=G';
      let segundaRespuesta = await fetch(llamadaUrlDos);
      let datosArrayDos =  await segundaRespuesta.json();
      return datosArrayDos;
}
galeria2()
.then(function(datosArrayDos){

     for(let i = 4; i < 14; i++){
                          
        var nuevagaleria = document.getElementById('nuevagaleria')
       
        let divisiones = document.createElement('div');
        divisiones.setAttribute("class", "divisiones");
        nuevagaleria.appendChild(divisiones);


        let imagenesGaleria = document.createElement('iframe');
        imagenesGaleria.setAttribute("class", "imagenesGaleria"); 
        imagenesGaleria.setAttribute('src', datosArrayDos.data[i].embed_url);
        divisiones.appendChild(imagenesGaleria);
     }
     let itemUno = document.getElementsByClassName('divisiones')[4];
     itemUno.setAttribute('id', 'item1');
     document.getElementById('item1').style.gridRowStart = "2";
     document.getElementById('item1').style.gridRowEnd = "span 1";
     document.getElementById('item1').style.gridColumnStart = "1";
     document.getElementById('item1').style.gridColumnEnd = "span 2";

     let itemDos = document.getElementsByClassName('divisiones')[9];
     itemDos.setAttribute('id', 'item2');
     document.getElementById('item2').style.gridRowStart = "3";
     document.getElementById('item2').style.gridRowEnd = "span 1";
     document.getElementById('item2').style.gridColumnStart = "3";
     document.getElementById('item2').style.gridColumnEnd = "span 2";
}); 
galeria2()
.catch(function(error){
     console.log("Error al cargar " + error)
}); 

/* BUSCADOR */

function buscador(){
     
  document.getElementById('botonbuscador').addEventListener('click', function(){

     barraTendencias = document.getElementById('tendencias');
     barraResultados = document.getElementById('resultados');
     
     barraTendencias.style.display = 'none';
     barraResultados.style.display = 'block';
     
     propuestas = document.getElementById('propuestas');
     propuestas.style.display = 'inline';

     let keyword = document.getElementById('browser').value;
     const apyK = 'tEqLo5qpwf1Tb3MhyXoiqEZG0vCK8qk1';

     tituloResultados = document.getElementById('respuestaresultados');
     tituloResultados.innerHTML = keyword + " (resultados)";

     async function buscadorGifs(){
      let llamada = 'http://api.giphy.com/v1/gifs/search?api_key=' + apyK + '&q=' + keyword +'&limit=15&rating=G';
      let sR = await fetch(llamada);
      let datosArrayD =  await sR.json();
      return datosArrayD;
     }
     buscadorGifs()
    .then(function(datosArrayD){         
      let primerTituloGif = document.getElementById('galeria1');
      primerTituloGif.innerHTML = datosArrayD.data[0].title; 
      let segundoTituloGif = document.getElementById('galeria2');
      segundoTituloGif.innerHTML = datosArrayD.data[1].title;
      let tercerTituloGif = document.getElementById('galeria3');
      tercerTituloGif.innerHTML = datosArrayD.data[2].title;
      let cuartoTituloGif = document.getElementById('galeria4');
      cuartoTituloGif.innerHTML = datosArrayD.data[3].title;
      let primeraImagenGif = document.getElementById('imagen1'); 
      let primerGifTraido =  datosArrayD.data[0].embed_url; 
      primeraImagenGif.setAttribute("src", primerGifTraido);
      let segundaImagenGif = document.getElementById('imagen2'); 
      let segundoGifTraido =  datosArrayD.data[1].embed_url; 
      segundaImagenGif.setAttribute("src", segundoGifTraido);
      let terceraImagenGif = document.getElementById('imagen3'); 
      let tercerGifTraido =  datosArrayD.data[2].embed_url; 
      terceraImagenGif.setAttribute("src", tercerGifTraido);
      let cuartaImagenGif = document.getElementById('imagen4'); 
      let cuartoGifTraido =  datosArrayD.data[3].embed_url; 
      cuartaImagenGif.setAttribute("src", cuartoGifTraido);        
     });
     buscadorGifs()
     .then(function(datosArrayNuevaLlamada){
          for(let i = 4; i < 14; i++){

               let imagenesGaleria = document.getElementsByClassName('imagenesGaleria')[i-4];
               imagenesGaleria.setAttribute('src', datosArrayNuevaLlamada.data[i].embed_url);
               
          }
     });
     buscadorGifs()
     .catch(function(errorDeBusqueda){
     console.log("Error al cargar " + errorDeBusqueda)
     }); 
     
     async function busquedasSugeridas() {
          let segundaBusqueda = 'https://api.giphy.com/v1/tags/related/' + keyword + '?&api_key=' + apyK + '&limit=3';
          let nR = await fetch(segundaBusqueda);
          let resultadoBusqueda = await nR.json();
          return resultadoBusqueda;
     };
     busquedasSugeridas()
     .then(function(busqueda){
          for(let i = 0; i < 3; i++){
               let propuestas = document.getElementsByClassName('busquedassugeridas')[i];
               propuestas.innerHTML = '#' + busqueda.data[i].name;
          }
     });
     busquedasSugeridas()
     .catch(function(error){
          console.log(error);
     });

     propuestas = document.getElementById('propuestas');
     propuestas.style.display = 'inline';
     
  }); 
};

buscador();

/* GALERIA MIS GUIFS*/

function galeriaMisGuifs() {

     document.getElementById('misguifos').addEventListener('click', function() {

          let seccionBuscador = document.getElementById('buscador');
          seccionBuscador.style.display = 'none';
          let seccionpropuestas = document.getElementById('propuestas');
          seccionpropuestas.style.display = 'none';          
          let seccionsugerencias = document.getElementById('sugerencias');
          seccionsugerencias.style.display = 'none'; 
          let secciongaleria = document.getElementById('galeria');
          secciongaleria.style.display = 'none';
          let seccionTendencias = document.getElementById('tendencias');
          seccionTendencias.style.display = 'none';
          let galeria2 = document.getElementById('nuevagaleria');
          galeria2.style.display = 'none';
          let seccionResultados = document.getElementById('resultados');
          seccionResultados.style.display = 'none';
          let galeriaMisGuifos = document.getElementById('guifos1');
          galeriaMisGuifos.style.opacity = '1'; 
          
          const arrayGif = JSON.parse(localStorage.getItem('guifos'));
          let galeria = document.getElementById('galeriaguifs');
          let imagenesGaleria = document.createElement('img');

          imagenesGaleria.setAttribute("class", "imagenguif");
          imagenesGaleria.setAttribute("alt", "guif");
          imagenesGaleria.src = arrayGif;

          galeria.appendChild(imagenesGaleria);
     });
};

galeriaMisGuifs();

/* CAMBIO DE TEMA*/

function cambioDeTema(){

     document.getElementById('icono').addEventListener('click', function() {
          
          let sailor = document.getElementById('sailor');
          sailor.style.display = 'block';
     });
      document.getElementById('sd').addEventListener('click', function() {
          let sailor1 = document.getElementById('sailor');
          sailor1.style.display = 'none';
      });
      document.getElementById('sn').addEventListener('click', function() {
          let sailor2 = document.getElementById('sailor');
          sailor2.style.display = 'none';
      });
};

cambioDeTema();




