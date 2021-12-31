"use strict";

class GoogleTranslatePage {
    // Google Translate locators
    get dropdownMoreSourcesLanguages() { return $$('[aria-label="More source languages"]')[0]; }
    get dropdownMoreTargetLanguages() { return $$('[aria-label="More target languages"]')[0]; }
    get sourceTxtArea() { return $('[aria-label="Source text"]'); }
    get translationTxtArea() { return $('[data-language-to-translate-into]'); }
    get dataTablesWithLanguages() { return $$('[jsname="JpRUfc"]'); }
    get btnSwapLanguages() { return $('[aria-label*="Swap languages"]'); }
    get btnShowInputTools() { return $('[aria-label="Show the Input Tools menu"]'); }
    get btnSwitchToVirtualKeyboard() { return $('.ita-kd-icon-button.ita-kd-inputtool-icon'); }
    //Keyboard buttons 
    get btnCapsLock() { return $('[id="K16"]'); }
    get characterH() { return $('[id="K72"]'); }
    get characterI() { return $('[id="K73"]'); }
    get exclamationMark() { return $('[id="K49"]'); }
    

    selectLanguage(neededLanguage) {
        // Waiting until modal loads
        browser.waitUntil( () => {
			return $$('[class="Llmcnf"]').length > 5;
		}, {timeout: 5000});
        //There are 4 dataTables on this page which include languages
        //Looping through 4 tables in order to verify that table is opened
        this.dataTablesWithLanguages.forEach(table => {
            // If table is open
            if (table.isDisplayed()) {
                // Loop through all languages
                const allLanguages = table.$$('//div[@data-language-code]');
                for (let index = 0; index < allLanguages.length; index++) {
                    const lang = allLanguages[index];
                    //Select needed language from the table
                    if (lang.getText() === neededLanguage && lang.isClickable()) {
                        lang.click();
                        break;
                    }
                }
            }
        });
    }
}

module.exports = new GoogleTranslatePage;
