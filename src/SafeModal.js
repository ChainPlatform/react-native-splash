import { useEffect, useState } from "react";
import { Modal as RNModal, Platform } from "react-native";
import SplashController from "./SplashController";

export const SafeModal = ({ visible, ...props }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (SplashController.isShowing()) {
            if (showModal) setShowModal(false);
            return;
        }

        if (visible && !SplashController.isShowing()) {
            if (Platform.OS === "web") {
                setShowModal(true);
            } else {
                const t = setTimeout(() => setShowModal(true), 80);
                return () => clearTimeout(t);
            }
        } else {
            setShowModal(false);
        }
    }, [visible, SplashController.isShowing()]);

    return <RNModal {...props} visible={showModal} />;
};