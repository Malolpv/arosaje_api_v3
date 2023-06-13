const {findAdviceById,updateAdvice ,deleteAdviceById} = require('../services/advice')


exports.getAdvice = async (req,res) => {
    try {
        const id = req.params.id
        const advice = await findAdviceById(id)
        if(advice == null) return res.status(404).send("Not found")
        res.status(200).json(advice)
    }catch(error){
        res.status(500).send(error)
    }
    
}

exports.patchAdvice = async (req,res) => {
    try {
        const advice_id = req.params.id
        const {content} = req.body
        
        const advice = findAdviceById(advice_id)

        if(advice == null) return res.status(404).send('Not found')

        advice.content = content || advice.content

        await updateAdvice(advice_id, advice)

        res.status(200).send(advice)
    }catch(error){
        res.status(500).send(error)
    }
}

exports.deleteAdvice = async (req,res) => {
    try{
        const id_advice = req.params.id
        const nb_rows = await deleteAdviceById(id_advice)
        if(nb_rows <= 0) res.status(404).send("Not found")
        res.status(200).send()
    }catch(error){
        res.status(500).send(error)
    }
}