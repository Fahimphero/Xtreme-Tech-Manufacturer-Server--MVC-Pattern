let parts = [
    { id: 1, name: 'Hammer1' },
    { id: 2, name: 'Hammer2' },
    { id: 3, name: 'Hammer3' },
    { id: 4, name: 'Hammer4' }
]



module.exports.getAllPart = (req, res, next) => {

    const { ip, query, params, body, headers } = req;

    // console.log(ip, query, params, body, headers)

    // res.download(__dirname + "/part.controller.js")

    // res.json({
    //     "name": "abc"
    // })

    // res.redirect("/login")
    // res.send("Part Found")

    const { limit, page } = req.query;
    console.log(limit, page);

    res.json(parts)
}


module.exports.saveAllPart = (req, res) => {
    console.log(req.body)
    parts.push(req.body)
    res.send(parts)
}


module.exports.getPartDetail = (req, res) => {
    const { id } = req.params;
    console.log(id)
    // const filter = { _id: id }
    const foundPart = parts.find(part => part.id == id)
    res.status(200).send({
        success: true,
        message: "Success",
        data: foundPart
    })

    // res.status(500).send({
    //     success: false,
    //     error: "Internal server error"
    // })
}


module.exports.updatePart = (req, res) => {
    const { id } = req.params;
    // const newData = req.body;
    const filter = { _id: id }

    const newData = parts.find(part => part.id == id)

    newData.id = id;
    newData.name = req.body.name;
    res.send(newData)

}


module.exports.deletePart = (req, res) => {
    const { id } = req.params;
    const filter = { _id: id }

    parts = parts.filter(part => part.id !== Number(id))

    res.send(parts)


}
