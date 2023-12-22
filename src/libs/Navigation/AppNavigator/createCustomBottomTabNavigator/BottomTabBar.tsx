import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {PressableWithFeedback} from '@components/Pressable';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import getTopmostBottomTabRoute from '@libs/Navigation/getTopmostBottomTabRoute';
import Navigation from '@libs/Navigation/Navigation';
import {RootStackParamList} from '@libs/Navigation/types';
import BottomTabBarFloatingActionButton from '@pages/home/sidebar/BottomTabBarFloatingActionButton';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import SCREENS from '@src/SCREENS';

function BottomTabBar() {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    // Parent navigator of the bottom tab bar is the root navigator.
    const currentTabName = useNavigationState<RootStackParamList, string | undefined>((state) => {
        const topmostBottomTabRoute = getTopmostBottomTabRoute(state);
        if (topmostBottomTabRoute) {
            return topmostBottomTabRoute.name;
        }
    });

    return (
        <View style={styles.bottomTabBarContainer}>
            <Tooltip text={translate('common.chats')}>
                <PressableWithFeedback
                    onPress={() => {
                        Navigation.navigate(ROUTES.HOME);
                    }}
                    role={CONST.ROLE.BUTTON}
                    accessibilityLabel={translate('common.chats')}
                    wrapperStyle={styles.flexGrow1}
                    style={styles.bottomTabBarItem}
                >
                    <Icon
                        src={Expensicons.ChatBubble}
                        fill={currentTabName === SCREENS.HOME ? theme.iconMenu : undefined}
                    />
                </PressableWithFeedback>
            </Tooltip>
            <View style={styles.flexGrow1}>
                <BottomTabBarFloatingActionButton />
            </View>
            <Tooltip text={translate('common.settings')}>
                <PressableWithFeedback
                    onPress={() => {
                        Navigation.navigate(ROUTES.ALL_SETTINGS);
                    }}
                    role={CONST.ROLE.BUTTON}
                    accessibilityLabel={translate('common.settings')}
                    wrapperStyle={styles.flexGrow1}
                    style={styles.bottomTabBarItem}
                >
                    <Icon
                        src={Expensicons.Gear}
                        fill={currentTabName === SCREENS.ALL_SETTINGS || currentTabName === SCREENS.WORKSPACE.INITIAL ? theme.iconMenu : undefined}
                    />
                </PressableWithFeedback>
            </Tooltip>
        </View>
    );
}

BottomTabBar.displayName = 'BottomTabBar';

export default BottomTabBar;
