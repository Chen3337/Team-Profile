const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
// fs.writeFile("index.html", res, function(err){if(err) throw err});
const ids = [];
const allEngineersInfos = [];
const allInternsInfos = [];
let manager;
let resultHtml;
// this makes the my-team.html file with all the informations
function makeHtmlFile(){
    let mainHtml = fs.readFileSync("./templates/main.html", "UTF-8", function(err) {if(err) throw err});
    const finalHtml = mainHtml.replace("{placeholder}", resultHtml);
    fs.writeFileSync("my-team.html", finalHtml, function(err) {if(err) throw err});
}
// this is the manager questions
async function managerPrompt(){
    const managerQuestions = await inquirer.prompt([
        {
            type : "input",
            name: "name",
            message: "what is your managers name?"
        },
        {
            type: "input",
            name: "id",
            message: "what is your managers id?",
            validate: function(value){
                if (isNaN(value)){
                    return "please enter a number";
                }
                ids.push(value);
                return true;
            }
        },
        {
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
        },
        {
            type: "input",
            name: "office",
            message: "what is your managers office number?"
        }
    ]); 
    manager = new Manager(managerQuestions.name, managerQuestions.id, managerQuestions.email, managerQuestions.office);
        addAnotherMember();
}
// this is the intern questions
async function internPrompt(){
    const internQuestions = await inquirer.prompt([
        {
            type : "input",
            name: "name",
            message: "what is your Intern name?"
        },
        {
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
                ids.push(value);
                return true;
            }
        },
        {
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
        },
        {
        type: "input",
            name: "school",
            message: "what is your Intern school name?"
        }
    ]);
    const newStudent = new Intern(internQuestions.name, internQuestions.id, internQuestions.email, internQuestions.school);
    allInternsInfos.push(newStudent);
        addAnotherMember();
}
// this is the engineer questions
async function engineerPrompt(){
    const engineerQuestions = await inquirer.prompt([
        {
            type : "input",
            name: "name",
            message: "what is your engineer's name?"
        },
        {
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
                ids.push(value);
                return true;
            }
        },
        {
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
        },
        {
            type: "input",
            name: "github",
            message: "what is your engineer's github username?"
        }
    ]);
    const newEngineer = new Engineer(engineerQuestions.name, engineerQuestions.id, engineerQuestions.email, engineerQuestions.github);
    allEngineersInfos.push(newEngineer);
        addAnotherMember();
}
// Ask if there is more members
function addAnotherMember(){
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
            makeManagerHtml();
            makeInternHtmls();
            makeEngineerHtmls();
            makeHtmlFile();
        }
    });
}

// manager card htmls use the information from above
async function makeManagerHtml(){
    const managerHtml = fs.readFileSync("./templates/manager.html", "UTF-8", function(err){if(err) throw err});
    let newHtml = managerHtml.replace("{name}", manager.name);
    newHtml = newHtml.replace("{idNumber}", manager.id);
    newHtml = newHtml.replace("{email}", manager.email);
    newHtml = newHtml.replace("{officeNumber}", manager.officeNumber);
    resultHtml = newHtml;
}
// intern card htmls use the information above
async function makeInternHtmls(){
    for(var i = 0; i < allInternsInfos.length; i++){
    const internHtml = fs.readFileSync("./templates/intern.html", "UTF-8", function(err){if(err) throw err});
    let newHtml = internHtml.replace("{name}", allInternsInfos[i].name);
    newHtml = newHtml.replace("{idNumber}", allInternsInfos[i].id);
    newHtml = newHtml.replace("{email}", allInternsInfos[i].email);
    newHtml = newHtml.replace("{school}", allInternsInfos[i].school);
    resultHtml = resultHtml + newHtml;
    }
}
// make  engineer cards htmls use the information above
async function makeEngineerHtmls(){
    for(var i = 0; i < allEngineersInfos.length; i++){
        const engineerHtml = fs.readFileSync("./templates/engineer.html", "UTF-8", function(err){if(err) throw err});
        let newHtml = engineerHtml.replace("{name}", allEngineersInfos[i].name);
        newHtml = newHtml.replace("{idNumber}", allEngineersInfos[i].id);
        newHtml = newHtml.replace("{email}", allEngineersInfos[i].email);
        newHtml = newHtml.replace("{github}", allEngineersInfos[i].github);
        newHtml = newHtml.replace("{Chen3337}", allEngineersInfos[i].github);
        resultHtml = resultHtml + newHtml;
        }
}
managerPrompt();