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

    // Detect MIME type
    let contentType = mime.lookup(filePath);

    // Allow only specific types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!contentType || !allowedTypes.includes(contentType)) {
      return res.status(415).send('Unsupported file type');
    }

    // Set headers to open in browser
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${imageName}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
};


export let showGassesBill = (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join('Resources', 'gasBills', imageName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    // Detect MIME type
    let contentType = mime.lookup(filePath);

    // Allow only specific types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!contentType || !allowedTypes.includes(contentType)) {
      return res.status(415).send('Unsupported file type');
    }

    // Set headers to open in browser
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${imageName}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
};


export let showConsumablesBill = (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join('Resources', 'consumableBills', imageName);
console.log(filePath)
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err)
      return res.status(404).send('File not found');
    }

    // Detect MIME type
    let contentType = mime.lookup(filePath);

    // Allow only specific types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!contentType || !allowedTypes.includes(contentType)) {
      return res.status(415).send('Unsupported file type');
    }

    // Set headers to open in browser
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${imageName}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
};






