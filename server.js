const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcryptjs = require('bcryptjs')
const cors = require('cors')

const Company = require('./models/Company')
const Stock = require('./models/Stock')
const User = require('./models/User')

const app = express()


// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const dbURI = 'mongodb+srv://flipr:flipr%40hackathon@cluster0.dkyw7jy.mongodb.net/?retryWrites=true&w=majority'


const port = process.env.PORT || 9999
mongoose.connect(dbURI, { useNewUrlParser: true })
        .then(app.listen(port, (err) => {
                console.log(`http://localhost:${port}/`)
        }))
        .catch((err) => console.log(err))


app.post('/signupapi', async (req, res) => {

        const { name, email, password, confirmpassword } = req.body

        let user = await User.findOne({ email }).lean()

        if (user) {
                console.log('user already exists')
                return res.json({ msg: "err" })
        }

        try {
                user = await User.create({ email, name, password })
                return res.json({ msg: '' })
        } catch (error) {
                console.log(error.message)
                return res.json({ msg: 'err' })
        }

})


app.post('/loginapi', async (req, res) => {

        const email = req.body.email
        const password = req.body.password
        console.log(email)

        await User.findOne({ "email": email })
                .then(result => {
                        if (result == null) {
                                res.json({ msg: "Invalid Credentials" })
                        }
                        else {
                                if (bcryptjs.compare(result.password, password)) {
                                        res.json({
                                                isLogged: true
                                        })
                                }
                                else {
                                        res.json({
                                                isLogged: false
                                        })
                                }
                        }
                })
                .catch(err => {
                        console.log(err)
                })

})


app.post('/stocks/:stocktype', async (req, res) => {
        await Stock.find({ StockType: req.params.stocktype })
                .then(result => {
                        if (result == null) {
                                res.send("Invalid Stock")
                        }
                        else {
                                let stockVolumeSum = 0
                                let open = 0
                                let close = 0
                                let high = 0
                                let low = 0

                                result.forEach(stock => {
                                        stockVolumeSum += stock.Volume
                                        open += stock.Open
                                        close += stock.Close
                                        high += stock.High
                                        low += stock.Low
                                })


                                res.json({
                                        volume: (stockVolumeSum / result.length).toFixed(2),
                                        open: (open * result.length).toFixed(2),
                                        close: (close * result.length).toFixed(2),
                                        high: (high * result.length).toFixed(2),
                                        low: (low * result.length).toFixed(2),
                                        weeklow: (low).toFixed(2),
                                        weekhigh: (high).toFixed(2)
                                })
                        }
                })
                .catch(err => res.json('err'))
})


app.get('/companies/:companyName', async (req, res) => {
        await Company.find({ CompanyName: req.params.companyName })
                .then(result => {
                        if (result == null) {
                                res.send("Invalid Company")
                        }
                        else {
                                res.json(result)
                        }
                })
                .catch(err => console.log(err))
})