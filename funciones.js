document.addEventListener('DOMContentLoaded', () => {   
  const tabla = new Tabla(datos, cabecera);      
  const contenedor = $('contenedor');  
  contenedor.appendChild(tabla.generarTabla());
  
  $("btnAgregar").addEventListener("click", () => {
    $("FormularioABM").style.display = "inline-table"; 
    $("divDatos").style.pointerEvents = "none";
  })

  $("btnPromedio").addEventListener("click",ObtenerPromedio);
  $("btnGuardar").addEventListener("click",CrearFila);
  $("btnCancelar").addEventListener("click",CerrarForm);
  $("btnModificar").addEventListener("click",ModificarTabla);
  $("btnEliminar").addEventListener("click",EliminarFila);
  $("btnModificar").style.display = "none";
  $("btnEliminar").style.display = "none";
  CargarSelect(datos); 

  CargarChecks(cabecera);  

});

const cabecera = ["id", "nombre", "apellido", "edad", "alterego", "ciudad", "publicado", "enemigo", "robos", "asesinatos"];
const datos = [{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis",
"publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica",
"publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central",
"publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,
"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,
"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,
"asesinatos":1}];



class Persona {
  constructor(id, nombre, apellido, edad) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }
}

class Heroe extends Persona {
  constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado) {
    super(id, nombre, apellido, edad);
    this.alterEgo = alterEgo;
    this.ciudad = ciudad;
    this.publicado = publicado;
  }
}

class Villano extends Persona {
  constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
    super(id, nombre, apellido, edad);
    this.enemigo = enemigo;
    this.robos = robos;
    this.asesinatos = asesinatos;
  }
}

class Tabla {
  constructor(datos, cabecera) {
      this.datos = datos;
      this.cabecera = cabecera;
  }

  generarTabla() {
    const tabla = document.createElement('table');
    tabla.className = 'tabla';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');

    //const columnas = Object.keys(this.datos[0]);
    this.cabecera.forEach(columna => {
      const  th = document.createElement('th');
      const button = document.createElement("button");
      button.textContent = columna.substring(0,1).toUpperCase() + columna.substring(1);      
      //button.innerHTML += "&#9662;";       
      button.addEventListener("click", OrdenarColumna);
      th.appendChild(button);     
      trHead.appendChild(th);      
    });

    thead.appendChild(trHead);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.id = "tbody";
    this.datos.forEach(dato => {
      const tr = document.createElement('tr');
      tr.addEventListener("dblclick",ModificarFila);
      this.cabecera.forEach(columna => {
        const td = document.createElement('td');
        if(dato[columna] != undefined){
          td.textContent = dato[columna];
        }
        else{
          td.textContent = "--------";
        }
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);

    return tabla;
  }
}
function ModificarFila(e){
  $("FormularioABM").style.display = "inline-table"; 
  $("divDatos").style.pointerEvents = "none";
  $("btnGuardar").style.display = "none"
  $("btnModificar").style.display = "";
  $("btnEliminar").style.display = "";

  let tr = e.target.parentNode;
  $("inpId").value = tr.children[0].textContent;
  $("inpId").disabled = true
  $("inpNombre").value = tr.children[1].textContent;
  $("inpApellido").value = tr.children[2].textContent;
  $("inpEdad").value = tr.children[3].textContent;
  $("inpAlterEgo").value = tr.children[4].textContent;
  $("inpCiudad").value = tr.children[5].textContent;
  $("inpPublicado").value = tr.children[6].textContent;
  $("inpEnemigo").value = tr.children[7].textContent;
  $("inpRobos").value = tr.children[8].textContent;
  $("inpAsesinatos").value = tr.children[9].textContent;  
}
function EliminarFila(){
  let listaTr = Array.from($("tbody").children);

  var element = listaTr.filter((x)=>{        
    return x.children[0].textContent == $("inpId").value;
  });  
  $("tbody").removeChild(element[0]);  
  CerrarForm(); 
}
function ModificarTabla(){
  let listaTr = Array.from($("tbody").children);

  var element = listaTr.filter((x)=>{        
    return x.children[0].textContent == $("inpId").value;
  });  
  
  element[0].children[1].textContent = $("inpNombre").value;
  element[0].children[2].textContent = $("inpApellido").value;
  element[0].children[3].textContent = $("inpEdad").value;
  element[0].children[4].textContent = $("inpAlterEgo").value;
  element[0].children[5].textContent = $("inpCiudad").value;
  element[0].children[6].textContent = $("inpPublicado").value;
  element[0].children[7].textContent = $("inpEnemigo").value;
  element[0].children[8].textContent = $("inpRobos").value;
  element[0].children[9].textContent = $("inpAsesinatos").value;

  CerrarForm(); 
}


function CargarChecks(cabecera){
  const div = $("checkColumns");  
  cabecera.forEach(element => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.id = "check"+element;
    input.value = element;    
    input.addEventListener("change", OcultarColumna);

    const label = document.createElement("label");
    label.htmlFor = "check"+element;
    label.textContent = element.substring(0,1).toUpperCase() + element.substring(1);
    
    div.appendChild(label);
    div.appendChild(input);        
  });  
}

function OcultarColumna(e){
  const check = e.target;  
  var listaChecks = $("divFiltros").querySelectorAll("input[type=checkbox]");
  var index = Array.from(listaChecks).indexOf(check);
  var listTr = Array.from($("contenedor").querySelectorAll("tr"));
  listTr.forEach(x => {
    if(check.checked){
      x.children[index].style.display = ""
    }
    else{
      x.children[index].style.display = "none";
    }    
  });  
}


function ObtenerPromedio(){
  var tbody = $("tbody");
  var listTr = Array.from(tbody.querySelectorAll("tr"));
  var listaEdades = listTr.map((x)=>{
    return parseInt(x.children[3].textContent);
  });
  var sumaTotal = listaEdades.reduce((total, num) => {
    return total + num;
  },0);

  $("inpPromedio").value = sumaTotal / listaEdades.length;    
}

function CargarSelect(){
  const selectFilter = $("selectFilter");
  selectFilter.addEventListener("change", MostrarFiltrado);
  const columnas = ["Heroes","Villanos"];
  columnas.forEach(columna => {
    const op = document.createElement('option');
    op.value = columna;
    op.textContent = columna.substring(0,1).toUpperCase() + columna.substring(1);
    selectFilter.appendChild(op);      
  });
}
function MostrarFiltrado(){
  var valor = $("selectFilter").value;
  var tbody = $("tbody");
  var listTr = Array.from(tbody.querySelectorAll("tr"));
  var listHeroes = listTr.filter((x)=>{        
    return x.children[4].textContent != "--------";
  });
  
  if(valor == "Heroes"){
    listTr.forEach(x=>{
      if(!listHeroes.includes(x)){
        x.style.display = "none";
      }
      if(listHeroes.includes(x)){
        x.style.display = "";
        // Array.from(x.children).forEach(td => {
        //   if(td.textContent == "--------"){
        //     td.style.display = "none";
        //   }          
        // });
      }
    }); 
    $("inpAlterEgo").disabled = false;
    $("inpCiudad").disabled = false;
    $("inpPublicado").disabled = false;

    $("inpEnemigo").disabled = true;
    $("inpRobos").disabled = true;
    $("inpAsesinatos").disabled = true;
  }
  else if(valor == "Villanos"){
    listTr.forEach(x=>{1
      if(listHeroes.includes(x)){
        x.style.display = "none";        
      }
      if(!listHeroes.includes(x)){        
        x.style.display = "";
      }
    });
    $("inpAlterEgo").disabled = true;
    $("inpCiudad").disabled = true;
    $("inpPublicado").disabled = true;

    $("inpEnemigo").disabled = false;
    $("inpRobos").disabled = false;
    $("inpAsesinatos").disabled = false;
  }
  else{
    listTr.forEach(x=>{1              
      x.style.display = "";
    });
  }

}

function OrdenarColumna(e){
  const button = e.target;  
  const index = Array.from(button.parentNode.parentNode.children).indexOf(button.parentNode);
  const orden = button.orden;
  const tbody = $("tbody");
  const ListTr = Array.from(tbody.children);

  if(button.orden != "desc")
  {
    button.orden = "desc";
  }
  else{
    button.orden = "asc"
  }
  
  ListTr.sort((trA,trB) =>{
    if(orden != "desc"){
      var a = trA.children[index].textContent;
      var b = trB.children[index].textContent;  
    }
    else{
      var a = trB.children[index].textContent;
      var b = trA.children[index].textContent;
    }
    
    if(!isNaN(a)){
      a = parseInt(a);
    }
    if(!isNaN(b)){
      b = parseInt(b);
    }

    if(a > b){
      return 1;
    }
    else if(a < b){
      return -1;
    }
    else{
      return 0;
    }
  })
  ListTr.forEach(row => tbody.appendChild(row));  
} 

function $(id){
  return document.getElementById(id);
}

function CrearFila(){
  let error = false;
  

  const tbody = $("tbody");
  const tr = document.createElement('tr');

  const tdId = document.createElement('td');
  if(isNaN($("inpId").value)){
    error = true;
    $("inpId").classList.add("ErrorTd");
  }  
  tdId.textContent = $("inpId").value;
  tr.appendChild(tdId);

  const tdNombre = document.createElement('td');
  tdNombre.textContent = $("inpNombre").value;
  tr.appendChild(tdNombre);

  const tdApellido = document.createElement('td');
  tdApellido.textContent = $("inpApellido").value;
  tr.appendChild(tdApellido);

  const tdEdad = document.createElement('td');
  if(isNaN($("inpEdad").value)){
    error = true;
    $("inpEdad").classList.add("ErrorTd");
  }  
  tdEdad.textContent = $("inpEdad").value;
  tr.appendChild(tdEdad);  
  
  const tdAlterEgo = document.createElement('td');
  tdAlterEgo.textContent = $("inpAlterEgo").value != "" ? $("inpAlterEgo").value :"--------";
  tr.appendChild(tdAlterEgo);

  const tdCiudad = document.createElement('td');
  tdCiudad.textContent = $("inpCiudad").value != "" ? $("inpCiudad").value :"--------";
  tr.appendChild(tdCiudad);

  const tdPublicado = document.createElement('td');
  if(isNaN($("inpPublicado").value) || parseInt($("inpPublicado").value) < 1940){
    error = true;
    $("inpPublicado").classList.add("ErrorTd");
  }  
  tdPublicado.textContent = $("inpPublicado").value != "" ? $("inpPublicado").value :"--------";
  tr.appendChild(tdPublicado);

  const tdEnemigo = document.createElement('td');
  tdEnemigo.textContent = $("inpEnemigo").value != "" ? $("inpEnemigo").value :"--------";
  tr.appendChild(tdEnemigo);

  const tdRobos = document.createElement('td');
  tdRobos.textContent = $("inpRobos").value != "" ? $("inpRobos").value :"--------";
  tr.appendChild(tdRobos);

  const tdAsesinatos = document.createElement('td');
  if($("inpAsesinatos").value != "" && (isNaN($("inpPublicado").value) || parseInt($("inpPublicado").value) < 0)){
    error = true;
    $("inpPublicado").classList.add("ErrorTd");
  } 
  tdAsesinatos.textContent = $("inpAsesinatos").value != "" ? $("inpAsesinatos").value :"--------";
  tr.appendChild(tdAsesinatos);


  if(!error){
    tbody.appendChild(tr);
    CerrarForm();
    
  }
  
}
function CerrarForm(){
  $("FormularioABM").style.display = "none"; 
  $("divDatos").style.pointerEvents = "auto";
  $("inpId").value = "";
  $("inpNombre").value = "";
  $("inpApellido").value = "";
  $("inpEdad").value = "";
  $("inpAlterEgo").value = "";
  $("inpCiudad").value = "";
  $("inpPublicado").value = "";
  $("inpEnemigo").value = "";
  $("inpRobos").value = "";
  $("inpAsesinatos").value = "";
}