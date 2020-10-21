const fs = require(`fs`)
const data = require(`../data.json`)
const { timeStamp } = require("console")
const { age, date, grade } = require(`../utils`)
const { Z_DATA_ERROR } = require("zlib")



exports.index = function(req, res){    
    return res.render(`members/index`, {members: data.members})
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send(`Member not found`)


    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        birth: date(foundMember.birth).birthDay,
        grade: grade(foundMember.schoolYear)
    }

    // console.log(member)

    return res.render(`members/show`, { member })
}

exports.create = function(req, res){
	return res.render(`members/create`)
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == ``) {
            return res.send(`Preencha todos os campos`)
        }
    }

    let { avatar_url, name, birth, schoolYear, email, hours } = req.body

    birth = Date.parse(req.body.birth)
    let id = 1
    lastMember = data.members[data.members.length - 1]

    if (lastMember){
        id = lastMember.id+1
    }

    data.members.push({
        id,
        name,
        avatar_url,
        birth,
        schoolYear,
        email,
        hours,
    })

    // escrever no data
    fs.writeFile(`data.json`, JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(`Write file error`)
        }
        else {
            return res.redirect(`/members`)
        }

    })

}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send(`Member not found`)

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
        grade: grade(foundMember.schoolYear)

    }


    return res.render(`members/edit`, { member })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {
        if( id == member.id ){
            index = foundIndex
            return true
        }

    })

    if (!foundMember) return res.send(`Member not found`)

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile(`data.json`, JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send(`Write file error`)
        return res.redirect(`/members/${id}`)

    })

}

exports.delete = function (req, res) {
const { id } = req.body

const filteredMembers = data.members.filter(function(member){
    return member.id != id
})


data.members = filteredMembers

fs.writeFile(`data.json`, JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send(`Write file error`)
    return res.redirect(`/members/`)

})


}