class SplashController {
    _ref = null;

    register(ref) {
        this._ref = ref;
    }

    unregister() {
        this._ref = null;
    }

    show(header = "", sub = "", logo = "") {
        if (this._ref) this._ref.show(header, sub, logo);
    }

    hide() {
        if (this._ref) this._ref.hide();
    }
}

export default new SplashController();
