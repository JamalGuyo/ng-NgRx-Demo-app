export interface UserState {
  maskUserName: boolean;
}

const initialState = {
  maskUserName: true
};

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
