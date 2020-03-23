let ejs = require('ejs');
let express = require('express');
let app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("home");
});

app.listen(3000, function (erro) {
    if (erro) {
        console.log('Houve um erro na inicialização');
    } else {
        console.log('Não houve nenhum erro na inicizalização');
    }
});

