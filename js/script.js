function gozlege_yaz(pressed_keyword){
   let old_value=document.getElementById("gozleg_ucin").value;
   if(old_value!=""){
   document.getElementById("gozleg_ucin").value=old_value+","+pressed_keyword;
   } else{
      document.getElementById("gozleg_ucin").value=pressed_keyword;
   }
}

