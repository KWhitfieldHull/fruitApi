//Fruit Api
require("dotenv").config

const cors = require("cors")
const fruits = require("./fruits.json")
const express = require("express")
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Hello Fruit API")
})

const getFruitIndex = name => {
    //take in a lowercase fruit name and return index of the fruit in the supporting file
    //or -1 if nothing

    return fruits.findIndex((name) => fruit.name.toLowerCase() == name)
}

app.get('/fruits', (req, res) => {
    res.send(fruits)
})
app.delete("/fruits/:name", (req, res) => {

    const fi = getFruitIndex(req.params.name.toLowerCase())

    if (fi == -1) {
        //fruit cant be found, can't delete it
        res.status(404).send("Fruit cant be found")
    } else {
        fruits.splice(fi, 1)
        res.status(204).send("Deleted")
    }
})

app.get('/fruits/:name', (req, res) => {
    //res.send(`Return a fruit with ${req.params.name} name`)
    const name = req.params.name.toLowerCase()
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        //no fruit
        res.status(404).send("This fruit doesn't exist!")
    } else {
        //fruit
        res.send(fruit)
    }
})

app.post("/fruits", (req, res) => {
    const fi = getFruitIndex(req.body.name.toLowerCase())

    if (fi > -1) {
        res.status(409).send("The fruit already exists")
    } else {

        const ids = fruits.map((fruit) => fruit.id)

        let maxId = Math.max(...ids)
        maxId++

        req.body.id = maxId




        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})