import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Habit = {
  id: string;
  title: string;
}

type Routine = {
  title: string;
  data: Habit[];
}

interface State {
  routines: Routine[];
}

interface Actions {
  addHabit: (habit: Habit, routine: string) => void;
  removeHabit: (habit: Habit, routine: string) => void;
  resetRoutine: () => void;
}

export const useRoutineStore = create(
  persist(
    immer<State & Actions>(
      (set, get) => ({
        routines: [
          {
            title: 'Morning',
            data: []
          },
          {
            title: 'Afternoon',
            data: []
          },
          {
            title: 'Evening',
            data: []
          },
        ],
        addHabit(habit, routine) {
          set(state => {
            const routineIndex = state.routines.findIndex(r => r.title === routine);

            state.routines[routineIndex].data.push(habit);
          })
        },
        removeHabit(habit, routine) {
          set(state => {
            const routineIndex = state.routines.findIndex(r => r.title === routine);

            const habitIndex = state.routines[routineIndex].data.findIndex(h => h.id === habit.id);

            state.routines[routineIndex].data.splice(habitIndex, 1);
          })
        },

        resetRoutine() {
          set(state => {
            state.routines = [
              {
                title: 'Morning',
                data: []
              },
              {
                title: 'Afternoon',
                data: []
              },
              {
                title: 'Evening',
                data: []
              },
            ]
          })
        },
      })
    ), {
    name: "allHabitsStore",
    storage: createJSONStorage(() => AsyncStorage)
  })
)