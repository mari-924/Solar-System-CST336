import { name } from 'ejs';
import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;

const date = new Date();
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let url = 'https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontalLinks to an external site.'
    let response = await fetch(url);
    let data = await response.json();

    let random_index = Math.floor(Math.random()*45);
    res.render('home', {
        random:data.hits[random_index].largeImageURL
    });
});

app.get('/selectSpaceObject', async(req, res) =>{
    let object = req.query.object;
    let object_info;

    if(object == 'Comets'){
        object_info = planets.getComets();
        res.render('comet',{
            object: object_info,
            name:object
        })
    }else if(object == 'Meteorites'){
        object_info = planets.getMeteorite();
        res.render('meteorites',{
            object: object_info,
            name: object
        })
    }
    
});

app.get('/mercury', (req, res) => {
    let mercury_info = planets.getMercury();
    res.render('mercury', {
        mercury:mercury_info
    });
});

app.get('/venus', (req, res) => {
    let venus_info = planets.getVenus();
    res.render('venus', {
        venus:venus_info
    });
});

app.get('/earth', (req, res) => {
    let earth_info = planets.getEarth();
    res.render('earth', {
        earth:earth_info
    });
});

app.get('/mars', (req, res) => {
    let mars_info = planets.getMars();
    res.render('mars', {
        mars:mars_info
    });
});

app.get('/jupiter', (req, res) => {
    let jupiter_info = planets.getJupiter();
    res.render('jupiter', {
        jupiter:jupiter_info
    });
});

app.get('/saturn', (req, res) => {
    let saturn_info = planets.getSaturn();
    res.render('saturn', {
        saturn:saturn_info
    });
});

app.get('/uranus', (req, res) => {
    let uranus_info = planets.getUranus();
    res.render('uranus', {
        uranus:uranus_info
    });
});

app.get('/neptune', (req, res) => {
    let neptune_info = planets.getNeptune();
    res.render('neptune', {
        neptune:neptune_info
    });
});

app.get('/nasa', async (req, res) => {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day =date.getDate();

    let curr = year + "-" + month + "-" + day;

    let url = 'https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=' + curr;
    let response = await fetch(url);
    let data = await response.json();
    res.render('nasa', {
        nasa:data
    });
});

app.get('/nasaCustom', async (req, res)=> {
    let day = req.query.day;
    let month = req.query.month;
    let year = req.query.year;

    let input = year + "-" + month + "-" + day;
    
    let url = 'https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=' + input;
    let response = await fetch(url);
    let data = await response.json();
    res.render('nasa', {
        nasa:data
    });
})

app.listen(3000, () => {
   console.log('server started');
});
