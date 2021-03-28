import { View } from '@motify/components';
import { duration } from 'moment';
import React, { ReactChild, ReactChildren, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

interface FadeInProps {
    children?: ReactChild | ReactChildren | ReactNode;
    delay?: number;
}

const FadeIn = ({ children, delay }: FadeInProps) => {
    return (
        <View
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                type: 'timing',
                duration: 500,
                delay: delay ? delay : 50,
            }}>
            {children}
        </View>
    );
};

export default FadeIn;

const styles = StyleSheet.create({});
