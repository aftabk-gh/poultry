import { api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    farmsList: build.query<FarmsListApiResponse, FarmsListApiArg>({
      query: () => ({ url: `/farms/` }),
    }),
    farmsCreate: build.mutation<FarmsCreateApiResponse, FarmsCreateApiArg>({
      query: (queryArg) => ({
        url: `/farms/`,
        method: "POST",
        body: queryArg.farm,
      }),
    }),
    farmsFlocksList: build.query<
      FarmsFlocksListApiResponse,
      FarmsFlocksListApiArg
    >({
      query: (queryArg) => ({ url: `/farms/${queryArg.farmId}/flocks/` }),
    }),
    farmsFlocksCreate: build.mutation<
      FarmsFlocksCreateApiResponse,
      FarmsFlocksCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/farms/${queryArg.farmId}/flocks/`,
        method: "POST",
        body: queryArg.flock,
      }),
    }),
    farmsRead: build.query<FarmsReadApiResponse, FarmsReadApiArg>({
      query: (queryArg) => ({ url: `/farms/${queryArg.id}/` }),
    }),
    farmsUpdate: build.mutation<FarmsUpdateApiResponse, FarmsUpdateApiArg>({
      query: (queryArg) => ({
        url: `/farms/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.farm,
      }),
    }),
    farmsDelete: build.mutation<FarmsDeleteApiResponse, FarmsDeleteApiArg>({
      query: (queryArg) => ({
        url: `/farms/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksFarmExpenseList: build.query<
      FlocksFarmExpenseListApiResponse,
      FlocksFarmExpenseListApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/farm_expense/`,
      }),
    }),
    flocksFarmExpenseCreate: build.mutation<
      FlocksFarmExpenseCreateApiResponse,
      FlocksFarmExpenseCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/farm_expense/`,
        method: "POST",
        body: queryArg.expense,
      }),
    }),
    flocksFarmExpenseRead: build.query<
      FlocksFarmExpenseReadApiResponse,
      FlocksFarmExpenseReadApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/farm_expense/${queryArg.id}/`,
      }),
    }),
    flocksFarmExpenseUpdate: build.mutation<
      FlocksFarmExpenseUpdateApiResponse,
      FlocksFarmExpenseUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/farm_expense/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.expense,
      }),
    }),
    flocksFarmExpensePartialUpdate: build.mutation<
      FlocksFarmExpensePartialUpdateApiResponse,
      FlocksFarmExpensePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/farm_expense/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.expense,
      }),
    }),
    flocksFarmExpenseDelete: build.mutation<
      FlocksFarmExpenseDeleteApiResponse,
      FlocksFarmExpenseDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/farm_expense/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksFeedList: build.query<
      FlocksFeedListApiResponse,
      FlocksFeedListApiArg
    >({
      query: (queryArg) => ({ url: `/flocks/${queryArg.flockId}/feed/` }),
    }),
    flocksFeedCreate: build.mutation<
      FlocksFeedCreateApiResponse,
      FlocksFeedCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/feed/`,
        method: "POST",
        body: queryArg.feed,
      }),
    }),
    flocksFeedRead: build.query<
      FlocksFeedReadApiResponse,
      FlocksFeedReadApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/feed/${queryArg.id}/`,
      }),
    }),
    flocksFeedUpdate: build.mutation<
      FlocksFeedUpdateApiResponse,
      FlocksFeedUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/feed/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.feed,
      }),
    }),
    flocksFeedDelete: build.mutation<
      FlocksFeedDeleteApiResponse,
      FlocksFeedDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/feed/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksMedicneList: build.query<
      FlocksMedicneListApiResponse,
      FlocksMedicneListApiArg
    >({
      query: (queryArg) => ({ url: `/flocks/${queryArg.flockId}/medicne/` }),
    }),
    flocksMedicneCreate: build.mutation<
      FlocksMedicneCreateApiResponse,
      FlocksMedicneCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/medicne/`,
        method: "POST",
        body: queryArg.medicine,
      }),
    }),
    flocksMedicneRead: build.query<
      FlocksMedicneReadApiResponse,
      FlocksMedicneReadApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/medicne/${queryArg.id}/`,
      }),
    }),
    flocksMedicneUpdate: build.mutation<
      FlocksMedicneUpdateApiResponse,
      FlocksMedicneUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/medicne/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.medicine,
      }),
    }),
    flocksMedicneDelete: build.mutation<
      FlocksMedicneDeleteApiResponse,
      FlocksMedicneDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/medicne/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksOtherExpenseList: build.query<
      FlocksOtherExpenseListApiResponse,
      FlocksOtherExpenseListApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_expense/`,
      }),
    }),
    flocksOtherExpenseCreate: build.mutation<
      FlocksOtherExpenseCreateApiResponse,
      FlocksOtherExpenseCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_expense/`,
        method: "POST",
        body: queryArg.otherExpense,
      }),
    }),
    flocksOtherExpenseRead: build.query<
      FlocksOtherExpenseReadApiResponse,
      FlocksOtherExpenseReadApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_expense/${queryArg.id}/`,
      }),
    }),
    flocksOtherExpenseUpdate: build.mutation<
      FlocksOtherExpenseUpdateApiResponse,
      FlocksOtherExpenseUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_expense/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.otherExpense,
      }),
    }),
    flocksOtherExpenseDelete: build.mutation<
      FlocksOtherExpenseDeleteApiResponse,
      FlocksOtherExpenseDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_expense/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksOtherIncomeList: build.query<
      FlocksOtherIncomeListApiResponse,
      FlocksOtherIncomeListApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_income/`,
      }),
    }),
    flocksOtherIncomeCreate: build.mutation<
      FlocksOtherIncomeCreateApiResponse,
      FlocksOtherIncomeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_income/`,
        method: "POST",
        body: queryArg.otherIncome,
      }),
    }),
    flocksOtherIncomeRead: build.query<
      FlocksOtherIncomeReadApiResponse,
      FlocksOtherIncomeReadApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_income/${queryArg.id}/`,
      }),
    }),
    flocksOtherIncomeUpdate: build.mutation<
      FlocksOtherIncomeUpdateApiResponse,
      FlocksOtherIncomeUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_income/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.otherIncome,
      }),
    }),
    flocksOtherIncomeDelete: build.mutation<
      FlocksOtherIncomeDeleteApiResponse,
      FlocksOtherIncomeDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/other_income/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksProfitAndLossList: build.query<
      FlocksProfitAndLossListApiResponse,
      FlocksProfitAndLossListApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/profit_and_loss/`,
      }),
    }),
    flocksSaleList: build.query<
      FlocksSaleListApiResponse,
      FlocksSaleListApiArg
    >({
      query: (queryArg) => ({ url: `/flocks/${queryArg.flockId}/sale/` }),
    }),
    flocksSaleCreate: build.mutation<
      FlocksSaleCreateApiResponse,
      FlocksSaleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/sale/`,
        method: "POST",
        body: queryArg.sale,
      }),
    }),
    flocksSaleRead: build.query<
      FlocksSaleReadApiResponse,
      FlocksSaleReadApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/sale/${queryArg.id}/`,
      }),
    }),
    flocksSaleUpdate: build.mutation<
      FlocksSaleUpdateApiResponse,
      FlocksSaleUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/sale/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.sale,
      }),
    }),
    flocksSaleDelete: build.mutation<
      FlocksSaleDeleteApiResponse,
      FlocksSaleDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.flockId}/sale/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    flocksRead: build.query<FlocksReadApiResponse, FlocksReadApiArg>({
      query: (queryArg) => ({ url: `/flocks/${queryArg.id}/` }),
    }),
    flocksUpdate: build.mutation<FlocksUpdateApiResponse, FlocksUpdateApiArg>({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.flock,
      }),
    }),
    flocksDelete: build.mutation<FlocksDeleteApiResponse, FlocksDeleteApiArg>({
      query: (queryArg) => ({
        url: `/flocks/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    loginCreate: build.mutation<LoginCreateApiResponse, LoginCreateApiArg>({
      query: (queryArg) => ({
        url: `/login/`,
        method: "POST",
        body: queryArg.login,
      }),
    }),
    meRead: build.query<MeReadApiResponse, MeReadApiArg>({
      query: () => ({ url: `/me/` }),
    }),
    signupCreate: build.mutation<SignupCreateApiResponse, SignupCreateApiArg>({
      query: (queryArg) => ({
        url: `/signup/`,
        method: "POST",
        body: queryArg.signUp,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as rtk };
export type FarmsListApiResponse = /** status 200  */ Farm[];
export type FarmsListApiArg = void;
export type FarmsCreateApiResponse = /** status 201  */ Farm;
export type FarmsCreateApiArg = {
  farm: Farm;
};
export type FarmsFlocksListApiResponse = /** status 200  */ Flock[];
export type FarmsFlocksListApiArg = {
  farmId: string;
};
export type FarmsFlocksCreateApiResponse = /** status 201  */ Flock;
export type FarmsFlocksCreateApiArg = {
  farmId: string;
  flock: Flock;
};
export type FarmsReadApiResponse = /** status 200  */ Farm;
export type FarmsReadApiArg = {
  /** A unique integer value identifying this farm. */
  id: number;
};
export type FarmsUpdateApiResponse = /** status 200  */ Farm;
export type FarmsUpdateApiArg = {
  /** A unique integer value identifying this farm. */
  id: number;
  farm: Farm;
};
export type FarmsDeleteApiResponse = unknown;
export type FarmsDeleteApiArg = {
  /** A unique integer value identifying this farm. */
  id: number;
};
export type FlocksFarmExpenseListApiResponse = /** status 200  */ Expense[];
export type FlocksFarmExpenseListApiArg = {
  flockId: string;
};
export type FlocksFarmExpenseCreateApiResponse = /** status 201  */ Expense;
export type FlocksFarmExpenseCreateApiArg = {
  flockId: string;
  expense: Expense;
};
export type FlocksFarmExpenseReadApiResponse = /** status 200  */ Expense;
export type FlocksFarmExpenseReadApiArg = {
  flockId: string;
  /** A unique integer value identifying this farm expense. */
  id: number;
};
export type FlocksFarmExpenseUpdateApiResponse = /** status 200  */ Expense;
export type FlocksFarmExpenseUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this farm expense. */
  id: number;
  expense: Expense;
};
export type FlocksFarmExpensePartialUpdateApiResponse =
  /** status 200  */ Expense;
export type FlocksFarmExpensePartialUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this farm expense. */
  id: number;
  expense: Expense;
};
export type FlocksFarmExpenseDeleteApiResponse = unknown;
export type FlocksFarmExpenseDeleteApiArg = {
  flockId: string;
  /** A unique integer value identifying this farm expense. */
  id: number;
};
export type FlocksFeedListApiResponse = /** status 200  */ Feed[];
export type FlocksFeedListApiArg = {
  flockId: string;
};
export type FlocksFeedCreateApiResponse = /** status 201  */ Feed;
export type FlocksFeedCreateApiArg = {
  flockId: string;
  feed: Feed;
};
export type FlocksFeedReadApiResponse = /** status 200  */ Feed;
export type FlocksFeedReadApiArg = {
  flockId: string;
  /** A unique integer value identifying this feed. */
  id: number;
};
export type FlocksFeedUpdateApiResponse = /** status 200  */ Feed;
export type FlocksFeedUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this feed. */
  id: number;
  feed: Feed;
};
export type FlocksFeedDeleteApiResponse = unknown;
export type FlocksFeedDeleteApiArg = {
  flockId: string;
  /** A unique integer value identifying this feed. */
  id: number;
};
export type FlocksMedicneListApiResponse = /** status 200  */ Medicine[];
export type FlocksMedicneListApiArg = {
  flockId: string;
};
export type FlocksMedicneCreateApiResponse = /** status 201  */ Medicine;
export type FlocksMedicneCreateApiArg = {
  flockId: string;
  medicine: Medicine;
};
export type FlocksMedicneReadApiResponse = /** status 200  */ Medicine;
export type FlocksMedicneReadApiArg = {
  flockId: string;
  /** A unique integer value identifying this medicine. */
  id: number;
};
export type FlocksMedicneUpdateApiResponse = /** status 200  */ Medicine;
export type FlocksMedicneUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this medicine. */
  id: number;
  medicine: Medicine;
};
export type FlocksMedicneDeleteApiResponse = unknown;
export type FlocksMedicneDeleteApiArg = {
  flockId: string;
  /** A unique integer value identifying this medicine. */
  id: number;
};
export type FlocksOtherExpenseListApiResponse =
  /** status 200  */ OtherExpense[];
export type FlocksOtherExpenseListApiArg = {
  flockId: string;
};
export type FlocksOtherExpenseCreateApiResponse =
  /** status 201  */ OtherExpense;
export type FlocksOtherExpenseCreateApiArg = {
  flockId: string;
  otherExpense: OtherExpense;
};
export type FlocksOtherExpenseReadApiResponse = /** status 200  */ OtherExpense;
export type FlocksOtherExpenseReadApiArg = {
  flockId: string;
  /** A unique integer value identifying this other expense. */
  id: number;
};
export type FlocksOtherExpenseUpdateApiResponse =
  /** status 200  */ OtherExpense;
export type FlocksOtherExpenseUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this other expense. */
  id: number;
  otherExpense: OtherExpense;
};
export type FlocksOtherExpenseDeleteApiResponse = unknown;
export type FlocksOtherExpenseDeleteApiArg = {
  flockId: string;
  /** A unique integer value identifying this other expense. */
  id: number;
};
export type FlocksOtherIncomeListApiResponse = /** status 200  */ OtherIncome[];
export type FlocksOtherIncomeListApiArg = {
  flockId: string;
};
export type FlocksOtherIncomeCreateApiResponse = /** status 201  */ OtherIncome;
export type FlocksOtherIncomeCreateApiArg = {
  flockId: string;
  otherIncome: OtherIncome;
};
export type FlocksOtherIncomeReadApiResponse = /** status 200  */ OtherIncome;
export type FlocksOtherIncomeReadApiArg = {
  flockId: string;
  /** A unique integer value identifying this other income. */
  id: number;
};
export type FlocksOtherIncomeUpdateApiResponse = /** status 200  */ OtherIncome;
export type FlocksOtherIncomeUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this other income. */
  id: number;
  otherIncome: OtherIncome;
};
export type FlocksOtherIncomeDeleteApiResponse = unknown;
export type FlocksOtherIncomeDeleteApiArg = {
  flockId: string;
  /** A unique integer value identifying this other income. */
  id: number;
};
export type FlocksProfitAndLossListApiResponse = unknown;
export type FlocksProfitAndLossListApiArg = {
  flockId: string;
};
export type FlocksSaleListApiResponse = /** status 200  */ Sale[];
export type FlocksSaleListApiArg = {
  flockId: string;
};
export type FlocksSaleCreateApiResponse = /** status 201  */ Sale;
export type FlocksSaleCreateApiArg = {
  flockId: string;
  sale: Sale;
};
export type FlocksSaleReadApiResponse = /** status 200  */ Sale;
export type FlocksSaleReadApiArg = {
  flockId: string;
  /** A unique integer value identifying this sale. */
  id: number;
};
export type FlocksSaleUpdateApiResponse = /** status 200  */ Sale;
export type FlocksSaleUpdateApiArg = {
  flockId: string;
  /** A unique integer value identifying this sale. */
  id: number;
  sale: Sale;
};
export type FlocksSaleDeleteApiResponse = unknown;
export type FlocksSaleDeleteApiArg = {
  flockId: string;
  /** A unique integer value identifying this sale. */
  id: number;
};
export type FlocksReadApiResponse = /** status 200  */ Flock;
export type FlocksReadApiArg = {
  /** A unique integer value identifying this flock. */
  id: number;
};
export type FlocksUpdateApiResponse = /** status 200  */ Flock;
export type FlocksUpdateApiArg = {
  /** A unique integer value identifying this flock. */
  id: number;
  flock: Flock;
};
export type FlocksDeleteApiResponse = unknown;
export type FlocksDeleteApiArg = {
  /** A unique integer value identifying this flock. */
  id: number;
};
export type LoginCreateApiResponse = /** status 201  */ Login;
export type LoginCreateApiArg = {
  login: Login;
};
export type MeReadApiResponse = /** status 200  */ Me;
export type MeReadApiArg = void;
export type SignupCreateApiResponse = /** status 201  */ SignUp;
export type SignupCreateApiArg = {
  signUp: SignUp;
};
export type Farm = {
  id?: number;
  name: string;
  category: "laying_breeds" | "meat_production" | "dual_purpose";
  no_of_employees?: number;
  no_of_sheds: number;
  address: string;
  created_at?: string;
  updated_at?: string;
  manager?: number | null;
};
export type Flock = {
  id?: number;
  no: number;
  input_date?: string | null;
  input_quantity?: number | null;
  created_at?: string;
  updated_at?: string;
};
export type Expense = {
  id?: number;
  from_date: string;
  to_date: string;
  items?: object;
  created_at?: string;
  updated_at?: string;
};
export type Feed = {
  id?: number;
  date: string;
  feed_type: string;
  bags: number;
  rate: number;
  discount: number;
  cr?: number | null;
  comments?: string | null;
  created_at?: string;
  updated_at?: string;
};
export type Medicine = {
  id?: number;
  name: string;
  packing: string;
  opening?: number | null;
  recieving?: number | null;
  usage?: object;
  rate?: number | null;
  created_at?: string;
  updated_at?: string;
};
export type OtherExpense = {
  id?: number;
  title: string;
  value: number;
  created_at?: string;
  updated_at?: string;
};
export type OtherIncome = {
  id?: number;
  title: string;
  value: number;
  created_at?: string;
  updated_at?: string;
};
export type Sale = {
  id?: number;
  date: string;
  dealer?: string | null;
  vehicle_no: number;
  f_rate: number;
  weight: number;
  created_at?: string;
  updated_at?: string;
};
export type Login = {
  email: string;
  password: string;
};
export type Me = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  company?: number | null;
  is_superuser?: boolean;
};
export type Company = {
  id?: number;
  name: string;
  key_activity: string;
  address: string;
  created_at?: string;
  updated_at?: string;
};
export type SignUp = {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  company: Company;
};
export const {
  useFarmsListQuery,
  useFarmsCreateMutation,
  useFarmsFlocksListQuery,
  useFarmsFlocksCreateMutation,
  useFarmsReadQuery,
  useFarmsUpdateMutation,
  useFarmsDeleteMutation,
  useFlocksFarmExpenseListQuery,
  useFlocksFarmExpenseCreateMutation,
  useFlocksFarmExpenseReadQuery,
  useFlocksFarmExpenseUpdateMutation,
  useFlocksFarmExpensePartialUpdateMutation,
  useFlocksFarmExpenseDeleteMutation,
  useFlocksFeedListQuery,
  useFlocksFeedCreateMutation,
  useFlocksFeedReadQuery,
  useFlocksFeedUpdateMutation,
  useFlocksFeedDeleteMutation,
  useFlocksMedicneListQuery,
  useFlocksMedicneCreateMutation,
  useFlocksMedicneReadQuery,
  useFlocksMedicneUpdateMutation,
  useFlocksMedicneDeleteMutation,
  useFlocksOtherExpenseListQuery,
  useFlocksOtherExpenseCreateMutation,
  useFlocksOtherExpenseReadQuery,
  useFlocksOtherExpenseUpdateMutation,
  useFlocksOtherExpenseDeleteMutation,
  useFlocksOtherIncomeListQuery,
  useFlocksOtherIncomeCreateMutation,
  useFlocksOtherIncomeReadQuery,
  useFlocksOtherIncomeUpdateMutation,
  useFlocksOtherIncomeDeleteMutation,
  useFlocksProfitAndLossListQuery,
  useFlocksSaleListQuery,
  useFlocksSaleCreateMutation,
  useFlocksSaleReadQuery,
  useFlocksSaleUpdateMutation,
  useFlocksSaleDeleteMutation,
  useFlocksReadQuery,
  useFlocksUpdateMutation,
  useFlocksDeleteMutation,
  useLoginCreateMutation,
  useMeReadQuery,
  useSignupCreateMutation,
} = injectedRtkApi;
