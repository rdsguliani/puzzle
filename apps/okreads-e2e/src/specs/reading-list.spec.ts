import { $, $$, browser, ExpectedConditions, element, by } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to mark book as read from reading list', async (done) => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    done();
    const addButton = await $$('[data-testing="book-item"]').get(0).$('button')
    await addButton.click();
    
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const readingListReadStatus = await $('[data-testing="reading-list-read-status"]');
    const checkbox = await readingListReadStatus.$('mat-checkbox')
    checkbox.click()
    const statusText = await readingListReadStatus.$('.reading-list-item--read');

    await browser.wait(
          ExpectedConditions.textToBePresentInElement(statusText, 
          'Finish')
    );

  });


});
