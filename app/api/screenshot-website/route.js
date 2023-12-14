import puppeteer, { Browser, PuppeteerNode } from 'puppeteer';
import { NextResponse } from 'next/server';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { storage } from '@/app/firebase';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export async function POST(req) {
  const { url, user_id } = await req.json();

  if (!url) {
    return NextResponse.json({ message: 'No url provided' }, { status: 400 });
  }

  let browser = null;

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.NEXT_PRIVATE_BLESS_KEY}`,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Adjust viewport and wait for any lazy-loaded content
    await page.setViewport({ width: 1200, height: 800 });

    // Take a screenshot
    await new Promise((resolve) => setTimeout(() => resolve(''), 3000));

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
    console.log(error);
    return NextResponse.json(
      { message: `Error screenshotting website, ${error}` },
      { status: 400 }
    );
  }
}
