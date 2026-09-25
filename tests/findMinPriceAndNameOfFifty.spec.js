import { test } from "@playwright/test";

test("Myntra - Find Minimum Price", async ({ page }) => {
  await page.goto("https://www.myntra.com/");

  await page
    .locator("//div[@class='desktop-navLink']/child::a[text()='Kids']")
    .hover();

  await page.locator("//a[@href='/boy-tshirts']").click();

  async function getMinPrice() {
    const allPrices = page.locator(
      '//li[@class="product-base"]/descendant::div[@class="product-price"]/descendant::span[(@class="product-discountedPrice") or (not(@class) and not(span))]',
    );

    const priceList = await allPrices.allTextContents();
    console.log("Price Length:", priceList.length);
    console.log("All Prices:", priceList);
    const prices = priceList.map((p) => {
      return Number(p.match(/\d+/)[0]);
    });

    console.log("Parsed Prices:", prices);
    const minimumPrice = Math.min(...prices);
    console.log("Minimum Price:", minimumPrice);
    const productName = await getProductName(minimumPrice); //return
    console.log("Product Name:", productName);
    console.log("Minimum Price of product:", minimumPrice);
  }

  async function getProductName(min) {
    const productName = page.locator(
      `//li[@class="product-base"]/descendant::div[@class="product-price"]/descendant::span[(@class="product-discountedPrice" and contains(., "${min}")) or (contains(., "${min}") and not(@class))]/ancestor::li[@class="product-base"]//h3[@class="product-brand"]`,
    );

    return await productName.first().textContent();
  }

  await getMinPrice();
});
