import { useEffect, useRef, useState } from "react";
import { Animated, View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { ViewLoader } from "@chainplatform/progressive-image";
import DancingText from "@chainplatform/animated";
import { setSize, sdkColors } from "@chainplatform/layout";
import SplashController from "./SplashController";

export const SplashProvider = ({
    children,
    theme,
    bgProp,
    defaultHeader = "",
    defaultSub = "",
    defaultLogo = ""
}) => {
    const opacity = useRef(new Animated.Value(1)).current; // start visible
    const [renderFlag, setRenderFlag] = useState(true);
    const [visible, setVisible] = useState(true);

    const [header, setHeader] = useState(defaultHeader);
    const [sub, setSub] = useState(defaultSub);
    const [logo, setLogo] = useState(defaultLogo);
    const [background, setBackground] = useState(bgProp || sdkColors.white);

    const autoHideTimer = useRef(null);

    const primary = theme?.colors?.primary || sdkColors.primary;
    const IS_WEB = Platform.OS === "web";

    // clear any auto-hide timer
    const clearAutoHide = () => {
        if (autoHideTimer.current) {
            clearTimeout(autoHideTimer.current);
            autoHideTimer.current = null;
        }
    };

    const show = (duration = 350, headerTxt = "", subTxt = "", logoSrc = "", bg = null, options = {}) => {
        // normalize options (backward compat if options is a number)
        const opts = typeof options === "number" ? { autoHideAfter: options } : (options || {});
        clearAutoHide();

        if (headerTxt) setHeader(headerTxt);
        if (subTxt) setSub(subTxt);
        if (logoSrc) setLogo(logoSrc);
        setBackground(bg || bgProp || sdkColors.white);

        setRenderFlag(true);
        setVisible(true);

        if (duration <= 0) {
            opacity.setValue(1);
        } else {
            opacity.setValue(0);
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                useNativeDriver: !IS_WEB,
            }).start();
        }

        // auto hide if requested
        if (opts.autoHideAfter && typeof opts.autoHideAfter === "number" && opts.autoHideAfter > 0) {
            autoHideTimer.current = setTimeout(() => {
                // default hide animation 350ms
                hide(350);
                autoHideTimer.current = null;
            }, opts.autoHideAfter);
        }
    };

    const hide = (duration = 350) => {
        clearAutoHide();

        if (!visible && !renderFlag) return;

        if (duration <= 0) {
            opacity.setValue(0);
            setVisible(false);
            setRenderFlag(false);
            return;
        }

        Animated.timing(opacity, {
            toValue: 0,
            duration,
            useNativeDriver: !IS_WEB,
        }).start(() => {
            setVisible(false);
            setRenderFlag(false);
        });
    };

    useEffect(() => {
        // register controller
        SplashController.register({ show, hide });

        // If controller had a pending show call before provider mounted, handle it
        const pending = SplashController._pending;
        if (pending && typeof pending === "object") {
            // destructure pending and call show with options
            const { duration, header, sub, logo, bg, opts } = pending;
            // clear the pending since we consume it
            SplashController._pending = null;
            show(duration, header, sub, logo, bg, opts);
        }

        return () => {
            // cleanup
            clearAutoHide();
            SplashController.unregister();
        };
    }, []);

    if (!renderFlag) return children;

    return (
        <>
            {children}
            {visible && (
                <Animated.View
                    pointerEvents="auto"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            opacity,
                            backgroundColor: background,
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 999999999,
                            elevation: 999999999,
                        },
                    ]}
                >
                    <View style={{ width: setSize(80), height: setSize(80) }}>
                        {logo ? (
                            <ViewLoader
                                indicator={setSize(80)}
                                style={{
                                    showLoading: false,
                                    imageType: "link",
                                    source: logo,
                                    style: {
                                        width: setSize(80),
                                        height: setSize(80),
                                        color: primary,
                                    },
                                }}
                            />
                        ) : (
                            <ActivityIndicator
                                animating={true}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: setSize(80),
                                }}
                                size={Platform.OS === "web" ? "large" : "small"}
                                color={primary}
                            />
                        )}
                    </View>

                    {header ? (
                        <DancingText
                            letters={header}
                            textStyle={{
                                fontSize: setSize(16),
                                fontWeight: "600",
                                letterSpacing: setSize(0.3),
                                color: primary,
                                marginTop: setSize(12),
                            }}
                        />
                    ) : null}

                    {sub ? (
                        <DancingText
                            letters={sub}
                            animated
                            textStyle={{
                                fontSize: setSize(14),
                                marginTop: setSize(8),
                                color: primary,
                            }}
                        />
                    ) : null}
                </Animated.View>
            )}
        </>
    );
};
