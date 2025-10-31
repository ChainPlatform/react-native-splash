class SplashController {
    _instance = null;
    _pending = null;
    _isShowing = false;

    register(instance) {
        this._instance = instance;
        if (this._pending) {
            const { duration, header, sub, logo, primary, bg } = this._pending;
            this._pending = null;
            this._isShowing = true;
            this._instance.show(duration, header, sub, logo, primary, bg);
        }
    }

    unregister() {
        this._instance = null;
        this._isShowing = false;
    }

    show(duration = 350, header = "", sub = "", logo = "", primary = null, bg = null) {
        if (typeof global !== "undefined" && global.__CHAIN_PULL_REFRESHING) return;

        if (this._instance) {
            this._isShowing = true;
            this._instance.show(duration, header, sub, logo, primary, bg);
        } else {
            this._pending = { duration, header, sub, logo, primary, bg };
        }
    }

    hide(duration = 350) {
        if (this._instance) {
            this._isShowing = false;
            this._instance.hide(duration);
        }
    }

    isShowing() {
        return this._isShowing;
    }
}

export default new SplashController();