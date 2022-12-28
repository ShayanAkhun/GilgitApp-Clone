import * as React from 'react';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';

export interface IIconProps {
    icon: string;
    color?: string;
    size?: number;
    onPress(): () => void;
    children?: undefined;
}

export const Icon: React.FC<IIconProps> = ({ icon, color, onPress, size = 20, }) => {
    return <MIcon name={icon} size={size} color={color} onPress={onPress} />;
};
