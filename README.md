### Installation
These instruction will get you a copy of the project up and runing on your local machine

````
> git clone https://github.com/snetch-gym/Carpe.git

> npm i - to install modules
> npx wdio wdio.conf.js --spec specs/translator/google-translator-spec.js - to run the test and get the results


````

### Architecture
1. Page Object => page.js file contains all of the locators for the test and helper methods/functions
2. Data => text.json file contains the text to enter
