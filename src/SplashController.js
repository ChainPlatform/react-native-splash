class SplashController {
    _ref = null;

    register(ref) {
        this._ref = ref;
    }

    unregister() {
        this._ref = null;
    }

    show(header = "", sub = "", logo = "", bg = null) {
        if (this._ref) this._ref.show(header, sub, logo, bg);
    }

    hide() {
        if (this._ref) this._ref.hide();
    }
}

export default new SplashController();
