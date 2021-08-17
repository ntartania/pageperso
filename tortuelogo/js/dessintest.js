var paper = Raphael("container", 800, 600); 

Bkg = function () {

	this.truc = {fill: "#FFF", 
			stroke: "#000", 
			"stroke-width": 3,
			width: 800,
			height: 600 
			};
	this.attr = function(nom){
		return this.truc[nom];
	}

	}
var logot = new LogoTurtle(paper, 250, 300, new Bkg());

console.log(logot);
console.log(logot.bkg);
logot.executeCommand("mt");
    
function kk(){
    lolz = document.getElementById('lolz');
    lolz.value.split(/\r?\n/).forEach(v => logot.executeCommand(v)); // split lines then execute each line
    }

function clean(){
    lolz = document.getElementById('lolz');
    lolz.value="";
    logot.executeCommand("nettoie origine"); // split lines then execute each line
    }

function yadda(){
	const examples = ["tournegauche 90\navance 100\nrecule 50\ntournedroite 90\navance 50\ntournegauche 90\navance 50\nrecule 100", 
					  "tg 72\nav 100\ntd 144\nav 40\ntd 108\nav 23\nre 23\ntg 108\nav 60",
					  "tg 45\nav 141\ntd 90\nav 141\ntd 45\nav 250\ntd 90 \nav 170\ntd 90\nav 80\ntd 90\nav 30\ntd 90\nav 80\ntd 90\nav 60\ntd 90\nav 250\ntd 90\nav 200\nlevecrayon\ntd 135\nav 70\ntg 45\nbaissecrayon\nav 40\ntd 90\nav 40\ntd 90\nav 40\ntd 90\nav 40"];
	const random = Math.floor(Math.random() * examples.length);
    lolz = document.getElementById('lolz');
    lolz.value = examples[random];
    }