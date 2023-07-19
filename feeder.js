const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function etlProcess(filePath, modelName) {
  try {
    const batchSize = 100; // Number of rows to process in each batch
    let batch = []; // Array to accumulate rows for batch processing

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const transformedRow = {};

        for (const key in row) {
          if (Object.hasOwnProperty.call(row, key)) {
            transformedRow[key] = row[key];
          }
        }

        batch.push(transformedRow);

        // Check if batch size is reached
        if (batch.length === batchSize) {
          console.log('Adding batch.');
          prisma[modelName].createMany({
            data: batch,
            skipDuplicates: true,
          })
            .catch((error) => {
              console.error('Error during batch insert:', error);
            });

          // Clear batch array
          batch = [];
        }
      })
      .on('end', async () => {
        // Insert remaining rows if any
        if (batch.length > 0) {
          prisma[modelName].createMany({
            data: batch,
            skipDuplicates: true,
          })
            .catch((error) => {
              console.error('Error during final batch insert:', error);
            });
        }

        console.log('ETL process completed.');
        process.exit(0);
      });
  } catch (error) {
    console.error('Error during ETL process:', error);
    process.exit(1);
  }
}

module.exports = {
  etlProcess,
};