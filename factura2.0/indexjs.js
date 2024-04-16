/*$( window ).on( "load", function() {
    console.log( "window loaded" );
    
});*/


$( document ).ready(function() {

    /*
        captura los valores de los campos detalle y valor
        verifica si no estan vacios y llama la funcion AgregarCampos,
        totaliza la factura y limpiua los campos
    */
    $('#Agregar').click(function (e) { 
        let detalle = $("#detalle").val();
        let valor = $("#valor").val();
        let filas = document.getElementById('tbody');
        //verifica que los campos no esten vacios//
        if((detalle === "") || (valor ==="")){
            alert("todos los campos deben ser digitados")
            LimpiarCampos();
        }else{
            AgregarCampos(filas,detalle,valor);
            TotalizarFactura();
            LimpiarCampos();
            $("#detalle").focus();
        }
    });


    /*
    agregar datos a la tabla. recibe parametros de las filas y los campos capturados
    inserta codigo html en la tabla para agregar al contenido. ademas de el boton eliminar
    */
    function AgregarCampos(filas,detalle,valor){
        let tbody = document.getElementById('tbody');
        let id = parseInt(filas.rows.length);
        tbody.innerHTML+=`<tr>
        <td>`+(id+1)+`</td>
        <td>`+detalle+`</td>
        <td>`+valor+`</td>
        <td>
            <button class="btn btn-outline-danger btn-sm" id="eliminar">X</button>
        </td>
        </tr>`
    }

    /*
    obtine la longitud de la tabla despues de agrgar la fila con la informacion
    inicializa sumatoria que almacena la suma de los valores,
    recorre la tabla obteniendo los valores de las celdas "valor" y realiza la sumatoria
    asigna la sumatoria al elemento TotalFactura
    */

    function TotalizarFactura(){
       let sumatoria = 0;
       let tbody =  document.getElementById('tbody');
       let filas = tbody.rows.length;
       for (let i = 0 ; i < filas; i++) {
        sumatoria += parseInt(tbody.rows[i].cells[2].innerHTML);
        document.getElementById('Totalfactura').innerHTML=sumatoria;
       }
    }

    /*
    el boton eliminar captura el evento click en el documento haciendo referencia
    al elemento " boton eliminar" captura la fila en la que se encuentra y la remueve
    luego realiza la sumatoria nuevamente
     */

    $(document).on('click', '#eliminar', function(event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        let filas = tbody.rows.length;
        if(filas==0){
            document.getElementById('Totalfactura').innerHTML=0;
        }
        TotalizarFactura();
        $("#detalle").focus();
    })

    $('#genpdf').click(function (e) { 
        var doc = new jsPDF();
        doc.html(document.body, {
            callback: function (doc) {
              doc.save();
            },
            x: 10,
            y: 10
         });

        /*var doc = new jsPDF();
        var contenido = $("#principal").html();
        console.log(contenido);
        doc.text( contenido);
        doc.save('factura en pdf');*/
    });



    //limpiar los campos del producto//
    function LimpiarCampos(){
        $("#detalle").val("");
        $("#valor").val("");
    };

});

