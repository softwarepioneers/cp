/*
control panel
*/

const fs = require("fs");
const Handlebars = require("handlebars");
// we need this to execute the code command line
const exec = require('child_process').exec;
// we get the componenet name from the command line, the first value is "node", the second is the
// file path, the rest of the values are the arguments
let component = process.argv[2];

// first we read the template file content
fs.readFile( "./components/template.html", 'utf8', function( err, source ) {
    if ( err ) return console.error(err);
    const content = source.replace(/COMPONENT_NAME/g, component);

    // if we have another compoenets with the same name we throw an error, we don't want to override
    // the other file. also you will notice the first argument of console is '\x1b[31m%s\x1b[0m'
    // this is done so we can change the command line output color, it's made of three parts
    // \x1b[31m will change it to red
    // %s will output the string that we have in the second argument
    // \x1b[0m will return the color to the default color
    if (fs.existsSync(`./components/${component}.html`)) {
        return console.error('\x1b[31m%s\x1b[0m',`${component}.html already exist, use another name`);
    }
    // we create the file and write the content to it
    fs.writeFile( `./components/${component}.html`, content, function( err ) {
        if ( err ) {
            return console.error(`there is a problem in creating ${component} compoenet, error is:\n ${err}`);
        } else {
            fs.writeFile( `./assets/sass/components/${component}.scss`, '', function( err ) {
                if ( err ) {
                    return console.error(err);
                } else {
                    console.log('\x1b[32m%s\x1b[0m',`${component}.scss was created!`);
                }
            } )
            // \x1b[32m is for green
            console.log('\x1b[32m%s\x1b[0m',`${component}.html was created!`);
            
            const command = process.platform == 'win32' ? 'start' : 'open';

            exec(`${command} http://localhost:8080/components/${component}.html`, function(err) {
                if (err) return console.error(err)
            })
            // this step will work if you have visual studio code editor and the cli package
            // you can install the pacakge from View->Command Palette->Shell command: install "code" command in path
            // we open our new file, -r is so it opens in the same window, -g and :14:13 is for it to go to line 14 column 13
             exec(`code -r .assets/components/${component}.scss`, function(err) {
                if (err) return console.error(err)
            })
            exec(`code -r -g ./components/${component}.html:14:13`, function(err) {
                if (err) return console.error(err)
            })
        }
    } )
} )

