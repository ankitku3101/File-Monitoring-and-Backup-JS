const fs = require('fs');
const path = './test.txt';
const backupDir = './backup'; 

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

fs.watchFile(path, (curr, prev) => {
  console.log(`File changed at: ${new Date()}`);

  fs.readFile(path, (err, data) => {
    if (err) throw err;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `${backupDir}/file-backup-${timestamp}.txt`;

    fs.writeFile(backupFileName, data, (err) => {
      if (err) throw err;
      console.log(`Backup saved as: ${backupFileName}`);
    });
  });
});

console.log(`Watching for changes in ${path}`);
