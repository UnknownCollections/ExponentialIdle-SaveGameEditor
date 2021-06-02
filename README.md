![Logo](https://unknowncollections.github.io/ExponentialIdle-SaveGameEditor/favicon-48x48.png)

# Exponential Idle Save Game Editor

Save game editor for the Android and iOS game Exponential Idle.


## Running the Editor

**Access the live version directly:**
<https://unknowncollections.github.io/ExponentialIdle-SaveGameEditor/>

*or*

**Download and run offline in browser:** 
<https://github.com/UnknownCollections/ExponentialIdle-SaveGameEditor/archive/refs/heads/master.zip>
1. Extract `master.zip` to folder
2. Open `docs/index.html` in a modern, ever-green web browser
  
## API Reference

- `src/components/`
  - Any reuseable or job specific Vue components
  - `DynamicInput.vue` and `ArrayInput.vue` can recursively use other `Input.vue` components as needed
- `src/data/`
  - Static data JSON files used to populate class structures or components
- `src/lib/`
  - Functional pure javascript classes
  - `savegame.d.ts` is a Typescript interface for the save game format
- `src/lib/third-party/1ekf/ExidleStars/`
  - Git submodule of this repo: <https://github.com/1ekf/ExidleStars/tree/d248589f64f70d62d9c3c7fe63e832a1612bd324>
  - License of that repository is here: <https://github.com/1ekf/ExidleStars/blob/d248589f64f70d62d9c3c7fe63e832a1612bd324/LICENSE>
- `src/pages/`
  - Vue components for each full page in the application
- `src/styles/`
  - Global Sass stylesheets for the application. Some Vue components may include extra, specific styling.
- `src/App.vue`
  - Main Vue component entrypoint for the application.
- `src/index.js`
  - Main Javascript entrypoint for the application.
- `src/index.html`
  - HTML template file. Includes the early styles for rendering the loading message.

  
## Building From Source

#### Requirements

1. Up to date Nodejs: <https://nodejs.dev/download/>
2. Up to date Yarn: <https://yarnpkg.com/getting-started/install>
3. Provide your own `src/lib/crypto.obfusicate.js`:

The interface this file must provide can be found in `src/lib/crypto.d.ts`:

```typescript
export declare module Crypto {
    function encrypt(text: string, compress?: boolean): string;
    function decrypt(text: string): string;
}

export declare module Utils {
    function intToBytes(num: number, littleEndian?: boolean): Uint8Array;
    function stringToU8arr(bStr: string): Uint8Array;
    function u8Arr2Hex(u8: Uint8Array): string;
    function mergeTypedArrays(a: ArrayLike<any>, b: ArrayLike<any>): ArrayLike<any>;
    function desDecrypt(data: Uint8Array, key: string, iv: string): Uint8Array;
    function desEncrypt(data: Uint8Array, key: string, iv: string): Uint8Array;
    function sha512(msg: string): string;
}
```

In short, this JavaScript file must export a `Crypto` class and `Utils` class with those listed static functions. Example:

```javascript
export class Utils {
    static intToBytes(num, littleEndian) {

    }

    static stringToU8arr(bStr) {

    }

    static u8Arr2Hex(u8) {

    }

    static sha512(msg) {

    }

    static mergeTypedArrays(a, b) {

    }

    static desDecrypt(data, key, iv) {

    }

    static desEncrypt(data, key, iv) {

    }
}

export class Crypto {
    static encrypt(text, compress) {

    }

    static decrypt(text) {

    }
}
```

1. Clone the repository: `git clone https://github.com/UnknownCollections/ExponentialIdle-SaveGameEditor.git`
2. Initialize any submodules `git submodules init`
3. With `src/lib/crypto.obfusicate.js` in place, the build steps are the following commands to be executed on the command line in the root folder:
  - `yarn install`
  - `yarn run build`
## FAQ

#### Why did you create this?

I was curious how the game worked internally. So I decided to make this app a by-product of that information.

#### Why do you require an in-game purchase to use this app?

Initially, I didn't have this in place. However, I realized that this app can give you the advantages of one of the in-game purchases (Permanent Ad Reward). This means the app could lessen the game creator's monetary support. So, I either had to kill this project or implement the purchase requirement.

#### This app is open source, but why is part of it obfuscated? What are you hiding?

The obfuscated file is `crypto.js`. This is the file that handles the decryption, encryption, and in-game purchase verification.

Yes, JavaScript obfuscation is reversible. Still, I believe that anyone who is successful at deobfuscation could decrypt the save games themselves anyway.

Anyone wishing to have a closer look at this file for security purposes can contact me.

#### Why did you make this open-source at all?

It is my deepest hope that someone can use any or all of this code to learn something new.

#### Where did the translations come from?

The game has a beautiful language mechanism and a fantastic team of translators. Where possible, I tried to use game keywords so that this app could be automatically translated, even at a small cost of clarity.

#### I am one of the authors of one of the translations. Unfortunately, I do not want you to use my work. Can you remove it?

Send a pull request with the `src/lib/i18n.json` file edited and proof that you are its author to remove your work.

#### If I load and export a save without changing anything, the save data string changes. Why?

Three main reasons:

1. Date precision for milliseconds is less precise in the web browser versus the game. This doesn't really effect gameplay, but it prevents exact recreations of the save string.
2. Big number precision is less due to the web browser holding less decimal places in total. This doesn't really effect gameplay, but it prevents exact recreations of the save string.
3. Save game strings are compressed before they are encrypted. The game doesn't use the highest compression possible when exporting, this app does. The game can still load the higher compressed save strings, so it's a win/win.

#### The app doesn't work!

Make an issue in this app's GitHub repo following the proper issue guidelines.

#### The app corrupted my save!

As noted on the main page, this app is not responsible for any broken save. Therefore, make a backup of your save first.

#### The app froze my phone!

This can happen if the game attempts to load an invalid save. If this happens, please make an issue in this app's GitHub repo and include what you changed.

#### What are some practical, non-cheaty things you can do?

- Automatically update your permanent star levels and students without having to enter each value into the game manually.
- Recover your game if you lost it and don't want to start over.
- See more accurate numbers that get truncated in game for space-saving reasons.
- Edit long auto-prestige and auto-supremacy formulas easier.
- Test different game play methods quickly to find optimal speed running strategies.

#### What are some practical, kinda-cheaty things you can do?

- Change the current in-game time to speed through offline progress (maximum 1 week at a time).
- Change the automation rate to be much faster than what the star bonus reward gives you. Careful, you might lag your game!
- Unlock the minigames early because you fucking love minigames.
- Unlock auto-buy for Theories you haven't even unlocked yet; skip the initial grind!
- Change the default acceleration rate to act like you're always holding the acceleration button.

#### What's the Raw Data section?

This is all the data from the save game in its *(mostly)* raw form. Editing values in other sections will update the Raw Data section as well, sometimes in multiple places. Be careful editing directly in this area as there are fewer checks for invalid inputs.

#### I changed some things, but they didn't affect the game at all. What things can you not do?

Some items require something to be changed in multiple places in `Raw Data`. If you're directly editing in `Raw Data` you may need to edit things in multiple places.

There are also some things in the save game that the game will not load when doing an import from paste:

- Any of the items in `Raw Data > Option`
- Any of the items in `Raw Data > Rewards`
- Any of the items in `Raw Data > Session` that relate to purchases or asks
- `Raw Data > Session > HasGoneBackwardInTime`
- Any of the items in `Raw Data > Statistics` that relate to installation time

#### What about other games?

If the game works similarly (import/export of save games), and the game is interesting, email me.

  
## License

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to https://unlicense.org/
```
## Acknowledgements

#### Exponential Idle game by `Gilles-Philippe Paillé @ Conic Games`

- Download and play the game at: <https://conicgames.github.io/exponentialidle/index.html>
- Reddit Community: <https://www.reddit.com/r/ExponentialIdle>
- Discord Community: <https://discord.gg/S9UheTC>

#### Find the full attributions and acknowledgements: 
<https://unknowncollections.github.io/ExponentialIdle-SaveGameEditor/#/acknowledgments>