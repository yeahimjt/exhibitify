import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { storage } from '@/app/firebase';

export async function POST(req: Request) {
  const { url, user_id } = await req.json();

  if (!url) {
    return NextResponse.json({ message: 'No url provided' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
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
    console.log(screenshot);
    console.log(user_id);
    if (screenshot) {
      console.log('inside');
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
      console.log(downloadURL);

      return NextResponse.json({ downloadURL }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Error screenshotting website, ${error}` },
      { status: 400 }
    );
  }
}
