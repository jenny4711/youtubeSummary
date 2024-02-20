/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStorageCredit": () => (/* binding */ setStorageCredit),
/* harmony export */   "setStoredUserInfo": () => (/* binding */ setStoredUserInfo),
/* harmony export */   "setStoredForm": () => (/* binding */ setStoredForm),
/* harmony export */   "setStoredDataResult": () => (/* binding */ setStoredDataResult),
/* harmony export */   "getStoredCredit": () => (/* binding */ getStoredCredit),
/* harmony export */   "getStoredUserInfo": () => (/* binding */ getStoredUserInfo),
/* harmony export */   "getStoredForm": () => (/* binding */ getStoredForm)
/* harmony export */ });
function setStorageCredit(credit) {
    const vals = {
        credit
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function setStoredUserInfo(email, family_name, given_name, picture) {
    const vals = {
        email,
        family_name,
        given_name,
        picture
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function setStoredForm(lang, ask) {
    const vals = {
        ask,
        lang,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set({ "resultForm": vals }, () => {
            resolve();
        });
    });
}
function setStoredDataResult(data) {
    const val = {
        data
    };
    return new Promise((resolve) => {
        chrome.storage.local.set({ "resultData": val }, () => {
            resolve();
        });
    });
}
function getStoredCredit() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("credit", (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            else {
                resolve(result);
            }
        });
    });
}
function getStoredUserInfo() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(null, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            else {
                resolve(result);
            }
        });
    });
}
function getStoredForm() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("resultForm", (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            else {
                // result.resultForm로부터 값을 추출
                resolve(result.resultForm);
            }
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
// google clientId: 569916602742-euf8b4pgltop5a5vv01q04hhi2v2j947.apps.googleusercontent.com

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
    chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
        // Use the token.
        let init = {
            method: 'GET',
            async: true,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'contentType': 'json'
        };
        fetch('https://www.googleapis.com/oauth2/v2/userinfo', init)
            .then((response) => response.json())
            .then(function (data) {
            console.log(data);
            const email = data.email;
            const family_name = data.family_name;
            const given_name = data.given_name;
            const picture = data.picture;
            (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredUserInfo)(email, family_name, given_name, picture);
        });
    });
    //   chrome.runtime.onMessage.addListener(function(message) {
    //     switch (message.action) {
    //         case "openOptionsPage":
    //             openOptionsPage();
    //             break;
    //         default:
    //             break;
    //     }
    // });
    // function openOptionsPage(){
    //     chrome.runtime.openOptionsPage();
    // }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openOptionsPage") {
        chrome.runtime.openOptionsPage();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map