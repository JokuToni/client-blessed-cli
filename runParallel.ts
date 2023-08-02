import { Pool, Task, ThreadPool } from 'threads';


interface SharedState {
  [url: string]: string | null;
}


export type puppeteerOptions = {
  windowVisible: boolean,
  taskId: string,
} 

type webCrawler = (option: puppeteerOptions) => Promise<true | false>;


export const runThreads = async (instanceCount: number, options: puppeteerOptions, webCrawler: webCrawler, ) => {
  try {
    const threadPool = new ThreadPool({ size: instanceCount });
    const tasks: Task = []  
    for (let i = 0; i < instanceCount; i++) {
      tasks.push(new Task(webCrawler(options)))
    }
    const results = await threadPool.run(tasks);

    results.forEach((result) => {
      // Do something with the results if needed
    });

    threadPool.terminate();
  } catch (error) {
    console.error('Error:', error);
  }


}



const sharedState: SharedState = {};

const fetchAndStoreTitle = async (url: string) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    sharedState[url] = title;
    await page.close();
    await browser.close();
  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
    sharedState[url] = null;
  }
};

(async () => {
  try {
    const threadPool = new ThreadPool({ size: numThreads });

    const tasks = urlsToCrawl.map((url) => new Task(fetchAndStoreTitle, url));
    const results = await threadPool.run(tasks);

    results.forEach((result) => {
      // Do something with the results if needed
    });

    threadPool.terminate();
  } catch (error) {
    console.error('Error:', error);
  }
})();