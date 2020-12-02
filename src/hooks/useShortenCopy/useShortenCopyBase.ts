import copy from 'copy-to-clipboard';
import { useCallback, useMemo, useReducer } from 'react';
import { Action, AnonymousValues, Handles, OnSubmmitShortenFactory, State, Values } from './types';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'changed':
      return {
        url: action.url,
        value: 'write',
      };
    case 'shortened':
      return {
        url: action.url,
        value: 'copy',
      };
    case 'copied':
      return {
        url: action.url,
        value: 'copied',
      };
    case 'copiedTimeout':
      if (state.value == 'write')
        return {
          url: action.url,
          value: 'write',
        };
      else
        return {
          url: action.url,
          value: 'copy',
        };
    default:
      throw new Error(`Invalid action type ${action.type}.`);
  }
};

const useShortenCopyBase = <T = Values | AnonymousValues>(onSubmmitShortenFatory: OnSubmmitShortenFactory<T>): Handles<T> => {
  const [state, dispatch] = useReducer(reducer, { value: 'write' });

  const onSubmmitCopy = useCallback(async () => {
    if (!state.url) throw Error("Can't copy url because it is not set.");

    copy(state.url);
    dispatch({
      url: state.url,
      type: 'copied',
    });

    setTimeout(() => {
      dispatch({
        url: state.url,
        type: 'copiedTimeout',
      });
    }, 2000);
  }, [dispatch, state]);

  const onFormChange = useCallback(() => {
    dispatch({
      type: 'changed',
    });
  }, [dispatch]);

  const onSubmitShorten = useMemo(() => onSubmmitShortenFatory(dispatch), [onSubmmitShortenFatory, dispatch]);

  switch (state.value) {
    case 'write':
      return {
        onFormChange,
        onSubmit: onSubmitShorten,
        buttonText: 'Shorten!',
        colorScheme: 'blue',
      };
    case 'copy':
      return {
        url: state.url,
        onFormChange,
        onSubmit: onSubmmitCopy,
        buttonText: 'Copy!',
        colorScheme: 'yellow',
      };
    case 'copied':
      return {
        url: state.url,
        onFormChange,
        onSubmit: (_, { setSubmitting }) => {
          setSubmitting(false);
        },
        buttonText: 'Copied!',
        colorScheme: 'green',
      };
    default:
      throw new Error(`Invalid state '${state.value}'.`);
  }
};

export default useShortenCopyBase;
