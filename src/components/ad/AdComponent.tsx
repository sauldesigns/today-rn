import { BANNER_AD_UNITID } from '@env';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const AdComponent = () => {
    return (
        <ListItem bottomDivider style={{ maxHeight: 230 }}>
            {
                //@ts-ignore
                <BannerAd
                    // unitId={TestIds.BANNER}
                    unitId={BANNER_AD_UNITID}
                    size={BannerAdSize.ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    // onAdLoaded={() => {
                    //     setHasAd(true);
                    // }}
                    // onAdFailedToLoad={() => {
                    //     setHasAd(false);
                    // }}
                />
            }
        </ListItem>
    );
};

export default AdComponent;

const styles = StyleSheet.create({});
