import { useRef, useEffect, useState } from "react";
import { Animated, Modal, View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { ViewLoader } from "@chainplatform/progressive-image";
import DancingText from "@chainplatform/animated";
import { setSize, sdkColors } from "@chainplatform/layout";
import SplashController from "./SplashController";

export const SplashProvider = ({ children, theme, clProp, bgProp }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const nativeRef = useRef(null);

    // const [modalVisible, setModalVisible] = useState(false);
    const IS_WEB = Platform.OS === "web";
    const primary = theme?.colors?.primary || sdkColors.primary;

    const headerRef = useRef("");
    const subRef = useRef("");
    const logoRef = useRef("");
    const bgRef = useRef(bgProp || sdkColors.white);
    const colorRef = useRef(clProp || theme?.colors?.primary || sdkColors.primary);

    const show = (duration = 300, h = "", s = "", l = "", primary = null, background = null) => {
        headerRef.current = h;
        subRef.current = s;
        logoRef.current = l;
        bgRef.current = background || sdkColors.white;
        colorRef.current = primary || sdkColors.primary;

        // setModalVisible(true);

        if (nativeRef.current?.setNativeProps) {
            nativeRef.current.setNativeProps({
                style: { backgroundColor: bgRef.current },
                pointerEvents: "auto",
            });
        }

        opacity.stopAnimation();
        Animated.timing(opacity, {
            toValue: 1,
            duration,
            useNativeDriver: !IS_WEB,
        }).start();
    };

    const hide = (duration = 300) => {
        opacity.stopAnimation();
        Animated.timing(opacity, {
            toValue: 0,
            duration,
            useNativeDriver: !IS_WEB,
        }).start(() => {
            if (nativeRef.current?.setNativeProps) {
                nativeRef.current.setNativeProps({
                    pointerEvents: "none",
                });
            }
            // setTimeout(() => setModalVisible(false), 20);
        });
    };

    useEffect(() => {
        SplashController.register({ show, hide });
        return () => SplashController.unregister();
    }, []);

    useEffect(() => {
        if (nativeRef.current?.setNativeProps) {
            nativeRef.current.setNativeProps({
                style: { opacity: 0, backgroundColor: bgRef.current },
                pointerEvents: "none",
            });
        }
    }, []);

    return (
        <>
            {children}
            <Animated.View
                ref={nativeRef}
                pointerEvents="none"
                style={[
                    StyleSheet.absoluteFill,
                    {
                        opacity,
                        backgroundColor: bgRef.current,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999999999,
                        elevation: 999999999,
                    },
                ]}
            >
                <View
                    style={{
                        width: setSize(80),
                        height: setSize(80),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {logoRef.current ? (
                        <ViewLoader
                            indicator={setSize(80)}
                            style={{
                                showLoading: false,
                                imageType: "link",
                                source: logoRef.current,
                                style: {
                                    width: setSize(80),
                                    height: setSize(80),
                                    color: primary
                                },
                            }}
                        />
                    ) : (
                        <ActivityIndicator
                            animating
                            style={{
                                height: setSize(80),
                                alignItems: "center",
                                justifyContent: "center",
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
                            color: primary
                        }}
                    />
                ) : null}
            </Animated.View>
        </>
    );
};
