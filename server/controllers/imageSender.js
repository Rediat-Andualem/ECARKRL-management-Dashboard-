import fs from 'fs'

export let showChemicalBills=(req,res)=>{
    const {imageName}=req.params

    fs.readFile(`Resources/chemicalBills/${imageName}`,(err,data)=>{
        if(err){
            res.status(404).send('File not found')
        }else{
              res.send(data)
        }
    })
}

export let showGassesBill=(req,res)=>{
    const {imageName}=req.params

    fs.readFile(`Resources/consumables/${imageName}`,(err,data)=>{
        if(err){
            res.status(404).send('File not found')
        }else{
              res.send(data)
        }
    })
}

export let showConsumablesBill=(req,res)=>{
    const {imageName}=req.params

    fs.readFile(`Resources/gasBills/${imageName}`,(err,data)=>{
        if(err){
            res.status(404).send('File not found')
        }else{
              res.send(data)
        }
    })
}

