import { spawn, Pool, Worker } from "threads"
import * as blessed from 'blessed'

interface SharedState {
  [url: string]: string | null;
}


export type puppeteerOptions = {
  windowVisible: boolean,
  taskId: string,





  LogsBox: 



} 

type webCrawler = (option: puppeteerOptions) => null

export const runThreads = async (instanceCount: number, options: puppeteerOptions, webCrawler: webCrawler, ) => {
  try {
    const pool = Pool(() => spawn(new Worker("./workers/multiplier")), instanceCount)
    
    for (let i = 0; i < instanceCount; i++) {
      pool.queue(webCrawler(options))
    }

    return pool.terminate;
  } catch (error) {
    console.error('Error:', error);
  }
}