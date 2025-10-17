import { useEffect, useRef } from "react";
import {
    Animated,
    View,
    ActivityIndicator,
    StyleSheet,
    Platform,
} from "react-native";
import { ViewLoader } from "@chainplatform/progressive-image";
import DancingText from "@chainplatform/animated";
import { setSize, sdkColors } from "@chainplatform/layout";
import SplashController from "./SplashController";

export const SplashProvider = ({ children, theme }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const visible = useRef(false);
    const headerRef = useRef("");
    const subRef = useRef("");
    const logoRef = useRef("");

    const primary = theme?.colors?.primary || sdkColors.primary;
    const backgroundColor = theme?.colors?.card || sdkColors.white;

    const IS_WEB = Platform.OS === "web";

    const show = (header = "", sub = "", logo = "") => {
        headerRef.current = header;
        subRef.current = sub;
        logoRef.current = logo;
        visible.current = true;
        Animated.timing(opacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: !IS_WEB,
        }).start();
    };

    const hide = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: !IS_WEB,
        }).start(() => {
            visible.current = false;
        });
    };

    // Gắn controller
    useEffect(() => {
        SplashController.register({ show, hide });
        return () => SplashController.unregister();
    }, []);

    return (
        <>
            {children}
            <Animated.View
                pointerEvents={visible.current ? "auto" : "none"}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        opacity,
                        backgroundColor,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    },
                ]}
            >
                <View style={{ width: setSize(80), height: setSize(80) }}>
                    {logoRef.current ? (
                        <ViewLoader
                            indicator={setSize(80)}
                            style={{
                                showLoading: false,
                                imageType: "link",
                                source: logoRef.current,
                                style: { width: setSize(80), height: setSize(80), color: primary },
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

                {headerRef.current ? (
                    <DancingText
                        letters={headerRef.current}
                        textStyle={{
                            fontSize: setSize(16),
                            fontWeight: "600",
                            letterSpacing: setSize(0.3),
                            color: primary,
                            marginTop: setSize(12),
                        }}
                    />
                ) : null}

                {subRef.current ? (
                    <DancingText
                        letters={subRef.current}
                        animated
                        textStyle={{
                            fontSize: setSize(14),
                            marginTop: setSize(8),
                            color: primary,
                        }}
                    />
                ) : null}
            </Animated.View>
        </>
    );
};