import puppeteer, { Browser } from "puppeteer";
export default function page() {
  async function openWa() {
    console.log("Opening a browser window, please scan / login on Whatsapp");
    console.log("Once you're logged in, you can close the page or tab");
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./profileData",
    });
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com");
    browser.on("targetdestroyed", async () => {
      console.log("Page Closed. If logged in you can use the check command");
      browser.close();
    });
  }

  // openWa()

  async function checkNumber(phoneNumber: any) {
    const browser: Browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./profileData",
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    ); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue

    let numberExists = false;

    try {
      await page.goto(
        `https://web.whatsapp.com/send?phone=${phoneNumber}&text&app_absent=0`,
        { waitUntil: "networkidle0" }
      );
      await page.waitForNavigation({
        waitUntil: "networkidle2",
      });

      if ((await page.$("#main")) !== null) numberExists = true;
      await browser.close();

    } catch (e) {
      console.log(e);
      await browser.close();
    }
    console.log(numberExists);
    return numberExists;
  }

  checkNumber("6282361564525");
  return (
    <main>
      <div>Home</div>
    </main>
  );
}
