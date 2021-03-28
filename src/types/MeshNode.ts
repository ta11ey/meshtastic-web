import {Position} from "@meshtastic/meshtasticjs/dist/protobufs";

export class MeshNode {
  nodeNumber: number
  id?: string
  longName?: string
  shortName?: string
  lastSeen: Date
  rxSnr: number
  position?: Position

}
