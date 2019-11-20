const employee = require("./Employee");
class Engineer extends employee{
    constructor(name, id, email, username){
        super(name, id, email);
        this.github = username;
    }
    getRole(){
        return "Engineer";
    }
    getGithub(){
        return this.github;
    }
}




module.exports = Engineer;