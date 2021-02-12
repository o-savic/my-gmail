import {
	INBOX_LIST
} from "../actionTypes";

const DEFAULT_STATE = {
	inboxList: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case INBOX_LIST:
			return {
				...state,
				inboxList: action.inboxList
			};
		default:
			return state;
	}
};
