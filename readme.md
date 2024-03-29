<p align="center">
  <img src="https://i.imgur.com/Vy9G0Xt.png" alt="Sencrypt" style="height:60%; width:60%" /><br><br>
  <b>An open source password manager made in <a href="https://www.electronjs.org/">Electron</a>.</b><br><br>
  <img src="https://i.imgur.com/nhfToBZ.png" alt="Sencrypt application screenshot" />
</p>

## Installation

<b> WARNING: This Application is currently in an beta stage. Be cautious.</b>

<p>
    You can download either the installer or the no-installer version for your operating system in the <a href="https://github.com/Uncasted/sencrypt/releases">release</a> section.
</p>

## How can I build from source?

<b>You will need <a href="https://nodejs.org/en/download/">Node.js</a> to be able to build from source.</b>

<b>1. Open the source code directory in a terminal.</b>

It should look like this:

```
[user@host sencrypt]$
```

<b>2. run `npm install` to install all the packages for the electron app.</b>

```
 $ npm install
```

<b>3. change directory into the application window folder.</b>

```
$ cd src/view/application-window
```

4. <b> run `npm install` again to install all the packages for the view.</b>

```
$ npm install
```

<b>5. Also in the same directory, run this command to build the view.</b>

```
$ npm run build
```

<b>6. Change to the tray window directory and run the previous two commands again.</b>

```
[user@host sencrypt/src/view/application-window]$ cd ..
[user@host sencrypt/src/view/]$ cd tray-window/
[user@host sencrypt/src/view/tray-window]$ ...
```

<b>7. Change back to the main directory.</b>

```
[user@host sencrypt/src/view/tray-window]$ cd ../../..
[user@host sencrypt]
```

<b>8. Run `npm run dist` to build the application.</b>

```
$ npm run dist
```

<b>This will generate a dist folder that will contain the application for your operating system.</b>

## How can I contribute?

<b>The dev tools are enabled (for now) so you can open them to monitor the application.</b>

If you want to contribute, you can create a pull request with this <a href="https://pastebin.com/24A7VErV">template</a>.

If you find a bug, you can create an issue using this <a href="https://pastebin.com/zMc45xBY">template</a>.

---

Thanks to <a href="https://icons8.com">Icons8</a> for the icons!
