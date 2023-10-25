
const fs =  require('fs');

const routes = (req, res) => {
    if(req.url === '/'){
        return setHomePage(req,res);
    }

    if(req.url === '/username' && req.method.toLowerCase() === 'post'){
        return submitUsername(req,res);
    }
}


function submitUsername(req,res){
    res.setHeader('Content-Type', 'text/html');
    //receive request body
    const body = [];
    req.on('data', (data) => {
        body.push(data);
    });

    req.on('end', () => {
        console.log(body);
        const requestBody = Buffer.concat(body).toString();
        const userName = requestBody.split('=')[1];
        //save it in file 
        fs.writeFile('username.txt', userName, () => {
             //redirect to home page
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
        console.log(requestBody);
    })
    
}

function setHomePage(req, res){
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
    <!<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Sahithi Sai Vanam</title>   
    </head>
    <body>
    <form action="/username" method="post">
    <div>
    <label>Enter User name:</label>
    <input type="text" name="username"/>
    </div>
    <div>
    <input type="submit" value="send"/>
    </div>
    </form>
    </body>
    </html>
    `)

}

module.exports = {
    routes,
    text: "hai Sahithi"
}