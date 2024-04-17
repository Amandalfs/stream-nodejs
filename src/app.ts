import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/ler', async (req: Request, res: Response) => {
    const filePath = path.join(__dirname, 'grandedados.txt');
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Arquivo não encontrado.');
    }

    res.setHeader('Content-Type','text/plain');

    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res);

    readStream.on('error', (err) => {
        res.status(500).send(`Erro ao ler o arquivo: ${err.message}`);
    });
});

app.post('/escrita', async (req, res)=> {
    const stream = fs.createWriteStream('./bigfile.txt');
    const maxLines = 1e6 // 1 milhão

    for(let start = 0; start<= maxLines; start++) {
        stream.write(`
            lorem lorem lorem loren loren 
            lorem lorem lorem loren lorenlorem lorem 
            lorem loren lorenlorem lorem lorem loren
            lorenlorem lorem lorem loren lorenlorem 
            lorem lorem loren lorenlorem lorem lorem
            loren lorenlorem lorem lorem loren loren
            lorem lorem lorem loren lorenlorem lorem 
            lorem loren loren 
        \n`);
    }

    stream.end();
    return res.status(201).json("success")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
