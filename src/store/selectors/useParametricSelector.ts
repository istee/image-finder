import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const useParametricSelector = <Parameter, Result>(
    selector: (appState: RootState, parameter: Parameter) => Result,
    parameter: Parameter
): Result => {
    const selectorCallback = useCallback(
        (state: RootState) => selector(state, parameter),
        [parameter, selector]
    );
    return useSelector<RootState, Result>(selectorCallback);
};
