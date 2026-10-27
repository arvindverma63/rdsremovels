import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

OUTPUT_DIR = Path(r"d:\laravel\rdsremoves mockup\screenshots")
OUTPUT_DIR.mkdir(exist_ok=True)

async def test_hero():
    async with async_playwright() as p:
        # Launch headless Firefox
        browser = await p.firefox.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        # Listen to any console errors
        page.on("console", lambda msg: print(f"BROWSER CONSOLE [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        print("Navigating to http://localhost:8088/ ...")
        await page.goto("http://localhost:8088/", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # 1. Slide 0: Full Removals
        print("Taking screenshot of Slide 0...")
        await page.screenshot(path=str(OUTPUT_DIR / "hero_slide_0.png"))

        # 2. Click Slide 1: Home Moves
        print("Clicking Slide 1 indicator...")
        await page.click('.indicator[data-index="1"]')
        await page.wait_for_timeout(800)
        await page.screenshot(path=str(OUTPUT_DIR / "hero_slide_1.png"))

        # 3. Click Slide 2: Storage
        print("Clicking Slide 2 indicator...")
        await page.click('.indicator[data-index="2"]')
        await page.wait_for_timeout(800)
        await page.screenshot(path=str(OUTPUT_DIR / "hero_slide_2.png"))

        # 4. Click Next button -> Slide 3: Commercial
        print("Clicking Next arrow...")
        await page.click('#hero-next-btn')
        await page.wait_for_timeout(800)
        await page.screenshot(path=str(OUTPUT_DIR / "hero_slide_3.png"))

        # 5. Mobile viewport test (390x844)
        print("Testing mobile viewport...")
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(500)
        await page.screenshot(path=str(OUTPUT_DIR / "hero_mobile.png"))

        # 6. Tablet viewport test (1024x768)
        print("Testing tablet viewport...")
        await page.set_viewport_size({"width": 1024, "height": 768})
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(500)
        await page.screenshot(path=str(OUTPUT_DIR / "hero_tablet.png"))

        # Check horizontal overflow
        has_overflow = await page.evaluate("document.documentElement.scrollWidth > window.innerWidth")
        print(f"Has horizontal overflow at 1024px: {has_overflow}")

        await browser.close()
        print("All tests completed successfully!")

if __name__ == "__main__":
    asyncio.run(test_hero())
