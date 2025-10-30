class SplashController {
    _ref = null;
    tempBackground = null;

    register(ref) {
        this._ref = ref;
    }

    unregister() {
        this._ref = null;
    }

    /**
     * show(duration = 350, header = "", sub = "", logo = "", bg = null, options = {})
     * options can be:
     *   - autoHideAfter: number (ms)  => auto hide after ms
     *
     * For backward compatibility, you can also pass a number as 6th arg to mean autoHideAfter.
     */
    show(duration = 350, header = "", sub = "", logo = "", bg = null, options = {}) {
        // backward-compat: if options is a number treat as autoHideAfter
        const opts = typeof options === "number" ? { autoHideAfter: options } : (options || {});
        if (this._ref && typeof this._ref.show === "function") {
            this._ref.show(duration, header, sub, logo, bg, opts);
        } else {
            // store background for provider to pick up when it mounts
            this.tempBackground = bg || null;
            // store last show args in case provider wants initial state (optional)
            this._pending = { duration, header, sub, logo, bg, opts };
        }
    }

    hide(duration = 350) {
        if (this._ref && typeof this._ref.hide === "function") {
            this._ref.hide(duration);
        } else {
            // clear pending if any
            if (this._pending) this._pending = null;
        }
    }
}

export default new SplashController();
