import { View } from '@motify/components';
import { useAnimationState } from '@motify/core';
import React, { ReactChild, ReactChildren, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

interface SpringProps {
    children?: ReactChild | ReactChildren | ReactNode;
    trigger?: boolean;
}

const useSpring = () => {
    return useAnimationState({ from: { scale: 1 }, to: { scale: 1 } });
};

const Spring = ({ children, trigger = false }: SpringProps) => {
    return <View state={trigger ? useSpring() : undefined}>{children}</View>;
};

export default Spring;

const styles = StyleSheet.create({});
