import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
export const fetchPokemon = createAsyncThunk(
  'rounds/fetchPokemon',
  async (round) => {
    const res = await axios.get(`/api/pokemon/${round}`);
    return {
      data: res.data,
      // if you need header values, pick only the strings:
      cacheControl: res.headers['cache-control'],
      contentType: res.headers['content-type'],
    };
  }
);


const roundsSlice = createSlice({
    name: 'rounds',
    initialState: {
        status: 'idle',
        pokemons: {},

    },
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(fetchPokemon.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.pokemons = action.payload
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.status = 'rejected'
            })
    }
})

export default {
    rounds: roundsSlice.reducer
}