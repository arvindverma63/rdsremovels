"""
Headless Firefox screenshots of RDS Removals mockup using Playwright
"""
import asyncio
import sys
from pathlib import Path

OUTPUT_DIR = Path(r"d:\laravel\rdsremoves mockup\screenshots")
OUTPUT_DIR.mkdir(exist_ok=True)

async def take_screenshots():
    from playwright.async_api import async_playwright

    async with async_playwright() as p:
        # Launch Firefox headless
        browser = await p.firefox.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900}
        )
        page = await context.new_page()

        print("Opening page...")
        await page.goto("http://localhost:8088/", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # 1. Full page screenshot
        print("Full page screenshot...")
        await page.screenshot(
            path=str(OUTPUT_DIR / "01_full_page.png"),
            full_page=True
        )

        # 2. Hero section
        print("Hero section...")
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "02_hero.png"))

        # 3. Stats + Services start
        print("Stats banner...")
        await page.evaluate("window.scrollTo(0, 750)")
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "03_stats.png"))

        # 4. Services grid
        print("Services grid...")
        await page.evaluate("window.scrollTo(0, 1100)")
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "04_services.png"))

        # 5. Services lower cards
        await page.evaluate("window.scrollTo(0, 1900)")
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "05_services_lower.png"))

        # 6. Cost estimator
        print("Cost estimator...")
        estimator = page.locator("#calculator-section")
        await estimator.scroll_into_view_if_needed()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "06_estimator.png"))

        # Move bedroom slider to 4
        slider = page.locator("#calc-bedrooms")
        await slider.evaluate("el => { el.value = 4; el.dispatchEvent(new Event('input')); }")
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "07_estimator_4bed.png"))
        print("Estimator 4-bed updated")

        # 7. Why Choose Us
        print("Why Choose Us...")
        why = page.locator("#why-choose-us")
        await why.scroll_into_view_if_needed()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "08_why_us.png"))

        # 8. Process steps
        print("Process steps...")
        process = page.locator(".process-section")
        await process.scroll_into_view_if_needed()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "09_process.png"))

        # 9. Locations with chip click
        print("Locations section...")
        locations = page.locator("#locations")
        await locations.scroll_into_view_if_needed()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "10_locations.png"))

        # Click Warminster chip
        warminster_chip = page.locator('[data-town="warminster"]')
        await warminster_chip.click()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "11_locations_warminster.png"))
        print("Warminster chip clicked")

        # 10. Testimonials
        print("Testimonials...")
        testimonials = page.locator("#testimonials")
        await testimonials.scroll_into_view_if_needed()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "12_testimonials.png"))

        # Click next testimonial
        next_btn = page.locator("#next-slide-btn")
        await next_btn.click()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "13_testimonials_slide2.png"))

        # 11. FAQ
        print("FAQ accordion...")
        faq = page.locator(".faq-section")
        await faq.scroll_into_view_if_needed()
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUTPUT_DIR / "14_faq.png"))

        # Click first FAQ item
        first_faq = page.locator(".faq-question").first
        await first_faq.click()
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "15_faq_open.png"))
        print("FAQ opened")

        # 12. CTA banner
        print("CTA banner...")
        cta = page.locator(".cta-banner-section")
        await cta.scroll_into_view_if_needed()
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "16_cta.png"))

        # 13. Contact form
        print("Contact form...")
        contact = page.locator("#contact")
        await contact.scroll_into_view_if_needed()
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "17_contact.png"))

        # 14. Footer
        print("Footer...")
        footer = page.locator(".footer")
        await footer.scroll_into_view_if_needed()
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUTPUT_DIR / "18_footer.png"))

        # 15. Open Quote Modal
        print("Opening quote modal...")
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(300)
        quote_btn = page.locator(".header .btn.btn-primary").first
        await quote_btn.click()
        await page.wait_for_timeout(600)
        await page.screenshot(path=str(OUTPUT_DIR / "19_modal.png"))

        await browser.close()
        print("\nAll screenshots saved to:", OUTPUT_DIR)
        print("Files:")
        for f in sorted(OUTPUT_DIR.glob("*.png")):
            print(f"  {f.name}")

asyncio.run(take_screenshots())
