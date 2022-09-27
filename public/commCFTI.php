<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<title id = "title"> </title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"> </script>
	<script type="text/javascript">
	
	function getNTERR(){
		//alert("eccociqua");
	var sASMCODE;
	var flagCPTI = [];
	var flagASMI = [];
	var asmicode = [];
	
	var nterrCFTI=[];

	//alert(ASMIlist.length);
	
		var url = window.location.href;
		nchar = url.length - 3;
		var sType = url.substr(nchar,3);
		
		nchar = url.length - 22;
		var sASMCODE = url.substr(nchar,18);
		//alert(sASMCODE);
		//alert(sType);
		if (url.substr(nchar,1) == '?') {
			nchar=nchar+1
			var sASMCODE = url.substr(nchar,17);
		}
		//alert(sASMCODE);
	for (var i = 1; i < ASMIlist.length; i++) {
		var line = ASMIlist[i].split(/\t/)
		flagASMI[i] = line[0];
		flagCPTI[i] = line[2];
		asmicode[i] = line[3];
		nterrCFTI[i] = line[4];
	}
	//alert(asmicode[1]);
    var flaglist = asmicode.indexOf(sASMCODE);
	if (flaglist > -1) {
		//alert(nterrCFTI[flaglist] );
		if (flagCPTI[flaglist] != "@"){
			alert("ATTENZIONE! Per questo terremoto il CFTI5Med non è lo studio di riferimento di CPTI15!");
		} 
		if (sType == "XML") {
			location.href =  'XML_COMM/' + nterrCFTI[flaglist] +"_COMM.xml";
		} else {
			location.href =  'quake.php?' + nterrCFTI[flaglist] + "IT";
		}
	}    else {
		alert("ATTENZIONE! Codice errato o terremoto non presente in CFTI5Med!");
    }
	}
	
	
	var ASMIlist = [];
	
	$.get('CFTI5med_ASMI.txt', function(data){
		//alert("Data: " + data);
		   ASMIlist = data.split('\r');
		   
	});
	var check = function(){
    if(ASMIlist != ""){
		//alert("check!");
        getNTERR()
    }
    else {
		//alert("not check!");
        setTimeout(check, 10); // check again in a second
    }
	}
	check();
	
	
	</script>
</head>
<body>

</body>
</html>