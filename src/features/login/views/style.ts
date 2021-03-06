import styled from 'styled-components';
import colors from '../../../configs/colors';
import fonts from '../../../configs/fonts';

export const Label = styled.Text`
    font-size: ${fonts.content.size}px;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;

export const Form = styled.View`
    margin-top: 40px;
    width: 100%;
`;

export const FormItem = styled.View`
    width: 100%;
    padding: 15px;
    margin: 5px;
    align-content: center;
`;

export const TextInput = styled.TextInput`
    font-size: ${fonts.mainContent.size}px;
    padding: 5px;
    border-bottom-width: ${(props) => props.borderSize || 1}px;
    border-bottom-color: ${(props) => props.borderColor || colors.text.main};
`;
