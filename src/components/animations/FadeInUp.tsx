import { View } from '@motify/components';
import { duration } from 'moment';
import React, { ReactChild, ReactChildren, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

interface FadeInUpProps {
    children?: ReactChild | ReactChildren | ReactNode;
    delay?: number;
}

const FadeInUp = ({ children, delay }: FadeInUpProps) => {
    return (
        <View
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                type: 'timing',
                duration: 500,
                delay: delay ? delay : 50,
            }}>
            {children}
        </View>
    );
};

export default FadeInUp;

const styles = StyleSheet.create({});
