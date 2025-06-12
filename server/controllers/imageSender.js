import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

export let showChemicalBills = (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join('Resources', 'chemicalBills', imageName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    // Detect MIME type from file extension
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${imageName}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
};


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

