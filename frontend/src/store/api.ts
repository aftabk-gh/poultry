import { rtk } from "@src/store/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: [
    "FarmExpense",
    "Medicine",
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
    flocksMedicneRead: {
      providesTags: ["Medicine"],
    },
    flocksMedicneList: {
      providesTags: ["Medicine"],
    },
    flocksMedicneCreate: {
      invalidatesTags: ["Medicine", "ProfitAndLoss"],
    },
    flocksMedicneUpdate: {
      invalidatesTags: ["Medicine", "ProfitAndLoss"],
    },
    flocksMedicneDelete: {
      invalidatesTags: ["Medicine", "ProfitAndLoss"],
    },
    flocksFeedRead: {
      providesTags: ["Feed"],
    },
    flocksFeedList: {
      providesTags: ["Feed"],
    },
    flocksFeedCreate: {
      invalidatesTags: ["Feed", "ProfitAndLoss"],
    },
    flocksFeedUpdate: {
      invalidatesTags: ["Feed", "ProfitAndLoss"],
    },
    flocksFeedDelete: {
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
