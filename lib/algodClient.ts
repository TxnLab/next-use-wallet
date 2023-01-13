import algosdk from 'algosdk'
import { NODE_PORT, NODE_TOKEN, NODE_URL } from 'constants/env'

const algodClient = new algosdk.Algodv2(NODE_TOKEN, NODE_URL, NODE_PORT)

export default algodClient
