const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
// tested out example
// const themainHtml = fs.readFileSync("templates/main.html", 'utf8',function(err){throw err});
// const endingHtml = fs.readFileSync("templates/manager.html", 'utf8',function(err){throw err});
// const wwww = endingHtml.repeat(5);
// const res = themainHtml.replace("placeholder", wwww);
// console.log(res);
// fs.writeFile("index.html", res, function(err){if(err) throw err});
const ids = [];
async function running (){
    managerPrompt();
}
async function managerPrompt(){
    const managerName = await inquirer.prompt({
            type : "input",
            name: "name",
            message: "what is your managers name?"
        });
    const managerId = await inquirer.prompt({
            type: "input",
            name: "id",
            message: "what is your managers id?",
            validate: function(value){
                if (isNaN(value)){
                    return "please enter a number";
                }
                return true;
            }
        });
        ids.push(managerId.id);
    const managerEmail = await inquirer.prompt({
            type: "input",
            name: "email",
            message: "what is your managers email?",
            validate : function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(String(email).toLowerCase())){
                    return true;
                }
                return "Please enter a valid email";
            }
        });
    const managerOfficeNum = await inquirer.prompt({
            type: "input",
            name: "office",
            message: "what is your managers office number?"
        }); 
        addAnotherMember();
}

async function internPrompt(){
    const internName = await inquirer.prompt({
            type : "input",
            name: "name",
            message: "what is your Intern name?"
        });
    const internId = await inquirer.prompt({
            type: "input",
            name: "id",
            message: "what is your Intern id?",
            validate: function(value){
                if (isNaN(value)){
                    return "please enter a number";
                }
                if(ids.includes(value)){
                    return "This id is in use, please enter another one";
                }
                return true;
            }
        });
        ids.push(internId.id);
    const internEmail = await inquirer.prompt({
            type: "input",
            name: "email",
            message: "what is your Intern email?",
            validate : function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(String(email).toLowerCase())){
                    return true;
                }
                return "Please enter a valid email";
            }
        });
    const internOfficeNum = await inquirer.prompt({
            type: "number",
            name: "school",
            message: "what is your Intern school name?"
        }); 
        addAnotherMember();
}

async function engineerPrompt(){
    const engineerName = await inquirer.prompt({
            type : "input",
            name: "name",
            message: "what is your engineer's name?"
        });
    const engineerId = await inquirer.prompt({
            type: "input",
            name: "id",
            message: "what is your engineer's id?",
            validate: function(value){

                if (isNaN(value)){
                    return "please enter a number";
                }
                if(ids.includes(value)){
                    return "This id is in use, please enter another one";
                }
                return true;
            }
        });
    ids.push(engineerId.id);
    const engineerEmail = await inquirer.prompt({
            type: "input",
            name: "email",
            message: "what is your engineer's email?",
            validate : function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(String(email).toLowerCase())){
                    return true;
                }
                return "Please enter a valid email";
            }
        });
    const engineerOfficeNum = await inquirer.prompt({
            type: "number",
            name: "github",
            message: "what is your engineer's github username?"
        }); 
        addAnotherMember();
}

async function addAnotherMember(){
    inquirer.prompt({
        type : "list",
        name: "member",
        message : "which type of team member do you want to add?",
        choices : ["Intern", "Engineer", "I dont want to add more team members"]
    }).then(function({member}){
        if(member === "Intern"){
            internPrompt();
        }
        else if(member === "Engineer"){
            engineerPrompt();
        }
        else{

        }
    });
}
running();