import { Browser, PuppeteerNode } from 'puppeteer';
import { NextResponse } from 'next/server';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import chrome from 'chrome-aws-lambda';
import { storage } from '@/app/firebase';

let puppeteer: PuppeteerNode;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}
export async function POST(req: Request) {
  const { url, user_id } = await req.json();
  console.log(url, user_id);
  if (!url) {
    return NextResponse.json({ message: 'No url provided' }, { status: 400 });
  }

  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewPort: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(url);

    // Adjust viewport and wait for any lazy-loaded content
    await page.setViewport({ width: 1200, height: 800 });

    // Find a way to timeout
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Take a screenshot
    const screenshot = await page.screenshot();

    // Close the browser
    await browser.close();

    if (screenshot) {
      const storageRef = ref(storage, `${user_id}/${url}`);

      const downloadURL = await uploadString(
        storageRef,
        screenshot.toString('base64'),
        'base64',
        {
          contentType: 'image/png',
        }
      ).then(() => {
        return getDownloadURL(storageRef);
      });

      return NextResponse.json({ downloadURL }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Error screenshotting website, ${error}` },
      { status: 400 }
    );
  }
}
