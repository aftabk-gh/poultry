import { rtk } from "@src/store/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: [
    "FarmExpense",
    "Medicine",
    "MedicineUsage",
    "Feed",
    "Sale",
    "OtherExpense",
    "OtherIncome",
    "ProfitAndLoss",
    "Farm",
    "Flock",
  ],
  endpoints: {
    flocksFarmExpenseRead: {
      providesTags: ["FarmExpense"],
    },
    flocksFarmExpenseList: {
      providesTags: ["FarmExpense"],
    },
    flocksFarmExpenseCreate: {
      invalidatesTags: ["FarmExpense", "ProfitAndLoss"],
    },
    flocksFarmExpenseUpdate: {
      invalidatesTags: ["FarmExpense", "ProfitAndLoss"],
    },
    flocksFarmExpenseDelete: {
      invalidatesTags: ["FarmExpense", "ProfitAndLoss"],
    },
    farmsFeedList: {
      providesTags: ["Feed"],
    },
    farmsFeedCreate: {
      invalidatesTags: ["Feed", "ProfitAndLoss"],
    },
    feedUpdate: {
      invalidatesTags: ["Feed", "ProfitAndLoss"],
    },
    feedMove: {
      invalidatesTags: ["Feed"],
    },
    feedDelete: {
      invalidatesTags: ["Feed", "ProfitAndLoss"],
    },
    flocksSaleRead: {
      providesTags: ["Sale"],
    },
    flocksSaleList: {
      providesTags: ["Sale"],
    },
    flocksSaleCreate: {
      invalidatesTags: ["Sale", "ProfitAndLoss"],
    },
    flocksSaleUpdate: {
      invalidatesTags: ["Sale", "ProfitAndLoss"],
    },
    flocksSaleDelete: {
      invalidatesTags: ["Sale", "ProfitAndLoss"],
    },
    flocksOtherExpenseRead: {
      providesTags: ["OtherExpense"],
    },
    flocksOtherExpenseList: {
      providesTags: ["OtherExpense"],
    },
    flocksOtherExpenseCreate: {
      invalidatesTags: ["OtherExpense", "ProfitAndLoss"],
    },
    flocksOtherExpenseUpdate: {
      invalidatesTags: ["OtherExpense", "ProfitAndLoss"],
    },
    flocksOtherExpenseDelete: {
      invalidatesTags: ["OtherExpense", "ProfitAndLoss"],
    },
    flocksOtherIncomeRead: {
      providesTags: ["OtherIncome"],
    },
    flocksOtherIncomeList: {
      providesTags: ["OtherIncome"],
    },
    flocksOtherIncomeCreate: {
      invalidatesTags: ["OtherIncome", "ProfitAndLoss"],
    },
    flocksOtherIncomeUpdate: {
      invalidatesTags: ["OtherIncome", "ProfitAndLoss"],
    },
    flocksOtherIncomeDelete: {
      invalidatesTags: ["OtherIncome", "ProfitAndLoss"],
    },
    farmsRead: {
      providesTags: ["Farm"],
    },
    farmsList: {
      providesTags: ["Farm"],
    },
    farmsCreate: {
      invalidatesTags: ["Farm"],
    },
    farmsUpdate: {
      invalidatesTags: ["Farm"],
    },
    farmsDelete: {
      invalidatesTags: ["Farm"],
    },
    flocksRead: {
      providesTags: ["Flock"],
    },
    farmsFlocksList: {
      providesTags: ["Flock"],
    },
    farmsFlocksCreate: {
      invalidatesTags: ["Flock"],
    },
    flocksMedicinesList: {
      providesTags: ["Medicine"],
    },
    flocksMedicinesCreate: {
      invalidatesTags: ["Medicine"],
    },
    farmsMedicinesList: {
      providesTags: ["Medicine"],
    },
    farmsMedicinesCreate: {
      invalidatesTags: ["Medicine"],
    },
    medicineDelete: {
      invalidatesTags: ["Medicine"],
    },
    medicineUpdate: {
      invalidatesTags: ["Medicine"],
    },
    medicineUsageDelete: {
      invalidatesTags: ["Medicine"],
    },
    medicineUsageUpdate: {
      invalidatesTags: ["Medicine"],
    },
    medicineMove: {
      invalidatesTags: ["Medicine"],
    },
    flocksUpdate: {
      invalidatesTags: ["Flock"],
    },
    flocksDelete: {
      invalidatesTags: ["Flock"],
    },
    flocksProfitAndLossList: {
      providesTags: ["ProfitAndLoss"],
    },
  },
});

export * from "@src/store/generated";
export { enhancedRtkApi as api };
