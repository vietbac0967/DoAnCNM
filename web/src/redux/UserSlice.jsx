import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { accountUser } from '../service/UserService'

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    account: {}
}

const fechUserToken = createAsyncThunk(
    'user/get-user-token', async () => {
        try {
            let res = await accountUser();
            if (res && res.EC === 0) {
                return res.DT;
            } else {
                throw new Error(res.em);
            }
        } catch (error) {
            throw error;
        }
    }
)

export const UserSlice = createSlice({
    name: 'userisaccess',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fechUserToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.account = action.payload;
            })
            .addCase(fechUserToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.account = {}
            })


    }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export { fechUserToken }

export default UserSlice.reducer