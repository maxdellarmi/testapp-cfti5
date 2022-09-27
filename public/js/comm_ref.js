var text = "io mi chiamo pippo ";
var codbib = ["000000", "111111", "222222"];
var author = ["Baratta", "Bonito", "Mercalli"];
var place = ["Torino", "Roma", "Milano"]
var title = ["libro1", "libro2", "libro3"];
var year = ["1900", "1800", "1700"];
var newtext;

function start(){
    var newt;
    document.getElementById('title').innerHTML = 'ref_prova'
    document.getElementById('text1').innerHTML = text
    newt = createREF(text, codbib, name, title, year, place);
    document.getElementById('text2').innerHTML = newt;
}

function createREF(text, codbib, author, title, year, place){
    var codbibCIT;
    var codbib_array = [];
    var ref;
    var biblio = '';
    var n2 = 0;
    var n1 = 0;
    var s = 0;
    if (text.indexOf("$")!=-1){
        while (n2 != -1 && n2 <= text.length){
            n1 = text.indexOf("$");
            n2 = text.indexOf("$", n1+1);
            var nref = Math.floor((n2 - n1 - 3)/6);
            codbibCIT = text.substring(n1+2, n1+2+6)
            if (codbib_array.indexOf(codbibCIT) == -1){
                codbib_array[s] = codbibCIT;
                s += 1
                var refNum = codbib_array.indexOf(codbibCIT) + 1;
                biblio = biblio + "<br \>" + refNum.toString() + ") " + author[codbib.indexOf(codbibCIT)] + ", " + title[codbib.indexOf(codbibCIT)] + ". " + place[codbib.indexOf(codbibCIT)] + ", " + year[codbib.indexOf(codbibCIT)];
            } else {
                var refNum = codbib_array.indexOf(codbibCIT) + 1;
                biblio = biblio;
            }
            ref = "(" + refNum.toString();

            if (nref > 1){
                for (var i = 1; i < nref; i++){
                    codbibCIT = text.substring(n1+2+i*6+i, n1+2+6+i*6+i);
                    if (codbib_array.indexOf(codbibCIT) == -1){
                        codbib_array[s] = codbibCIT;
                        s += 1
                        var refNum = codbib_array.indexOf(codbibCIT) + 1;
                        biblio = biblio + "<br \>" + refNum.toString() + ") " + author[codbib.indexOf(codbibCIT)] + ", " + title[codbib.indexOf(codbibCIT)] + ". " + place[codbib.indexOf(codbibCIT)] + ", " + year[codbib.indexOf(codbibCIT)];
                    } else {
                        var refNum = codbib_array.indexOf(codbibCIT) + 1;
                        biblio = biblio
                    }
                    ref = ref + ", " + refNum.toString();
                }
            }
            text = text.replace(text.substring(n1, n2+1), ref + ")");
        }
        return [text + "<br \>" + biblio];
    } else {
        return [text];
    }

}




// document.getElementsByTagName("body").appendChild(div);
