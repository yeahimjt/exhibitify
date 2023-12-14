import chromium from 'chrome-aws-lambda';
import { NextResponse } from 'next/server';
async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    const puppeteer = require('puppeteer');
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

export async function POST(req) {
  const url = req.body.url;

  // Perform URL validation
  if (!url || !url.trim()) {
    NextResponse.json({
      status: 'error',
      error: 'Enter a valid URL',
    });

    return;
  }

  let browser = null;

  try {
    browser = await getBrowserInstance();
    let page = await browser.newPage();
    await page.goto(url);
    const imageBuffer = await page.screenshot();

    if (imageBuffer) {
      const storageRef = ref(storage, `${user_id}/${url}`);

      const downloadURL = await uploadString(
        storageRef,
        imageBuffer.toString('base64'),
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
    NextResponse.json({
      status: 'error',
      error: `something went wrong ${error}`,
    });
    // return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
