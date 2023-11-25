import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body)
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  ); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue
  let numberExists = false;
  try {
    await page.goto(
      `https://web.whatsapp.com/send?phone=${body}&text&app_absent=0`,
      { waitUntil: "networkidle0" }
    );

    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });

    await new Promise((r) => setTimeout(r, 1000)); // Wait for page load - added for cases where networkidle doesn't

    if ((await page.$("#main")) !== null) {
      numberExists = true;
    }
    await browser.close();
  } catch (e) {
    console.log(e);
    await browser.close();
  }

  const indexedDB = await page.evaluate(async () => {
    const result: Record<string, Record<string, any[]>> = {};
    const databases: any = await window.indexedDB.databases();
  
    const connect = (database: { name: string, version: number }) => new Promise<IDBDatabase>((resolve, _) => {
      const request = window.indexedDB.open(database.name, database.version);
      request.onsuccess = _ => resolve(request.result as IDBDatabase);
    });
  
    const getAll = (db: IDBDatabase, objectStoreName: string) => new Promise<any[]>((resolve, _) => {
      const request = db.transaction([objectStoreName]).objectStore(objectStoreName).getAll();
      request.onsuccess = _ => resolve(request.result);
    });
  
    for (let i = 0; i < databases.length; i++) {
      const db = await connect(databases[i]);
      const dbName = db.name;
      result[dbName] = {};
      for (let j = 0; j < db.objectStoreNames.length; j++) {
        const objectStoreName = db.objectStoreNames[j];
        result[dbName][objectStoreName] = [];
        const values = await getAll(db, objectStoreName);
        result[dbName][objectStoreName] = values;
      }
    }
  
    return result;
  });

  return Response.json({ numberExists });
}
