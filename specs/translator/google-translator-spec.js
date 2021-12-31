// Importing login credentials
const data = require('../../data/text.json');
// Importing chai assertion library
const { assert } = require('chai');
// Importing page object in order to globally use locators and helpers
const GoogleTranslatePage = require('../../page object/page');
const url = 'https://translate.google.com/';

describe('Google Translate', () => {

    it('Navigate to google translate', () => {
        //Navigate to Google Translate page 
        browser.url(url);
        //Click on sources languages drop down
        GoogleTranslatePage.dropdownMoreSourcesLanguages.click();
        //Select language
        GoogleTranslatePage.selectLanguage('German');
        browser.pause(500);
        //Click on target languages dropdown
        GoogleTranslatePage.dropdownMoreTargetLanguages.click();
        //Select language
        GoogleTranslatePage.selectLanguage('Spanish');
        //Enter text to translate
        GoogleTranslatePage.sourceTxtArea.setValue(data.initialText);
        //Verify that text was translated correctly 
        assert.equal(GoogleTranslatePage.translationTxtArea.getText(), data.expectedText, 'Translation failed');
    })

    it('Swap languages scenario', () => {
        //Navigate to Google Translate page 
        browser.url(url);
        GoogleTranslatePage.dropdownMoreSourcesLanguages.click();
        GoogleTranslatePage.selectLanguage('German');
        browser.pause(500);
        GoogleTranslatePage.dropdownMoreTargetLanguages.click();
        GoogleTranslatePage.selectLanguage('Spanish');
        //Enter text to translate
        GoogleTranslatePage.sourceTxtArea.setValue(data.initialText);
        browser.waitUntil( () => {
			return GoogleTranslatePage.translationTxtArea.getText() === data.expectedText;
		}, {timeout: 5000});
        //Click Swap languages
        GoogleTranslatePage.btnSwapLanguages.click();
        //Verify that languages was swaped and text translated correctly 
        browser.waitUntil( () => {
			return GoogleTranslatePage.translationTxtArea.getText() === data.initialText;
		}, {timeout: 5000, timeoutMsg: 'Text was not translated correctly after swapping languages'} );
    });

    it('Add data through virtual keyboard', () => {
        //Navigate to Google Translate page 
        browser.url(url);
        GoogleTranslatePage.dropdownMoreTargetLanguages.click();
        GoogleTranslatePage.selectLanguage('English');
        GoogleTranslatePage.sourceTxtArea.setValue(data.initialText);
        //Clear text area
        GoogleTranslatePage.sourceTxtArea.clearValue();
        //Click on button 'Turn on Virtual Keyboard'
        GoogleTranslatePage.btnSwitchToVirtualKeyboard.click();
        // Using keyboard enter text 
        GoogleTranslatePage.btnCapsLock.click();
        GoogleTranslatePage.characterH.click();
        GoogleTranslatePage.characterI.click();
        GoogleTranslatePage.btnCapsLock.click();
        GoogleTranslatePage.exclamationMark.click();
        //Verify that text was entered correctly
        browser.waitUntil( () => {
			return GoogleTranslatePage.translationTxtArea.getText() === 'Hi!';
		}, {timeout: 5000, timeoutMsg: 'Text was not entered correctly'} );
    });
});