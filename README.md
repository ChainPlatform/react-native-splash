# Chain Platform Splash
@chainplatform/splash is a lightweight React Native & Web library for showing global splash/loading screens using Context and animated transitions — without relying on component state.

<p align="center">
  <a href="https://github.com/ChainPlatform/react-native-splash/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/splash">
    <img src="https://img.shields.io/npm/v/@chainplatform/splash?color=brightgreen&label=npm%20package" />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/splash">
    <img src="https://img.shields.io/npm/dt/@chainplatform/splash.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/splash">
    <img src="https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue" />
  </a>
</p>

# 💧 @chainplatform/splash

A universal splash/loading overlay for React Native & React Native Web — no state, fully controlled via Provider and static API.

---

## 🚀 Features

- ✅ Works with both **class** and **function** components
- 💨 Animated fade-in/out transitions (uses `Animated` API)
- 🧠 Global control via context + static API (`Splash.show()` / `Splash.hide()`)
- 🖼️ Supports logo, header, subtext, and custom theme colors
- 🌍 Compatible with React Native Web
- 🪶 Zero dependencies (except React Native core)

---

## 📦 Installation

```bash
npm install @chainplatform/splash
# or
yarn add @chainplatform/splash
```

---

## 🧠 Basic Usage

### 1️⃣ Wrap your app with `SplashProvider`

```tsx
import React from "react";
import { SplashProvider } from "@chainplatform/splash";
import MainNavigation from "./MainNavigation";

export default function App() {
  return (
    <SplashProvider
      theme={{ colors: { primary: "#007bff", background: "#fff" } }}
      logo={"https://chainplatform.github.io/chain.png"}
    >
      <MainNavigation />
    </SplashProvider>
  );
}
```

---

### 2️⃣ Show / Hide Splash Anywhere

Works globally in both **class** and **functional** components:

```tsx
import { Splash } from "@chainplatform/splash";

// Show splash
Splash.show({
  header: "Loading Data",
  sub: "Please wait...",
  logo: "https://chainplatform.github.io/chain.png",
});

// Hide splash after 2s
setTimeout(() => Splash.hide(), 2000);
```

---

### 3️⃣ Example inside components

#### Function Component

```tsx
import React from "react";
import { Button } from "react-native";
import { Splash } from "@chainplatform/splash";

export default function HomeScreen() {
  return (
    <Button title="Show Splash" onPress={() => {
      Splash.show({ header: "Syncing...", sub: "Fetching latest data" });
      setTimeout(() => Splash.hide(), 1500);
    }} />
  );
}
```

#### Class Component

```tsx
import React, { Component } from "react";
import { Button } from "react-native";
import { Splash } from "@chainplatform/splash";

export default class Settings extends Component {
  render() {
    return (
      <Button title="Load" onPress={() => {
        Splash.show({ header: "Please wait", sub: "Processing..." });
        setTimeout(() => Splash.hide(), 1500);
      }} />
    );
  }
}
```

---

## ⚙️ API Reference

### 🔹 `SplashProvider` Props

| Prop | Type | Description |
|------|------|-------------|
| `theme` | `{ colors: { primary: string, background: string } }` | Theme colors |
| `logo` | `string` | Optional logo URL |
| `animationDuration` | `number` | Animation fade duration (default: 300ms) |

---

### 🔹 `Splash` Static Methods

| Method | Description |
|---------|-------------|
| `Splash.show(options)` | Show global splash overlay |
| `Splash.hide()` | Hide splash overlay |

#### `options`

| Key | Type | Description |
|------|------|-------------|
| `header` | `string` | Optional main title |
| `sub` | `string` | Optional subtitle |
| `logo` | `string` | Custom logo URL |
| `theme` | `object` | Override theme colors for this splash |

---

## 🧩 Animated Transition

Splash uses React Native's `Animated` API.  
It automatically detects platform:
- Uses `useNativeDriver` on Android/iOS
- Falls back to non-native animation on Web

---

## 🧪 Tips

- Works across navigation stacks (no remount needed)
- Ideal for global loaders, onboarding splash, or async operations
- Safe for concurrent `.show()` and `.hide()` calls

---

## 📄 License

MIT © Chain Platform
