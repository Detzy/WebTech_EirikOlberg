import {LevelDB} from './leveldb'
import WriteStream from 'level-ws'

export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

// Old handler from lab 2
// export class MetricsHandler {
//   static get(callback: (error: Error | null, result?: Metric[]) => void) {
//     const result = [
//       new Metric('2013-11-04 14:00 UTC', 12),
//       new Metric('2013-11-04 14:30 UTC', 15)
//     ]
//     callback(null, result)
//   }
// }


// New handler from lab 3
export class MetricsHandler {
    private db: any

    constructor(dbPath: string) {
        this.db = LevelDB.open(dbPath)
    }

    public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
        const stream = WriteStream(this.db)
        stream.on('error', callback)
        stream.on('close', callback)
        metrics.forEach((m: Metric) => {
            stream.write({ key: `metric:${key}${m.timestamp}`, value: m.value })
        })
        stream.end()
      }

    public getAll(callback: (error: Error | null, result: any) => void) {
        let metrics: Metric[] = []
        const stream = this.db.createReadStream()
            .on('data', function (data) {
                console.log(data.key, '=', data.value)
                let timestamp: string = data.key.split(':')[1]
                let metric: Metric = new Metric(timestamp, data.value)
                metrics.push(metric)
            })
            .on('error', function (err) {
                callback;
            })
            .on('close', function () {
                console.log('Stream closed')
            })
            .on('end', function () {
                callback(null, metrics)
                console.log('Stream ended')
            })
    }

    public delete(key: number, callback: (error: Error | null) => void){
        let err = this.db.del(key, (err) => {
            if (err){
                console.log('Oh my!', err)
                return callback(err)
            }
        })
        callback(err)
    }

    public getOne(key: number, callback: (error: Error | null, result: any) => void){
        let returnData = this.db.db.get(key, function (err, value) {
            if (err) {
                if (err.notFound) {
                    return callback(err, null)
                }
                return callback(err, null)
            }
            callback(null, value)
        })
    }
}
