import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../types";
import { v4 } from "uuid";

const initialState: { notes: Note[] } = {
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    addNote: {
      reducer: (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      },
      prepare: (title: string, content: string, selectedTags: string[]) => {
        return {
          payload: {
            id: v4(),
            title,
            content,
            tags: selectedTags,
          },
        };
      },
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      //güncellenecek notun indexini bul
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      //notu güncelle
      state.notes[index] = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);

      //notu sil
      state.notes.splice(index, 1);
    },
  },
});

export const { addNote, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
