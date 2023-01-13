import { promises as fs } from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  version: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const filePath = path.join(process.cwd(), 'package.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const parsedJson = JSON.parse(jsonData)

  if (!parsedJson || !parsedJson.dependencies || !parsedJson.dependencies['@txnlab/use-wallet']) {
    throw 'Error: @txnlab/use-wallet not found in package.json'
  }

  const version = parsedJson.dependencies['@txnlab/use-wallet']

  res.status(200).send({ version })
}
