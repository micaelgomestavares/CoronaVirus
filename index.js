let express = require('express'); // Importando o EXPRESS
let app = express(); // Instanciando/Iniciando o EXPRESS


app.set('view engine', 'ejs'); // Dizendo que é para o express usar o EJS como view engine.
app.use(express.static('public')); // Dizendo ao backcend quais são os arquivos estáticos

app.get("/", function (req, res) {
    res.render("home");
});

app.listen(8181, function (erro) {
    if (erro) {
        console.log('Houve um erro na inicialização');
    } else {
        console.log('Não houve nenhum erro na inicizalização');
    }
});

