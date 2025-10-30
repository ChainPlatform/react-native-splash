# React Native & React Native Web Splash

@chainplatform/splash is a lightweight React Native & Web library for showing global splash/loading screens using Context and animated transitions --- without relying on component state.

<p align="center">
  <a href="https://github.com/ChainPlatform/react-native-splash/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/splash">
    <img src="https://img.shields.io/npm/v/@chainplatform/splash?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/splash">
    <img src="https://img.shields.io/npm/dt/@chainplatform/splash.svg"></img>
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/splash">
    <img src="https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue"></img>
  </a>
  <a href="https://github.com/ChainPlatform/react-native-splash/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=doansan">
    <img src="https://img.shields.io/twitter/follow/doansan.svg?label=Follow%20@doansan" alt="Follow @doansan" />
  </a>
</p>

# 💧 @chainplatform/splash

A universal splash/loading overlay for React Native & React Native Web --- state-free, ultra-fast, and controlled by a static API.

------------------------------------------------------------------------

## 🚀 Features

-   ⚡ **Instant show/hide** --- stays mounted, no re-render delay
-   🧠 Controlled globally via `Splash.show()` / `Splash.hide()`
-   🎨 Custom logo, title, subtitle, and dynamic background color
-   🌍 Fully compatible with **React Native Web**
-   💨 Smooth animated fade transitions using `Animated` API
-   🪶 Minimal dependencies --- zero context/state overhead

------------------------------------------------------------------------

## 📦 Installation

``` bash
npm install @chainplatform/splash
# or
yarn add @chainplatform/splash
```

------------------------------------------------------------------------

## 🧠 Basic Usage

### 1️⃣ Wrap your app with `SplashProvider`

``` tsx
import React from "react";
import { SplashProvider } from "@chainplatform/splash";
import MainNavigation from "./MainNavigation";

export default function App() {
  return (
    <SplashProvider theme={{ colors: { primary: "#007bff", background: "#fff" } }}>
      <MainNavigation />
    </SplashProvider>
  );
}
```

------------------------------------------------------------------------

### 2️⃣ Show / Hide Splash Anywhere

``` tsx
import { Splash } from "@chainplatform/splash";

// Show splash instantly
Splash.show(0, "Loading", "Please wait...", "https://chainplatform.github.io/chain.png", "#fff");

// Hide splash after 1.5s
setTimeout(() => Splash.hide(0), 1500);
```

------------------------------------------------------------------------

## ⚙️ API Reference

### 🔹 `SplashProvider` Props

  --------------------------------------------------------------------------------------------------------------
  Prop              Type                                                    Description
  ----------------- ------------------------------------------------------- ------------------------------------
  `theme`           `{ colors: { primary: string, background: string } }`   Optional color theme

  `bgProp`          `string`                                                Background color (default: white)
  --------------------------------------------------------------------------------------------------------------

### 🔹 `Splash` Static Methods

  ---------------------------------------------------------------------------------------------------
  Method                                           Params               Description
  ------------------------------------------------ -------------------- -----------------------------
  `Splash.show(duration, header, sub, logo, bg)`   Duration in ms (0 =  Show global splash overlay
                                                   instant)             

  `Splash.hide(duration)`                          Duration in ms (0 =  Hide splash overlay
                                                   instant)             
  ---------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🧩 Notes

-   The splash view is **never unmounted** --- eliminating render delay
-   `setNativeProps` ensures **instant background rendering**
-   Optimized for both **React Native** and **React Native Web**
-   Ideal for global transitions, route loading, or async actions

------------------------------------------------------------------------

## 🪪 License

MIT © 2025 [Chain Platform](https://chainplatform.net)

------------------------------------------------------------------------

## 💖 Support & Donate

If you find this package helpful, consider supporting the development:

| Cryptocurrency | Address |
|----------------|----------|
| **Bitcoin (BTC)** | `17grbSNSEcEybS1nHh4TGYVodBwT16cWtc` |
![alt text](image-1.png)
| **Ethereum (ETH)** | `0xa2fd119a619908d53928e5848b49bf1cc15689d4` |
![alt text](image-2.png)
| **Tron (TRX)** | `TYL8p2PLCLDfq3CgGBp58WdUvvg9zsJ8pd` |
![alt text](image.png)
| **DOGE (DOGE)** | `DDfKN2ys4frNaUkvPKcAdfL6SiVss5Bm19` |
| **USDT (SOLANA)** | `cPUZsb7T9tMfiZFqXbWbRvrUktxgZQXQ2Ni1HiVXgFm` |

Your contribution helps maintain open-source development under the Chain Platform ecosystem 🚀
