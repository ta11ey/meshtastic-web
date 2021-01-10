import {Position} from "../../node_modules/@meshtastic/meshtasticjs/dist/protobuf";

export class MeshNode {
  nodeNumber: number
  id?: string
  longName?: string
  shortName?: string
  lastSeen: Date
  rxSnr: number
  position?: Position

}