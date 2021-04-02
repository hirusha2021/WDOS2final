/*
function orderFunction() {
  var m = document.getElementById("manfcs1").value;
  
    document.getElementById("currentorders").innerHTML = m;
  }

*/

function orderFunction(){
      var manu = document.getElementsByName('manu');
      
      for( i= 0; i<3; i++){
        if(manu[i].checked)
      
        document.getElementById("currentorders1").innerHTML="manufacture-" +manu[i].value;
      }
    
      var prod = document.getElementsByName('productsradio');
      
      for( i= 0; i<4; i++){
        if(prod[i].checked)
        
        document.getElementById("currentorders2").innerHTML="product-" +prod[i].value;

    }
    var sizes = document.getElementsByName('size');
      
      for( i= 0; i<3; i++){
        if(sizes[i].checked)
        
        document.getElementById("currentorders3").innerHTML="size-" +sizes[i].value;

    }
    var extra = document.getElementsByName('extra');
      
      for( i= 0; i<3; i++){
        if(extra[i].checked){
          document.getElementById("currentorders4").innerHTML="extras-" +extra[i].value;
        }
        
        

    }
}

/*

function orderFunction() {

  var manu = document.getElementsByTagName('input');
    
  for(i = 0; i < manu.length; i++) {
        
      
        
          if(manu[i].checked){
              var x  =manu[i].value;

      }
    }
    document.getElementById("currentorders").innerHTML=x.value;
  }
*/