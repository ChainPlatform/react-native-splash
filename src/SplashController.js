class SplashController {
    _instance = null;
    _pending = null;

    register(instance) {
        this._instance = instance;
        if (this._pending) {
            const { duration, header, sub, logo, bg, opts } = this._pending;
            this._pending = null;
            this._instance.show(duration, header, sub, logo, bg, opts);
        }
    }

    unregister() {
        this._instance = null;
    }

    show(duration = 350, header = "", sub = "", logo = "", bg = null, options = {}) {
        if (typeof global !== "undefined" && global.__CHAIN_PULL_REFRESHING) {
            return;
        }
        const opts = typeof options === "number" ? { autoHideAfter: options } : (options || {});
        if (this._instance) {
            this._instance.show(duration, header, sub, logo, bg, opts);
        } else {
            this._pending = { duration, header, sub, logo, bg, opts };
        }
    }

    hide(duration = 350) {
        if (this._instance) {
            this._instance.hide(duration);
        }
    }
}

export default new SplashController();
