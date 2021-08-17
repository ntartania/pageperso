/*
 * logoturtle v0.1
 *
 * Copyright (c) 2009 Luc JEAN [luc.jean@gmail.com]
 * Licensed under the LGPL licenses.
 *
 */

function _fr(text){
    return text;
}

en_dict = {
    "ou":"or", "et":"and", "non":"not", "av":"fd", "re":"bk", "td":"rt", "tg":"lt",
    "mt":"st", "ct":"ht", "lc":"pu", "bc":"pd", "ve":"cs", "clos":"fence", "fen":"windows",
    "avance":"forward", "recule":"back", "tournedroite":"right", "tournegauche":"left",
    "cachetortue":"hide", "montretortue":"show", "nettoie":"clean",
    "repete":"repeat", "si":"if", "sisinon":"ifelse", "pour":"to", "fin":"end",
    "fcc":"setpc", "fcfg":"setbg", 'fcl':'setpw', 'sauve':'save', "charge":'load',
    "origine": "home", "fcap":"seth", "fpos":"setpos", "pos": "pos", "cap":"heading",
    "hasard": "random", "rc": "sqr", "echo": "echo",
    "Opérateur inconnu: ": "Unknow operation: ",
    "Erreur interne: " : "Internal error: ",
    "séquence invalide" : " is an invalid token",
    "Syntaxe invalide: [ attendu" : "Syntax error: [ expected",
    "Syntaxe invalide: ] attendu" : "Syntax error: ] expected",
    "@ est un caractère invalide": "@ is an invalid character",
    "Erreur: ce déplacement ferait sortir la tortue de son espace": "Error: this command would cause to go out of bounds",
    "Commande inconnue: ": "Unknown command: ",
    "bleu": "blue", "rose": "pink", "rouge": "red", "vert": "green", "noir": "black",
    "jaune": "yellow", "violet": "purple", "gris": "gray", "bleu-clair": "lightblue",
    "vert-clair": "lightgreen", "gris-clair": "lightgray"
};

function _en(text){
    return en_dict[text];
}

_ = _fr

//The LogoTurtle class
function LogoOper(identity, rightSon, leftSon){
    if (identity[0]=="!") {
        this.identity = identity.substr(1);    
    } else {
        this.identity = identity;    
    }
    
    this.rightSon = null;
    this.leftSon = null;
    if (arguments.length>=2){
        this.rightSon = rightSon;
    }
    if (arguments.length>=3){
        this.leftSon = leftSon;
    }
    
    this.getValue = function(){
        value = parseFloat(this.identity);
        if (!isNaN(value)){
            return value;
        }
        else if ("pi" == this.identity.toLowerCase()){
            return Math.PI;
        }
        else if ("+" == this.identity){
            return this.leftSon.getValue() + this.rightSon.getValue();
        }
        else if ("-" == this.identity){
            var leftval = this.leftSon?this.leftSon.getValue():0;
            return leftval - this.rightSon.getValue();
        }
        else if ("//" == this.identity){
            return Math.floor(this.leftSon.getValue() / this.rightSon.getValue());
        }
        else if ("/" == this.identity){
            return this.leftSon.getValue() / this.rightSon.getValue();
        }
        else if ("^" == this.identity){
            return Math.pow(this.leftSon.getValue(), this.rightSon.getValue());
        }
        else if ("*" == this.identity){
            return this.leftSon.getValue() * this.rightSon.getValue();
        }
        else if ("%" == this.identity){
            return this.leftSon.getValue() % this.rightSon.getValue();
        }
        else if (">" == this.identity){
            return this.leftSon.getValue() > this.rightSon.getValue();
        }
        else if (">=" == this.identity){
            return this.leftSon.getValue() >= this.rightSon.getValue();
        }
        else if ("<" == this.identity){
            return this.leftSon.getValue() < this.rightSon.getValue();
        }
        else if ("<=" == this.identity){
            return this.leftSon.getValue() <= this.rightSon.getValue();
        }
        else if ("=" == this.identity){
            return this.leftSon.getValue() == this.rightSon.getValue();
        }
        else if ("<>" == this.identity){
            return this.leftSon.getValue() != this.rightSon.getValue();
        }
        else if (_("et") == this.identity){
            return this.leftSon.getValue() && this.rightSon.getValue();
        }
        else if (_("ou") == this.identity){
            return this.leftSon.getValue() || this.rightSon.getValue();
        }
        else if (_("non") == this.identity){
            return !this.rightSon.getValue();
        }
        else if ("sin" == this.identity){
            return Math.sin(this.rightSon.getValue());
        }
        else if ("cos" == this.identity){
            return Math.cos(this.rightSon.getValue());
        }
        else if ("tan" == this.identity){
            return Math.tan(this.rightSon.getValue());
        }
        else if ("acos" == this.identity){
            return Math.acos(this.rightSon.getValue());
        }
        else if ("atan" == this.identity){
            return Math.atan(this.rightSon.getValue());
        }
        else if ("exp" == this.identity){
            return Math.exp(this.rightSon.getValue());
        }
        else if ("log" == this.identity){
            return Math.log(this.rightSon.getValue());
        }
        else if ("log10" == this.identity){
            return Math.log(this.rightSon.getValue())/Math.log(10);
        }
        else if (_("rc") == this.identity){
            return Math.sqrt(this.rightSon.getValue());
        }
        else if (_("hasard") == this.identity){
            return Math.floor(Math.random()*this.rightSon.getValue())
        }
        else if ("abs" == this.identity){
            return Math.abs(this.rightSon.getValue());
        }
        else {
            throw new Error(_("Opérateur inconnu: ")  + this.identity);
        }
    }
}

//The LogoTurtle class
function LogoTurtle(paper, x, y, bkg){
    this.paper = paper;
    this.name = "turtle";
    this.x = this.x0 = x;
    this.y = this.y0 = y;
    this.r = 0;
    this.pen = 1;
    this.turtle = null;
    this.graphics = this.paper.set();
    //this.commands = new Array();
    this.funcs = new Object();
    this.currentFunc = "";
    this.bkg = bkg;
    this.save_handler = null;
    this.load_handler = null;
    this.can_go_outside = false;
    
    
    this.init = function() {
        this.pen_color = 'green';
        this.pen_width = 3;
        this.isTurtleVisible = true;
    }
    this.init();

    //remove the leading space in a string 
    this.strip = function(text){
        var i = 0;
        while (text.charAt(i)==' ')
            i++;
        text = text.substr(i);
        
        i = text.length-1;
        var blanks = 0
        while (text.charAt(i)==' '){
            blanks++;
            i--;
        }
        return text.substr(0, text.length-blanks);
    }

    this.getEndBracketPos = function(code, beginPos){
        var i=beginPos+1;
        for (var level=1; i<code.length && level>0; i++){
            if (code.charAt(i)=='[')
                level++;
            if (code.charAt(i)==']')
                level--;
        }
        return i;
    }
        
    this.line = function(x1, y1, x2, y2){
        return this.paper.path("M"+x1+" "+y1+"L"+x2+" "+y2);
    }
    
    //Draw a line
    this.drawLine = function(x1, y1, x2, y2){
        if (this.pen == 1){
            this.graphics.push(this.line(x1, y1, x2, y2).attr({stroke: this.pen_color, "stroke-width": this.pen_width}));
        }
    }
    
    this.setTurtleVisible = function(visible) {
        this.isTurtleVisible = visible;
        this.drawTurtle();
    }
    
    this.drawTurtle = function(x, y, r){
        if (arguments.length==3){
            this.x = x;
            this.y = y;
            this.r = r;
        }
        
        try{
            this.turtle.remove();
        } catch(e){}
        
        if (this.isTurtleVisible) {
            this.turtle = this.paper.set();
            var size = 9+this.pen_width;
            var rad = this.r*Math.PI/180;
            var x2 = Math.round(size * Math.cos(rad));
            var y2 = Math.round(size * Math.sin(rad));
                        
            this.turtle.push(
                this.paper.circle(this.x, this.y, size).attr({"stroke-width": this.pen_width}),
                this.line(this.x, this.y, this.x+x2, this.y+y2).attr({"stroke-width": this.pen_width}));
            this.turtle.attr({stroke: this.pen_color, fill: this.pen_color, "fill-opacity": "0.5"});
        }
    }
       
    //move the turle after a forward command             
    this.can_move_to = function(x, y) {
        if (!this.can_go_outside && (x<0 || x>this.bkg.attr('width') || y<0 || y>this.bkg.attr('height'))) {
            return false;
        }
        return true;
    }
    
    this.forward = function(length){
        var rad = this.r*Math.PI/180;
        x = Math.round(this.x + length * Math.cos(rad));
        y = Math.round(this.y + length * Math.sin(rad));
        console.log("avancer à:"+x+" "+y); 
        if (!this.can_move_to(x, y)) {
            throw new Error(_("Erreur: ce déplacement ferait sortir la tortue de son espace"));
        }
        this.drawLine(this.x, this.y, x, y);
        this.drawTurtle(x, y, this.r);
    }
    
    //move the turle after a backward command             
    this.backward = function(length){
        var rad = this.r*Math.PI/180;
        x = Math.round(this.x - length * Math.cos(rad));
        y = Math.round(this.y - length * Math.sin(rad));
        if (!this.can_move_to(x, y)) {
            throw new Error(_("Erreur: ce déplacement ferait sortir la tortue de son espace"));
        }
        this.drawLine(this.x, this.y, x, y);
        this.drawTurtle(x, y, this.r);
    }
    
    //change the color of the lines             
    this.set_pen_color = function(the_color){
        if (_ != _en) {
            this.pen_color = _en(the_color) || the_color;    
        }
        this.drawTurtle(this.x, this.y, this.r);
    }
    
    this.set_pen_width = function(the_width){
        this.pen_width = parseInt(the_width, 10);
        this.drawTurtle(this.x, this.y, this.r);
    }
    
    this.set_background_color = function(the_color) {
        this.bkg.attr({'fill':the_color});
    }
    
    //rotate the turtle after a turn right command             
    this.turnRight = function(angle){
        this.r += angle;
        this.r = this.r % 360;
        this.drawTurtle();
    }
    
    //rotate the turtle after a turn left command
    this.turnLeft = function(angle){
        this.r -= angle;
        this.r = this.r % 360;
        this.drawTurtle();
    }
    
    //remove all lines in the drawing
    this.clean = function(){
        if (this.graphics){
            this.graphics.remove();
            this.graphics = this.paper.set();
        }
    }
    
    //get the command line and execute it
    this.executeCommand = function(commandLine){
        if (commandLine.length>0){
            var cmdLine = this.strip(commandLine.toLowerCase());
            //this.commands.push(cmdLine);
            next = this.doExecuteCommand(cmdLine);
            var k = 0;
            do {
                next = this.strip(next);
                if (next.length>0){
                    next = this.doExecuteCommand(next);
                } else {
                    break;
                }
                k++;
            } while(k<100);
        }
    }
    
    this.preParse = function(condition){
        var preparsedCondition = new Array();
        preparsedCondition[0] = "";
        var endPos = condition.indexOf(')');
        while (endPos>0){
            beginPos = condition.lastIndexOf('(', endPos);
            preparsedCondition.push(condition.substring(beginPos+1, endPos-1));
            condition.replace(condition.substring(beginPos, endPos), "@"+preparsedCondition.length);
            endPos = condition.indexOf(')');
        }
        preparsedCondition[0] = condition;
        return preparsedCondition;
    }
    
    this.parseString = function(str, preparsedCondition){
        this.strip(str);
        if (str.length==0)
            return null;
        
        var operators = [
            _("et"), _("ou"), _("non"), "<>", ">=", ">", "<=", "<", "=", "+", "-", "^", "//", "*", "/", "%",
            "atan", "acos", "sin", "cos", "tan", "exp", "rad", "log10", "log", "abs", _("hasard"), _("rc")
        ];
        
        for (var i=0; i<operators.length; i++){
            var pos = str.indexOf(operators[i]);
            if (pos>=0){
                var left = this.strip(str.substring(0, pos));
                var right = this.strip(str.substring(pos+operators[i].length));
                var oper = new LogoOper(operators[i]);
                oper.leftSon = this.parseString(left, preparsedCondition);
                oper.rightSon = this.parseString(right, preparsedCondition);
                return oper;
            }
        }
        
        if (str[0]=="@"){
            var i = parseInt(str.substr(1));
            if (isNaN(i)){
                throw new Error(_("Erreur interne: ")+str+_("séquence invalide"));
            } else {
                return this.parseString(preparsedCondition[i], preparsedCondition);
            }
        }
        
        return new LogoOper(str);
    }
    
    this.evaluateCode = function(condition){
        var preparsedCondition = this.preParse(condition);
        var operTree = this.parseString(preparsedCondition[0], preparsedCondition);
        return operTree.getValue();
    }
    
    this.save = function(name) {
        if (this.save_handler) {
            func = this.funcs[name];
            if (!func) {
                throw new Error(_("Commande inconnue: ")+name)        
            }
            var logo_code = _('pour')+' '+name+' '+func.funcArgs.join(' ')+'\n';
            logo_code += this.funcs[name].srcCode+'\n'+_('fin');
            this.save_handler(name, logo_code);
        }
    }
    
    this.load = function(name, end_of_command_line) {
        if (this.load_handler) {
            this.load_handler(name, end_of_command_line);
        }
    }
    
    //parse the command and execute it
    this.doExecuteCommand = function(cmdLine){
        cmdLine = this.strip(cmdLine)
        command = cmdLine.split(" ");
        
        if (this.currentFunc != "") {
            for (var i=0; i<command.length; i++) {
                if (command[i]==_("fin")) {
                    this.currentFunc = "";
                    i++;    
                    break;
                } else {
                    this.funcs[this.currentFunc].srcCode += (command[i] + " ");
                }
            }
            return this.strip(command.slice(i).join(' '));
        }    
        else if ((command[0]==_("av")) || (command[0]==_("avance"))){
            var arg = this.evaluateCode(command[1]);
            this.forward(arg);
            return this.strip(command.slice(2).join(' '));
        }
        else if ((command[0]==_("re")) || (command[0]==_("recule"))){
            var arg = this.evaluateCode(command[1]);
            this.backward(arg);
            return this.strip(command.slice(2).join(' '));
        }
        else if ((command[0]==_("td")) || (command[0]==_("tournedroite"))){
            var arg = this.evaluateCode(command[1]);
            this.turnRight(arg);
            return this.strip(command.slice(2).join(' '));
        }
        else if ((command[0]==_("tg")) || (command[0]==_("tournegauche"))){
            var arg = this.evaluateCode(command[1]);
            this.turnLeft(arg);
            return this.strip(command.slice(2).join(' '));
        }
        else if ((command[0]==_("lc")) || (command[0]==_("levecrayon"))){
            this.pen = 0;
            return this.strip(command.slice(1).join(' '));
        }
        else if ((command[0]==_("bc")) || (command[0]==_("baissecrayon"))){
            this.pen = 1;
            return this.strip(command.slice(1).join(' '));
        }
        else if ((command[0]==_("mt")) || (command[0]==_("montretortue"))){
            this.setTurtleVisible(true);
            return this.strip(command.slice(1).join(' '));
        }
        else if ((command[0]==_("ct")) || (command[0]==_("cachetortue"))){
            this.setTurtleVisible(false);
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("ve")){
            this.clean();
            this.init();
            this.drawTurtle(this.x0, this.y0, 0);
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("origine")){
            this.drawTurtle(this.x0, this.y0, 0);
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("fcap")){
            var arg = this.evaluateCode(command[1]);
            this.r = arg % 360;
            this.drawTurtle();
            return this.strip(command.slice(2).join(' '));
        }
        else if (command[0]==_("fpos")){
            var x = this.evaluateCode(command[1]);
            var y = this.evaluateCode(command[2]);
            if (!this.can_move_to(x, y)) {
                throw new Error(_("Erreur: ce déplacement ferait sortir la tortue de son espace"));
            }
            this.drawTurtle(x, y, this.r);
            return this.strip(command.slice(3).join(' '));
        }
        else if (command[0]==_("pos")){
            if (this.output) {
                this.output('('+this.x+','+this.y+')');
            }
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("cap")){
            if (this.output) {
                this.output(''+this.r+'°');
            }
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("clos")){
            this.can_go_outside = false;
            this.bkg.attr({'stroke-dasharray': ''});
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("fen")){
            this.can_go_outside = true;
            this.bkg.attr({'stroke-dasharray': '- .'});
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("echo")){
            if (this.output) {
                this.output(this.evaluateCode(command[1]));
            }
            return this.strip(command.slice(2).join(' '));
        }
        else if (command[0]==_("nettoie")){
            this.clean();
            this.drawTurtle();
            return this.strip(command.slice(1).join(' '));
        }
        else if (command[0]==_("repete")){
            var nTimes = this.evaluateCode(command[1]);
            var i = 0;
            var code = this.strip(command.slice(2).join(' '));
            if (code.charAt(i)!='[' && i<code.length){
                throw new Error(_("Syntaxe invalide: [ attendu"));
            } else {
                var j = this.getEndBracketPos(code, i+1);
                if (code.charAt(j-1)!=']'){
                    throw new Error(_("Syntaxe invalide: ] attendu"));
                } else {
                    var repeatCommand = code.substr(i+1, j-i-2);
                    for (i=0; i<nTimes; i++){
                        next = this.doExecuteCommand(repeatCommand);
                        do {
                            next = this.strip(next);
                            if (next.length>0){
                                next = this.doExecuteCommand(next);
                            } else {
                                break;
                            }
                        } while(1);
                    }
                    return this.strip(code.substr(j+1));
                }
            }
        }
        else if (command[0]==_("si")){
            var code = command.slice(1).join(' ');
            var execBeginPos = code.indexOf('[');
            var execEndPos = this.getEndBracketPos(code, execBeginPos+1);
            
            var condition = code.substring(0, execBeginPos);
            if (condition.indexOf('@')!=-1){
                throw new Error(_("@ est un caractère invalide"));
            }
            
            var instruction = code.substring(execBeginPos+1, execEndPos-1);
            
            if (this.evaluateCode(condition)){
                next = this.doExecuteCommand(instruction);
                while (next.length>0){
                    next = this.doExecuteCommand(next);
                }
            }
            return this.strip(code.substr(execEndPos+1));
        }
        else if (command[0]==_("sisinon")){
            var code = command.slice(1).join(' ');
            var execBeginPos = code.indexOf('[');
            var execEndPos = this.getEndBracketPos(code, execBeginPos+1);
            var alterBeginPos = code.indexOf('[', execEndPos+1);
            var alterEndPos = this.getEndBracketPos(code, alterBeginPos+1);
            
            var condition = code.substring(0, execBeginPos);
            if (condition.indexOf('@')!=-1){
                throw new Error(_("@ est un caractère invalide"));
            }
            
            if (this.evaluateCode(condition)){
                var instruction = code.substring(execBeginPos+1, execEndPos-1); 
            } else {
                var instruction = code.substring(alterBeginPos+1, alterEndPos-1);    
            }
            
            next = this.doExecuteCommand(instruction);
            while (next.length>0){
                next = this.doExecuteCommand(next);
            }
                
            return this.strip(code.substr(alterEndPos+1));
        } else if (command[0]==_("pour")){
            var fnname = command[1];
            this.funcs[fnname] = new Object();
            this.funcs[fnname].funcArgs = Array();
            this.funcs[fnname].srcCode = "";
            for (var i=2; i<command.length; i++){
                if (command[i].charAt(0)==":"){
                    this.funcs[fnname].funcArgs.push(command[i]);
                }
                else {
                    break;
                }
            }
            this.currentFunc = fnname;
            return this.strip(command.slice(i).join(' '));
        } else if (command[0]==_("fcc")) {
            this.set_pen_color(command[1]);
            return this.strip(command.slice(2).join(' '));
        } else if (command[0]==_("fcfg")) {
            this.set_background_color(command[1]);
            return this.strip(command.slice(2).join(' '));
        } else if (command[0]==_("fcl")) {
            this.set_pen_width(command[1]);
            return this.strip(command.slice(2).join(' '));
        } else if (command[0]==_("sauve")) {
            this.save(command[1]);
            return this.strip(command.slice(2).join(' '));
        } else if (command[0]==_("charge")) {
            var end_of_cmd_line = this.strip(command.slice(2).join(' '));
            this.load(command[1], end_of_cmd_line);
            return '';
        } else {
            try {
                var j=0;
                var srcCode = this.funcs[command[0]].srcCode;
                for (var i = 0; i<this.funcs[command[0]].funcArgs.length; i++) {
                    srcCode = this.replaceAll(srcCode, this.funcs[command[0]].funcArgs[i], this.evaluateCode(command[++j]));
                }
                return this.strip(srcCode + " " + command.slice(j+1).join(' '));
            }
            catch (e) {
                throw new Error(_("Commande inconnue: ")+command[0])    
            }
        }
    }
    
    this.replaceAll = function(s, a, b){
        while (s.indexOf(a)>=0){
            s = s.replace(a, b);    
        }
        return s;
    }
        
}
